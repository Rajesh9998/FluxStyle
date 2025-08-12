"use client"

import type React from "react"

import { useState, useCallback, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Upload, ArrowLeft, Send, Sparkles, Loader2, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"

interface Recommendation {
  title: string
  description: string
}

export default function UploadPage() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])
  const [prompt, setPrompt] = useState("")
  const [selectedModel, setSelectedModel] = useState("flux-kontext-pro")
  const [generatedImage, setGeneratedImage] = useState<string | null>(null)
  const [currentStep, setCurrentStep] = useState<"upload" | "analyze" | "generate" | "result">("upload")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const files = Array.from(e.dataTransfer.files)
    const imageFile = files.find((file) => file.type.startsWith("image/"))

    if (imageFile) {
      await uploadToBlob(imageFile)
    }
  }, [])

  const handleFileSelect = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type.startsWith("image/")) {
      await uploadToBlob(file)
    }
  }, [])

  const uploadToBlob = async (file: File) => {
    try {
      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      if (response.ok) {
        const { url } = await response.json()
        setUploadedImage(url)
        setCurrentStep("analyze")
        await analyzeImage(url)
      }
    } catch (error) {
      console.error("Upload failed:", error)
    }
  }

  const analyzeImage = async (imageUrl: string) => {
    try {
      setIsAnalyzing(true)
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ imageUrl }),
      })

      if (response.ok) {
        const { recommendations } = await response.json()
        setRecommendations(recommendations)
        setCurrentStep("generate")
      }
    } catch (error) {
      console.error("Analysis failed:", error)
    } finally {
      setIsAnalyzing(false)
    }
  }

  const generateImage = async () => {
    if (!uploadedImage || !prompt.trim()) return

    try {
      setIsGenerating(true)
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          imageUrl: uploadedImage,
          prompt: prompt.trim(),
        }),
      })

      if (response.ok) {
        const { generatedImageUrl } = await response.json()
        setGeneratedImage(generatedImageUrl)
        setCurrentStep("result")
      }
    } catch (error) {
      console.error("Generation failed:", error)
    } finally {
      setIsGenerating(false)
    }
  }

  const resetProcess = () => {
    setUploadedImage(null)
    setRecommendations([])
    setPrompt("")
    setGeneratedImage(null)
    setCurrentStep("upload")
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-gray-800">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
            <ArrowLeft className="size-4" />
            <span>Back to Home</span>
          </Link>
          <div className="flex items-center gap-2 font-bold">
            <div className="size-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white">
              F
            </div>
            <span>FluxStyle</span>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Edit any image with
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              a simple prompt
            </span>
          </h1>

          {/* Progress Steps */}
          <div className="flex items-center justify-center gap-4 mt-8">
            {[
              { step: "upload", label: "Upload", icon: Upload },
              { step: "analyze", label: "Analyze", icon: Sparkles },
              { step: "generate", label: "Generate", icon: Send },
            ].map(({ step, label, icon: Icon }, index) => (
              <div key={step} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all ${
                    currentStep === step ||
                    (index === 0 && uploadedImage) ||
                    (index === 1 && recommendations.length > 0) ||
                    (index === 2 && generatedImage)
                      ? "border-purple-500 bg-purple-500 text-white"
                      : "border-gray-600 text-gray-400"
                  }`}
                >
                  <Icon className="size-4" />
                </div>
                <span className="ml-2 text-sm text-gray-400">{label}</span>
                {index < 2 && <div className="w-8 h-0.5 bg-gray-600 mx-4" />}
              </div>
            ))}
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {currentStep === "upload" && (
            <motion.div
              key="upload"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-2xl mx-auto"
            >
              <div
                className={`relative border-2 border-dashed rounded-2xl p-16 text-center transition-all duration-300 cursor-pointer ${
                  isDragging ? "border-purple-400 bg-purple-400/10" : "border-gray-600 hover:border-gray-500"
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="flex flex-col items-center justify-center space-y-4">
                  <Upload className="size-16 text-gray-400" />
                  <div>
                    <p className="text-2xl font-medium text-gray-300 mb-2">Drop a photo</p>
                    <p className="text-gray-500">or click to upload</p>
                  </div>
                </div>
                <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileSelect} className="hidden" />
              </div>
            </motion.div>
          )}

          {currentStep === "analyze" && (
            <motion.div
              key="analyze"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid lg:grid-cols-2 gap-8"
            >
              <div className="space-y-4">
                <div className="rounded-2xl overflow-hidden border border-gray-700 bg-gray-900/50">
                  <Image
                    src={uploadedImage || "/placeholder.svg"}
                    alt="Uploaded image"
                    width={600}
                    height={600}
                    className="w-full h-auto"
                  />
                </div>
                <Button
                  variant="outline"
                  onClick={resetProcess}
                  className="w-full border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
                >
                  Upload Different Image
                </Button>
              </div>

              <div className="space-y-6">
                <div className="text-center">
                  {isAnalyzing ? (
                    <div className="flex items-center justify-center space-x-2">
                      <Loader2 className="size-6 animate-spin text-purple-400" />
                      <span className="text-lg">Analyzing your image...</span>
                    </div>
                  ) : (
                    <div>
                      <h2 className="text-2xl font-bold mb-4 text-purple-400">AI Recommendations</h2>
                      <div className="space-y-4">
                        {recommendations.map((rec, index) => (
                          <Card key={index} className="bg-gray-900 border-gray-700">
                            <CardContent className="p-4">
                              <h3 className="font-semibold text-white mb-2">{rec.title}</h3>
                              <p className="text-gray-300 text-sm">{rec.description}</p>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {currentStep === "generate" && (
            <motion.div
              key="generate"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid lg:grid-cols-2 gap-8"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-lg overflow-hidden border border-gray-700">
                    <Image
                      src={uploadedImage || "/placeholder.svg"}
                      alt="Uploaded thumbnail"
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Original Image</p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={resetProcess}
                      className="border-gray-600 text-gray-300 hover:bg-gray-800 mt-1 bg-transparent"
                    >
                      Change Image
                    </Button>
                  </div>
                </div>

                <div className="rounded-2xl overflow-hidden border border-gray-700 bg-gray-900/50">
                  <Image
                    src={uploadedImage || "/placeholder.svg"}
                    alt="Original image"
                    width={600}
                    height={600}
                    className="w-full h-auto"
                  />
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Model</label>
                    <Select value={selectedModel} onValueChange={setSelectedModel}>
                      <SelectTrigger className="w-full bg-gray-900 border-gray-700 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-900 border-gray-700">
                        <SelectItem value="flux-kontext-pro">Flux Kontext Pro</SelectItem>
                        <SelectItem value="flux-pro">Flux Pro</SelectItem>
                        <SelectItem value="flux-schnell">Flux Schnell</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Describe the changes you want</label>
                    <div className="relative">
                      <Textarea
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="Tell us the changes you want..."
                        className="min-h-[120px] bg-gray-900 border-gray-700 text-white placeholder:text-gray-500 resize-none pr-12"
                      />
                      <Button
                        onClick={generateImage}
                        disabled={!prompt.trim() || isGenerating}
                        size="sm"
                        className="absolute bottom-3 right-3 bg-white text-black hover:bg-gray-200 disabled:opacity-50"
                      >
                        {isGenerating ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />}
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-300">Try these examples:</p>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "Change hair color to blonde",
                        "Add a modern haircut",
                        "Make hair curly",
                        "Add highlights",
                        "Give me a bob cut",
                        "Make hair shorter",
                      ].map((example) => (
                        <Button
                          key={example}
                          variant="outline"
                          size="sm"
                          onClick={() => setPrompt(example)}
                          className="border-gray-600 text-gray-300 hover:bg-gray-800 text-xs"
                        >
                          {example}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* AI Recommendations */}
                {recommendations.length > 0 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-purple-400">AI Suggestions</h3>
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {recommendations.map((rec, index) => (
                        <Card
                          key={index}
                          className="bg-gray-900 border-gray-700 cursor-pointer hover:border-purple-500 transition-colors"
                          onClick={() => setPrompt(rec.description)}
                        >
                          <CardContent className="p-3">
                            <h4 className="font-medium text-white text-sm">{rec.title}</h4>
                            <p className="text-gray-400 text-xs mt-1 line-clamp-2">{rec.description}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {currentStep === "result" && generatedImage && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <div className="text-center">
                <h2 className="text-3xl font-bold mb-4 text-purple-400">Your Transformation</h2>
                <p className="text-gray-400">Here's your new look!</p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-center">Before</h3>
                  <div className="rounded-2xl overflow-hidden border border-gray-700 bg-gray-900/50">
                    <Image
                      src={uploadedImage || "/placeholder.svg"}
                      alt="Original image"
                      width={500}
                      height={500}
                      className="w-full h-auto"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-center">After</h3>
                  <div className="rounded-2xl overflow-hidden border border-purple-500 bg-gray-900/50 shadow-lg shadow-purple-500/20">
                    <Image
                      src={generatedImage || "/placeholder.svg"}
                      alt="Generated image"
                      width={500}
                      height={500}
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-center gap-4">
                <Button
                  onClick={resetProcess}
                  variant="outline"
                  className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
                >
                  Try Another Image
                </Button>
                <Button
                  onClick={() => {
                    const link = document.createElement("a")
                    link.href = generatedImage
                    link.download = "fluxstyle-transformation.jpg"
                    link.click()
                  }}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                >
                  <Download className="size-4 mr-2" />
                  Download Result
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-16 pt-8 border-t border-gray-800"
        >
          <p className="text-gray-500 text-sm">
            Powered by <span className="text-white font-medium">FluxStyle AI</span>
          </p>
        </motion.div>
      </div>
    </div>
  )
}
