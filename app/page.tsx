"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import {
  Check,
  ChevronRight,
  Menu,
  X,
  Moon,
  Sun,
  ArrowRight,
  Zap,
  Shield,
  Users,
  BarChart,
  Upload,
  Palette,
  Sparkles,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { useTheme } from "next-themes"

export default function LandingPage() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  const features = [
    {
      title: "AI-Powered Analysis",
      description: "Our advanced AI analyzes your facial features to suggest the most flattering styles.",
      icon: <Zap className="size-5" />,
    },
    {
      title: "Instant Results",
      description: "See your transformation in seconds with our lightning-fast processing technology.",
      icon: <BarChart className="size-5" />,
    },
    {
      title: "Style Variety",
      description: "Choose from hundreds of hairstyles, colors, and looks to find your perfect match.",
      icon: <Palette className="size-5" />,
    },
    {
      title: "Privacy First",
      description: "Your photos are processed securely and never stored or shared without permission.",
      icon: <Shield className="size-5" />,
    },
    {
      title: "Professional Quality",
      description: "Get salon-quality previews that help you make confident styling decisions.",
      icon: <Sparkles className="size-5" />,
    },
    {
      title: "Easy Sharing",
      description: "Share your transformations with friends or save them for your stylist appointment.",
      icon: <Users className="size-5" />,
    },
  ]

  return (
    <div className="flex min-h-[100dvh] flex-col">
      <header
        className={`sticky top-0 z-50 w-full backdrop-blur-lg transition-all duration-300 ${isScrolled ? "bg-background/80 shadow-sm" : "bg-transparent"}`}
      >
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-bold">
            <div className="size-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white">
              S
            </div>
            <span>FluxStyle</span>
          </div>
          <nav className="hidden md:flex gap-8">
            <Link
              href="#features"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Features
            </Link>
            <Link
              href="#transformations"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Examples
            </Link>
            <Link
              href="#pricing"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Pricing
            </Link>
            <Link
              href="#faq"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              FAQ
            </Link>
          </nav>
          <div className="hidden md:flex gap-4 items-center">
            <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-full">
              {mounted && theme === "dark" ? <Sun className="size-[18px]" /> : <Moon className="size-[18px]" />}
              <span className="sr-only">Toggle theme</span>
            </Button>
            <Link
              href="#"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Log in
            </Link>
            <Link href="/upload">
              <Button className="rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                Try It Now
                <ChevronRight className="ml-1 size-4" />
              </Button>
            </Link>
          </div>
          <div className="flex items-center gap-4 md:hidden">
            <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-full">
              {mounted && theme === "dark" ? <Sun className="size-[18px]" /> : <Moon className="size-[18px]" />}
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </div>
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-16 inset-x-0 bg-background/95 backdrop-blur-lg border-b"
          >
            <div className="container py-4 flex flex-col gap-4">
              <Link href="#features" className="py-2 text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>
                Features
              </Link>
              <Link
                href="#transformations"
                className="py-2 text-sm font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Examples
              </Link>
              <Link href="#pricing" className="py-2 text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>
                Pricing
              </Link>
              <Link href="#faq" className="py-2 text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>
                FAQ
              </Link>
              <div className="flex flex-col gap-2 pt-2 border-t">
                <Link href="#" className="py-2 text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>
                  Log in
                </Link>
                <Link href="/upload">
                  <Button className="rounded-full bg-gradient-to-r from-purple-500 to-pink-500">
                    Try It Now
                    <ChevronRight className="ml-1 size-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </header>
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-20 md:py-32 lg:py-40 overflow-hidden">
          <div className="container px-4 md:px-6 relative">
            <div className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-black bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="text-left max-w-2xl"
              >
                <Badge
                  className="mb-4 rounded-full px-4 py-1.5 text-sm font-medium bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 border-purple-200"
                  variant="secondary"
                >
                  Your Look. Reinvented in Seconds.
                </Badge>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500">
                  Transform Your Look with AI
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl">
                  Upload your photo and discover your best style instantly. Our AI analyzes your features and shows you
                  exactly how you'll look with different hairstyles and colors.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/upload">
                    <Button
                      size="lg"
                      className="rounded-full h-12 px-8 text-base bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                    >
                      Try It Now
                      <ArrowRight className="ml-2 size-4" />
                    </Button>
                  </Link>
                  <Button
                    size="lg"
                    variant="outline"
                    className="rounded-full h-12 px-8 text-base border-purple-200 hover:bg-purple-50 bg-transparent"
                  >
                    See Examples
                  </Button>
                </div>
                <div className="flex items-center justify-start gap-4 mt-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Check className="size-4 text-purple-500" />
                    <span>Free to try</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Check className="size-4 text-purple-500" />
                    <span>Instant results</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Check className="size-4 text-purple-500" />
                    <span>Privacy protected</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="relative"
              >
                <div className="relative mx-auto max-w-md lg:max-w-lg">
                  <div className="rounded-2xl overflow-hidden shadow-2xl border border-border/40 bg-gradient-to-b from-background to-muted/20 p-4">
                    <Image
                      src="/images/demo-img1.png"
                      width={600}
                      height={600}
                      alt="FluxStyle AI transformation demo"
                      className="w-full h-auto rounded-xl"
                      priority
                    />
                  </div>
                  <div className="absolute -bottom-6 -right-6 -z-10 h-[200px] w-[200px] rounded-full bg-gradient-to-br from-purple-300/30 to-pink-300/30 blur-3xl opacity-70"></div>
                  <div className="absolute -top-6 -left-6 -z-10 h-[200px] w-[200px] rounded-full bg-gradient-to-br from-pink-300/30 to-orange-300/30 blur-3xl opacity-70"></div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="w-full py-20 md:py-32 bg-gradient-to-b from-purple-50/50 to-pink-50/50 dark:from-purple-950/20 dark:to-pink-950/20 relative overflow-hidden">
          <div className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-black bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_40%,transparent_100%)]"></div>

          <div className="container px-4 md:px-6 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center space-y-4 text-center mb-16"
            >
              <Badge
                className="rounded-full px-4 py-1.5 text-sm font-medium bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 border-purple-200"
                variant="secondary"
              >
                How It Works
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">How FluxStyle Works</h2>
              <p className="max-w-[800px] text-muted-foreground md:text-lg">
                Transform your look in three simple steps. Our AI does all the heavy lifting while you explore your
                style possibilities.
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                <div className="rounded-2xl overflow-hidden shadow-xl border border-border/40 bg-gradient-to-b from-background to-muted/20 p-6">
                  <Image
                    src="/images/demo-img2.png"
                    width={600}
                    height={400}
                    alt="FluxStyle process demonstration"
                    className="w-full h-auto rounded-xl"
                  />
                </div>
              </motion.div>

              <div className="grid gap-8">
                {[
                  {
                    step: "01",
                    title: "Upload Your Photo",
                    description:
                      "Simply upload a clear photo of yourself. Our AI works best with front-facing photos in good lighting.",
                    icon: <Upload className="size-6" />,
                  },
                  {
                    step: "02",
                    title: "Describe Your Style",
                    description:
                      "Describe in Natural language about hairstyles, colors, and looks you want to see on you.",
                    icon: <Palette className="size-6" />,
                  },
                  {
                    step: "03",
                    title: "See Your Transformation",
                    description:
                      "Watch as our AI instantly applies your chosen style to your photo with realistic, professional-quality results.",
                    icon: <Sparkles className="size-6" />,
                  },
                ].map((step, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="flex gap-4 items-start"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-white text-sm font-bold shadow-lg flex-shrink-0">
                      {step.step}
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="text-purple-500">{step.icon}</div>
                        <h3 className="text-xl font-bold">{step.title}</h3>
                      </div>
                      <p className="text-muted-foreground">{step.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Example Transformations Section */}
        <section id="transformations" className="w-full py-20 md:py-32">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center space-y-4 text-center mb-16"
            >
              <Badge
                className="rounded-full px-4 py-1.5 text-sm font-medium bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 border-purple-200"
                variant="secondary"
              >
                Transformations
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Before & After: See the Difference</h2>
              <p className="max-w-[800px] text-muted-foreground md:text-lg">
                Real transformations from real users. See how FluxStyle can help you discover your perfect look.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-center space-y-6"
              >
                <div className="relative">
                  <div className="rounded-2xl overflow-hidden shadow-xl border border-border/40 bg-gradient-to-b from-background to-muted/20 p-4">
                    <Image
                      src="https://sw01sn3hkeo9brjb.public.blob.vercel-storage.com/Demo%20img3.png"
                      width={400}
                      height={500}
                      alt="Sleek haircut transformation"
                      className="w-full h-auto rounded-xl"
                    />
                  </div>
                  <div className="absolute -bottom-4 -right-4 -z-10 h-[150px] w-[150px] rounded-full bg-gradient-to-br from-purple-300/30 to-pink-300/30 blur-2xl opacity-70"></div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Sleek Haircut</h3>
                  <p className="text-muted-foreground">Modern bob with subtle highlights</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-center space-y-6"
              >
                <div className="relative">
                  <div className="rounded-2xl overflow-hidden shadow-xl border border-border/40 bg-gradient-to-b from-background to-muted/20 p-4">
                    <Image
                      src="/images/demo-img4.png"
                      width={400}
                      height={500}
                      alt="Bold new color transformation"
                      className="w-full h-auto rounded-xl"
                    />
                  </div>
                  <div className="absolute -bottom-4 -left-4 -z-10 h-[150px] w-[150px] rounded-full bg-gradient-to-br from-pink-300/30 to-orange-300/30 blur-2xl opacity-70"></div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Bold New Color</h3>
                  <p className="text-muted-foreground">Vibrant red with layered styling</p>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center mt-12"
            >
              <Button
                size="lg"
                className="rounded-full h-12 px-8 text-base bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                See More Examples
                <ArrowRight className="ml-2 size-4" />
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section
          id="features"
          className="w-full py-20 md:py-32 bg-gradient-to-b from-purple-50/50 to-pink-50/50 dark:from-purple-950/20 dark:to-pink-950/20"
        >
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
            >
              <Badge
                className="rounded-full px-4 py-1.5 text-sm font-medium bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 border-purple-200"
                variant="secondary"
              >
                Features
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                Everything You Need to Find Your Perfect Look
              </h2>
              <p className="max-w-[800px] text-muted-foreground md:text-lg">
                Our advanced AI technology combined with an intuitive interface makes style exploration effortless and
                fun.
              </p>
            </motion.div>

            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {features.map((feature, i) => (
                <motion.div key={i} variants={item}>
                  <Card className="h-full overflow-hidden border-border/40 bg-gradient-to-b from-background to-muted/10 backdrop-blur transition-all hover:shadow-md hover:border-purple-200">
                    <CardContent className="p-6 flex flex-col h-full">
                      <div className="size-10 rounded-full bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 flex items-center justify-center text-purple-600 mb-4">
                        {feature.icon}
                      </div>
                      <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="w-full py-20 md:py-32 relative overflow-hidden">
          <div className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-black bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_40%,transparent_100%)]"></div>

          <div className="container px-4 md:px-6 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
            >
              <Badge
                className="rounded-full px-4 py-1.5 text-sm font-medium bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 border-purple-200"
                variant="secondary"
              >
                Pricing
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Simple, Affordable Pricing</h2>
              <p className="max-w-[800px] text-muted-foreground md:text-lg">
                Try FluxStyle for free, then choose the plan that fits your style exploration needs.
              </p>
            </motion.div>

            <div className="mx-auto max-w-4xl">
              <div className="grid gap-6 lg:grid-cols-3 lg:gap-8">
                {[
                  {
                    name: "Free",
                    price: "$0",
                    description: "Perfect for trying out FluxStyle.",
                    features: ["3 transformations per month", "Basic hairstyles", "Standard quality", "Email support"],
                    cta: "Get Started Free",
                  },
                  {
                    name: "Pro",
                    price: "$9.99",
                    description: "Ideal for style enthusiasts.",
                    features: [
                      "Unlimited transformations",
                      "Premium hairstyles & colors",
                      "HD quality results",
                      "Priority support",
                      "Save & share transformations",
                    ],
                    cta: "Start Pro Trial",
                    popular: true,
                  },
                  {
                    name: "Salon",
                    price: "$29.99",
                    description: "For professionals and salons.",
                    features: [
                      "Everything in Pro",
                      "Commercial usage rights",
                      "Bulk processing",
                      "Custom branding",
                      "API access",
                      "Dedicated support",
                    ],
                    cta: "Contact Sales",
                  },
                ].map((plan, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                  >
                    <Card
                      className={`relative overflow-hidden h-full ${plan.popular ? "border-purple-300 shadow-lg ring-2 ring-purple-200" : "border-border/40 shadow-md"} bg-gradient-to-b from-background to-muted/10 backdrop-blur`}
                    >
                      {plan.popular && (
                        <div className="absolute top-0 right-0 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 text-xs font-medium rounded-bl-lg">
                          Most Popular
                        </div>
                      )}
                      <CardContent className="p-6 flex flex-col h-full">
                        <h3 className="text-2xl font-bold">{plan.name}</h3>
                        <div className="flex items-baseline mt-4">
                          <span className="text-4xl font-bold">{plan.price}</span>
                          <span className="text-muted-foreground ml-1">/month</span>
                        </div>
                        <p className="text-muted-foreground mt-2">{plan.description}</p>
                        <ul className="space-y-3 my-6 flex-grow">
                          {plan.features.map((feature, j) => (
                            <li key={j} className="flex items-center">
                              <Check className="mr-2 size-4 text-purple-500" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                        <Button
                          className={`w-full mt-auto rounded-full ${plan.popular ? "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600" : "bg-muted hover:bg-muted/80"}`}
                          variant={plan.popular ? "default" : "outline"}
                        >
                          {plan.cta}
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section
          id="faq"
          className="w-full py-20 md:py-32 bg-gradient-to-b from-purple-50/50 to-pink-50/50 dark:from-purple-950/20 dark:to-pink-950/20"
        >
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
            >
              <Badge
                className="rounded-full px-4 py-1.5 text-sm font-medium bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 border-purple-200"
                variant="secondary"
              >
                FAQ
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Frequently Asked Questions</h2>
              <p className="max-w-[800px] text-muted-foreground md:text-lg">
                Everything you need to know about FluxStyle and how it works.
              </p>
            </motion.div>

            <div className="mx-auto max-w-3xl">
              <Accordion type="single" collapsible className="w-full">
                {[
                  {
                    question: "How accurate are the AI transformations?",
                    answer:
                      "Our AI technology provides highly realistic previews that give you a great idea of how you'll look with different styles. While results may vary slightly in real life due to hair texture and other factors, our transformations are designed to be as accurate as possible.",
                  },
                  {
                    question: "What types of photos work best?",
                    answer:
                      "For the best results, use a clear, front-facing photo with good lighting. Avoid photos with hats, sunglasses, or heavy shadows on your face. The higher the quality of your original photo, the better your transformation will look.",
                  },
                  {
                    question: "Is my photo data secure and private?",
                    answer:
                      "Absolutely. We take privacy seriously. Your photos are processed securely and are never stored permanently on our servers. We don't share your images with third parties, and you can delete your data at any time.",
                  },
                  {
                    question: "Can I use FluxStyle for commercial purposes?",
                    answer:
                      "Commercial usage is available with our Salon plan. This includes rights to use transformations for marketing, client consultations, and other business purposes. Free and Pro plans are for personal use only.",
                  },
                  {
                    question: "How many different styles can I try?",
                    answer:
                      "We offer hundreds of different hairstyles, colors, and combinations. Our library is constantly growing, with new styles added regularly. Pro and Salon users get access to our complete premium collection.",
                  },
                  {
                    question: "Can I cancel my subscription anytime?",
                    answer:
                      "Yes, you can cancel your subscription at any time. There are no long-term commitments or cancellation fees. If you cancel, you'll continue to have access to your plan features until the end of your current billing period.",
                  },
                ].map((faq, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                  >
                    <AccordionItem value={`item-${i}`} className="border-b border-border/40 py-2">
                      <AccordionTrigger className="text-left font-medium hover:no-underline">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
                    </AccordionItem>
                  </motion.div>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-20 md:py-32 bg-gradient-to-br from-purple-600 to-pink-600 text-white relative overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>

          <div className="container px-4 md:px-6 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center space-y-6 text-center"
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
                Your Next Look is One Click Away
              </h2>
              <p className="mx-auto max-w-[700px] text-white/90 md:text-xl">
                Join thousands of people who have discovered their perfect style with FluxStyle. Transform your look in
                seconds and see yourself in a whole new way.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <Link href="/upload">
                  <Button
                    size="lg"
                    variant="secondary"
                    className="rounded-full h-12 px-8 text-base bg-white text-purple-600 hover:bg-gray-100"
                  >
                    Start My Transformation
                    <ArrowRight className="ml-2 size-4" />
                  </Button>
                </Link>
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full h-12 px-8 text-base bg-transparent border-white text-white hover:bg-white/10"
                >
                  See More Examples
                </Button>
              </div>
              <p className="text-sm text-white/80 mt-4">Free to try. No credit card required. Instant results.</p>
            </motion.div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t bg-background/95 backdrop-blur-sm">
        <div className="container flex flex-col gap-8 px-4 py-10 md:px-6 lg:py-16">
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
            <div className="space-y-4">
              <div className="flex items-center gap-2 font-bold">
                <div className="size-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white">
                  S
                </div>
                <span>FluxStyle</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Transform your look with AI-powered style recommendations. Discover your perfect hairstyle in seconds.
              </p>
              <div className="flex gap-4">
                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="size-5"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                  <span className="sr-only">Facebook</span>
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="size-5"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                  <span className="sr-only">Twitter</span>
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="size-5"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect width="4" height="12" x="2" y="9"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                  <span className="sr-only">LinkedIn</span>
                </Link>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-bold">Product</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    href="#transformations"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Examples
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    API
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-bold">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    Style Guide
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    Tutorials
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    Support
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-bold">Company</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row justify-between items-center border-t border-border/40 pt-8">
            <p className="text-xs text-muted-foreground">
              &copy; {new Date().getFullYear()} FluxStyle. All rights reserved.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                Terms of Service
              </Link>
              <Link href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
