"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
  ShieldCheck,
  Lock,
  User,
  CreditCard,
  Mail,
  Smartphone,
  Heart,
  Menu,
  ShoppingCart,
  MoonStar,
  Sun,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useTheme } from "next-themes"

// Import the VisitorCounter at the top of your file
import { VisitorCounter } from "@/components/visitor-counter"

// Custom hook for click outside detection
const useClickOutside = (handler: () => void) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [handler])

  return ref
}

export default function BookLandingPage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const menuRef = useClickOutside(() => setMobileMenuOpen(false))

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }

    return () => {
      document.body.style.overflow = "auto"
    }
  }, [mobileMenuOpen])

  const ThemeToggle = () => {
    const { theme, setTheme } = useTheme()

    return (
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="w-9 h-9 p-0"
        aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      >
        <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <MoonStar className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    )
  }

  const handleLinkClick = () => {
    setMobileMenuOpen(false)
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:p-4 focus:bg-background focus:text-foreground"
      >
        Skip to main content
      </a>
      {/* Header */}
      <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-border shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative h-8 w-6 overflow-hidden rounded-sm shadow-sm">
                <Image
                  src="/images/book-cover.png"
                  alt="Book Cover"
                  width={24}
                  height={36}
                  className="h-full w-full object-cover"
                  priority
                />
              </div>
              <span className="font-bold text-xl">Click. Trust. Regret.</span>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="#story" className="text-sm font-medium hover:text-red-500 transition-colors">
                My Story
              </Link>
              <Link href="#victims" className="text-sm font-medium hover:text-red-500 transition-colors">
                Real Stories
              </Link>
              <Link href="#learn" className="text-sm font-medium hover:text-red-500 transition-colors">
                What You'll Learn
              </Link>
              <Link href="#author" className="text-sm font-medium hover:text-red-500 transition-colors">
                About the Author
              </Link>
              <Link
                href="https://www.amazon.com/dp/B0DQWR8LRD"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2"
              >
                <ShoppingCart className="h-4 w-4" />
                <span>Buy Now</span>
              </Link>
            </nav>
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <div className="md:hidden">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-9 w-9 p-0"
                  aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                  <span className="sr-only">{mobileMenuOpen ? "Close menu" : "Open menu"}</span>
                  {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black bg-opacity-50"
          >
            <motion.div
              ref={menuRef}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="absolute right-0 top-0 h-screen w-3/4 max-w-sm bg-background p-6 shadow-xl"
            >
              <div className="flex justify-end mb-8">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-9 w-9 p-0"
                  aria-label="Close menu"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <nav className="flex flex-col gap-6">
                <Link
                  href="#story"
                  className="text-lg font-medium hover:text-red-500 transition-colors"
                  onClick={handleLinkClick}
                >
                  My Story
                </Link>
                <Link
                  href="#victims"
                  className="text-lg font-medium hover:text-red-500 transition-colors"
                  onClick={handleLinkClick}
                >
                  Real Stories
                </Link>
                <Link
                  href="#learn"
                  className="text-lg font-medium hover:text-red-500 transition-colors"
                  onClick={handleLinkClick}
                >
                  What You'll Learn
                </Link>
                <Link
                  href="#author"
                  className="text-lg font-medium hover:text-red-500 transition-colors"
                  onClick={handleLinkClick}
                >
                  About the Author
                </Link>
                <Link
                  href="https://www.amazon.com/dp/B0DQWR8LRD"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-full text-lg font-medium transition-colors flex items-center gap-2 justify-center mt-4"
                  onClick={handleLinkClick}
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span>Buy Now on Amazon</span>
                </Link>
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section with enhanced background */}
      <section id="main-content" className="relative overflow-hidden">
        {/* Enhanced animated background */}
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-100 via-yellow-300 to-yellow-200 opacity-90 dark:opacity-70">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.2 }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
            className="absolute inset-0 bg-red-500 blur-3xl rounded-full -top-1/2 left-1/4"
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.15 }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse", delay: 1 }}
            className="absolute inset-0 bg-yellow-600 blur-3xl rounded-full top-1/3 -right-1/4"
          />

          {/* Digital elements background */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-[10%] left-[5%] text-6xl">@</div>
            <div className="absolute top-[15%] left-[25%] text-4xl">{"{"}</div>
            <div className="absolute top-[30%] left-[15%] text-5xl">$</div>
            <div className="absolute top-[45%] left-[35%] text-7xl">#</div>
            <div className="absolute top-[60%] left-[10%] text-5xl">{"}"}</div>
            <div className="absolute top-[75%] left-[30%] text-6xl">*</div>

            <div className="absolute top-[5%] right-[15%] text-5xl">{"<"}</div>
            <div className="absolute top-[20%] right-[25%] text-6xl">{">"}</div>
            <div className="absolute top-[40%] right-[10%] text-4xl">%</div>
            <div className="absolute top-[55%] right-[20%] text-7xl">&</div>
            <div className="absolute top-[70%] right-[5%] text-5xl">!</div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="md:w-1/2 space-y-6"
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={isLoaded ? { opacity: 1 } : {}}
                transition={{ duration: 1, delay: 0.5 }}
              >
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
                  <span className="block">Click.</span>
                  <span className="block">Trust.</span>
                  <motion.span
                    initial={{ color: "#000" }}
                    animate={{ color: "#ef4444" }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
                    className="block text-red-600 dark:text-red-500"
                  >
                    Regret.
                  </motion.span>
                </h1>
                <h2 className="text-lg md:text-xl max-w-xl mt-4 font-medium">
                  A Comprehensive Guide to Cybersecurity and Scam Prevention
                </h2>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={isLoaded ? { opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="text-lg md:text-xl max-w-xl"
              >
                A chilling reflection of the decision-making moments that lead to scams.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 1 }}
              >
                <Link href="https://www.amazon.com/dp/B0DQWR8LRD" target="_blank" rel="noopener noreferrer">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block">
                    <Button
                      size="lg"
                      className="bg-red-600 hover:bg-red-700 text-white rounded-full px-8 py-6 text-lg font-bold shadow-lg hover:shadow-xl transition-all flex items-center gap-3"
                    >
                      <ShoppingCart className="h-5 w-5" />
                      Get Your Copy Now
                    </Button>
                  </motion.div>
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              animate={isLoaded ? { opacity: 1, scale: 1, rotate: 0 } : {}}
              transition={{ duration: 1, delay: 0.5 }}
              className="md:w-1/2 flex justify-center"
            >
              <div className="relative w-64 md:w-80 h-auto shadow-2xl rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
                <Image
                  src="/images/book-cover.png"
                  alt="Click. Trust. Regret. Book Cover"
                  width={400}
                  height={600}
                  className="w-full h-auto"
                  priority
                />
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.7, 0] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "loop", delay: 2 }}
                  className="absolute inset-0 bg-red-500 mix-blend-overlay"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Story Section with enhanced background */}
      <section id="story" className="py-20 bg-background relative overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="grid grid-cols-10 grid-rows-10 h-full w-full">
            {Array.from({ length: 100 }).map((_, i) => (
              <div key={i} className="flex items-center justify-center text-xs">
                {i % 5 === 0 ? "@" : i % 7 === 0 ? "$" : i % 3 === 0 ? "#" : i % 2 === 0 ? "!" : "&"}
              </div>
            ))}
          </div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              My Personal Journey: How One Click Changed Everything
            </h2>
            <h3 className="text-xl font-semibold mb-4">The Message That Started It All</h3>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto p-6 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg border-l-4 border-red-500 mb-12 shadow-lg"
          >
            <p className="text-xl font-medium italic">
              "Interac e-Transfer: You've received $XXX.xx. Click to deposit."
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-lg leading-relaxed space-y-6"
          >
            <p>I was expecting money, so I clicked without hesitation.</p>
            <p>
              Seconds later, panic set in—my entire bank account had been drained. Every cent gone. The response from my
              bank was devastating:
            </p>
            <p className="font-bold text-red-600 dark:text-red-500 text-xl">"There's nothing we can do."</p>
            <p>
              I felt betrayed, financially shattered, and emotionally overwhelmed. I'd fallen victim to an increasingly
              common cyber scam known as SMShing—and my life was turned upside down by a single click.
            </p>
            <p className="font-medium">But my story isn't unique.</p>
            <p>
              Every day, people like you and me are exploited by cyber scams designed to manipulate trust and trigger
              fear. This painful experience inspired me to fight back through awareness and education, leading to my
              book, Click. Trust. Regret.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Victims Section with enhanced background */}
      <section id="victims" className="py-20 bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
        {/* Digital network background */}
        <div className="absolute inset-0">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path
                  d="M 40 0 L 0 0 0 40"
                  fill="none"
                  stroke="rgba(0,0,0,0.03)"
                  strokeWidth="1"
                  className="dark:stroke-white/5"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />

            {/* Connection lines */}
            <g stroke="rgba(239, 68, 68, 0.05)" className="dark:stroke-red-500/10" strokeWidth="1">
              <line x1="10%" y1="20%" x2="30%" y2="40%" />
              <line x1="30%" y1="40%" x2="50%" y2="30%" />
              <line x1="50%" y1="30%" x2="70%" y2="50%" />
              <line x1="70%" y1="50%" x2="90%" y2="40%" />
              <line x1="20%" y1="60%" x2="40%" y2="70%" />
              <line x1="40%" y1="70%" x2="60%" y2="80%" />
              <line x1="60%" y1="80%" x2="80%" y2="60%" />
            </g>

            {/* Connection nodes */}
            <g fill="rgba(239, 68, 68, 0.1)" className="dark:fill-red-500/10">
              <circle cx="10%" cy="20%" r="5" />
              <circle cx="30%" cy="40%" r="5" />
              <circle cx="50%" cy="30%" r="5" />
              <circle cx="70%" cy="50%" r="5" />
              <circle cx="90%" cy="40%" r="5" />
              <circle cx="20%" cy="60%" r="5" />
              <circle cx="40%" cy="70%" r="5" />
              <circle cx="60%" cy="80%" r="5" />
              <circle cx="80%" cy="60%" r="5" />
            </g>
          </svg>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Real Stories. Real Consequences.</h2>
            <p className="text-lg">In this compelling book, inspired by real-life events, you'll meet:</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "Sarah",
                icon: <Mail className="h-10 w-10 text-red-500" />,
                story: "Whose savings vanished after clicking a convincing phishing email.",
              },
              {
                name: "Kevin",
                icon: <User className="h-10 w-10 text-red-500" />,
                story: "Whose small oversight led to a devastating company-wide breach.",
              },
              {
                name: "Margaret",
                icon: <Heart className="h-10 w-10 text-red-500" />,
                story: "Who was the victim of an online dating (love) scam, betrayed emotionally and financially.",
              },
              {
                name: "Marcus",
                icon: <CreditCard className="h-10 w-10 text-red-500" />,
                story: "Whose identity was stolen, watching helplessly as his life was hijacked.",
              },
            ].map((victim, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300 border-t-4 border-yellow-400">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className="mb-4 p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-full">{victim.icon}</div>
                    <h3 className="text-xl font-bold mb-2">{victim.name}</h3>
                    <p>{victim.story}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center mt-16"
          >
            <p className="text-xl font-bold">But this book isn't just about loss—it's about empowerment.</p>
          </motion.div>
        </div>
      </section>

      {/* What You'll Learn Section with enhanced background */}
      <section id="learn" className="py-20 bg-background relative overflow-hidden">
        {/* Subtle circuit board pattern background */}
        <div className="absolute inset-0">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="circuit" width="100" height="100" patternUnits="userSpaceOnUse">
                <path
                  d="M 0 50 L 50 50 L 50 0"
                  fill="none"
                  stroke="rgba(0,0,0,0.02)"
                  strokeWidth="1"
                  className="dark:stroke-white/5"
                />
                <path
                  d="M 50 100 L 50 50 L 100 50"
                  fill="none"
                  stroke="rgba(0,0,0,0.02)"
                  strokeWidth="1"
                  className="dark:stroke-white/5"
                />
                <circle cx="50" cy="50" r="3" fill="rgba(239, 68, 68, 0.05)" className="dark:fill-red-500/10" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#circuit)" />
          </svg>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Learn How to Identify and Prevent Cyber Scams</h2>
            <p className="text-lg">
              Each chapter provides practical advice, clear insights, and actionable steps to protect yourself, your
              loved ones, and your business.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {[
              {
                title: "Phishing Emails",
                icon: <Mail className="h-6 w-6" />,
                description: "Spotting fraudulent emails before your savings vanish.",
              },
              {
                title: "SMShing Scams",
                icon: <Smartphone className="h-6 w-6" />,
                description: "Recognize and avoid deceptive text messages urgently flagged by authorities.",
              },
              {
                title: "Online Banking Fraud",
                icon: <CreditCard className="h-6 w-6" />,
                description: "Protect your financial accounts from clever attacks.",
              },
              {
                title: "Identity Theft Protection",
                icon: <User className="h-6 w-6" />,
                description: "Safeguard your personal information online.",
              },
              {
                title: "Ransomware Prevention",
                icon: <Lock className="h-6 w-6" />,
                description: "Defend your data from attackers demanding ransom.",
              },
              {
                title: "Online Dating Scams",
                icon: <Heart className="h-6 w-6" />,
                description: "How affection can be weaponized against you.",
              },
            ].map((topic, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex gap-4 items-start p-6 rounded-lg hover:bg-yellow-50 dark:hover:bg-yellow-900/10 transition-colors duration-300 border border-transparent hover:border-yellow-200 dark:hover:border-yellow-900/30"
              >
                <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-full text-red-500">{topic.icon}</div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{topic.title}</h3>
                  <p>{topic.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-background relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Frequently Asked Questions</h2>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-8">
            {[
              {
                question: "What makes this cybersecurity book different from others?",
                answer:
                  "Click. Trust. Regret. is based on real personal experience and focuses on the psychological aspects of how people fall for scams. It combines practical advice with emotional storytelling to help readers truly understand and remember the lessons.",
              },
              {
                question: "Is this book suitable for non-technical readers?",
                answer:
                  "Absolutely! The book is written in plain language and focuses on practical, everyday scenarios that anyone can understand and apply, regardless of their technical background.",
              },
              {
                question: "What specific types of scams does the book cover?",
                answer:
                  "The book covers phishing emails, SMShing (text message scams), online banking fraud, identity theft, ransomware attacks, and online dating scams, among others.",
              },
              {
                question: "How can this book help protect my family?",
                answer:
                  "The book provides clear warning signs to watch for and practical steps you can share with family members. It's designed to help you educate others about digital safety in an accessible way.",
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md"
              >
                <h3 className="text-xl font-bold mb-3">{faq.question}</h3>
                <p className="text-gray-700 dark:text-gray-300">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Empowerment Section with enhanced background */}
      <section className="py-20 bg-yellow-50 dark:bg-yellow-900/10 relative overflow-hidden">
        {/* Enhanced background with shield patterns */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full opacity-5">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="absolute"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  transform: `rotate(${Math.random() * 360}deg)`,
                  opacity: Math.random() * 0.5 + 0.1,
                }}
              >
                <ShieldCheck className="h-16 w-16" />
              </div>
            ))}
          </div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Empower Yourself with Actionable Digital Safety Strategies
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-x-16 gap-y-8 max-w-5xl mx-auto">
            {[
              "Learn to spot the warning signs and red flags scammers use.",
              "Take proactive steps to secure your online identity.",
              "Strengthen your cybersecurity awareness to stay ahead in a digital world.",
              "Reclaim control over your digital life without sacrificing trust.",
            ].map((strategy, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex gap-4 items-center p-4 rounded-lg bg-white dark:bg-white/5 bg-opacity-50 shadow-sm"
              >
                <div className="flex-shrink-0">
                  <ShieldCheck className="h-8 w-8 text-red-500" />
                </div>
                <p className="text-lg">{strategy}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center mt-16 p-8 bg-white dark:bg-white/5 bg-opacity-70 rounded-lg shadow-md"
          >
            <p className="text-2xl font-bold italic">
              "It takes one click to make a mistake—and that one click can redefine your life."
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA Section with enhanced background */}
      <section className="py-20 bg-gradient-to-br from-yellow-400 via-yellow-300 to-yellow-200 dark:from-yellow-900/70 dark:via-yellow-800/60 dark:to-yellow-900/50 relative overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
          className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 bg-red-500 rounded-full blur-3xl"
        />

        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
          className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 bg-red-500 rounded-full blur-3xl"
        />

        {/* Digital elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-[10%] left-[80%] text-6xl opacity-10">@</div>
          <div className="absolute top-[70%] left-[10%] text-7xl opacity-10">$</div>
          <div className="absolute top-[40%] left-[90%] text-5xl opacity-10">#</div>
          <div className="absolute top-[20%] left-[5%] text-8xl opacity-10">!</div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-8 text-gray-900 dark:text-white">
                Don't Become the Next Victim
              </h2>
              <p className="text-xl text-gray-800 dark:text-gray-100 mb-10 max-w-2xl mx-auto">
                Equip yourself with the knowledge to protect what matters most. Your security journey starts with one
                click—the right one.
              </p>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }} className="inline-block">
                <Link href="https://www.amazon.com/dp/B0DQWR8LRD" target="_blank" rel="noopener noreferrer">
                  <Button
                    size="lg"
                    className="bg-red-600 hover:bg-red-700 text-white rounded-full px-10 py-7 text-xl font-bold shadow-xl flex items-center gap-3"
                  >
                    <motion.div
                      animate={{ rotate: [0, 15, 0, -15, 0] }}
                      transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, repeatDelay: 3 }}
                    >
                      <ShoppingCart className="h-6 w-6" />
                    </motion.div>
                    Buy Now on Amazon
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Author Section with enhanced background */}
      <section id="author" className="py-20 bg-background relative overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="dots" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="10" cy="10" r="1" fill="rgba(0,0,0,0.03)" className="dark:fill-white/5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dots)" />
          </svg>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-10"
            >
              <h2 className="text-3xl font-bold mb-4">About the Author</h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex flex-col md:flex-row items-center gap-8 bg-yellow-50 dark:bg-yellow-900/10 p-8 rounded-xl shadow-md"
            >
              <div className="md:w-1/3">
                <div className="w-48 h-48 mx-auto rounded-full overflow-hidden border-4 border-yellow-300 dark:border-yellow-700 shadow-lg">
                  <Image
                    src="/images/author.jpeg"
                    alt="Oluwatoni Abraham"
                    width={200}
                    height={200}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="md:w-2/3">
                <h3 className="text-2xl font-bold mb-4">Oluwatoni Abraham</h3>
                <p className="text-lg mb-6">
                  After experiencing the devastating impact of cyber fraud firsthand, Oluwatoni Abraham dedicated
                  himself to helping others avoid similar experiences. Through extensive research and collaboration with
                  cybersecurity experts, he created this essential guide to navigating the increasingly dangerous
                  digital landscape.
                </p>
                <p className="text-lg">
                  His mission is simple: empower everyday people with the knowledge they need to protect themselves
                  online.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section id="newsletter" className="py-20 bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="grid grid-cols-10 grid-rows-10 h-full w-full">
            {Array.from({ length: 100 }).map((_, i) => (
              <div key={i} className="flex items-center justify-center text-xs">
                {i % 5 === 0 ? "@" : i % 7 === 0 ? "$" : i % 3 === 0 ? "#" : i % 2 === 0 ? "!" : "&"}
              </div>
            ))}
          </div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center mb-10"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Stay Updated on Cybersecurity</h2>
            <p className="text-lg mb-8">
              Subscribe to my newsletter for the latest tips, insights, and updates on protecting yourself online.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
              <iframe
                src="https://aoabraham.substack.com/embed"
                width="100%"
                height="320"
                style={{ border: "1px solid #EEE", background: "white" }}
                frameBorder="0"
                scrolling="no"
                title="Oluwatoni's Substack Newsletter"
                className="w-full dark:border-gray-700"
              ></iframe>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer with enhanced background */}
      <footer className="py-10 bg-gray-900 text-white relative overflow-hidden">
        {/* Digital network background */}
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid-footer" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-footer)" />
          </svg>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h3 className="text-2xl font-bold">Click. Trust. Regret.</h3>
              <p className="text-gray-400">© {new Date().getFullYear()} Oluwatoni Abraham. All rights reserved.</p>
              <div className="mt-2">
                <VisitorCounter />
              </div>
            </div>
            <div className="flex flex-col items-center md:items-end gap-4">
              {/* Product Hunt Badge - Added at the top of the footer links */}
              <div className="mb-2">
                <a
                  href="https://www.producthunt.com/posts/click-trust-regret?embed=true&utm_source=badge-featured&utm_medium=badge&utm_souce=badge-click&#0045;trust&#0045;regret"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block hover:opacity-90 transition-opacity"
                >
                  <img
                    src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=948812&theme=light&t=1743785403099"
                    alt="Click.Trust.Regret - A chilling reflection of key moments that lead to scams."
                    width="250"
                    height="54"
                    style={{ width: "250px", height: "54px" }}
                    className="dark:hidden"
                  />
                  {/* Dark theme version */}
                  <img
                    src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=948812&theme=dark&t=1743785403099"
                    alt="Click.Trust.Regret - A chilling reflection of key moments that lead to scams."
                    width="250"
                    height="54"
                    style={{ width: "250px", height: "54px" }}
                    className="hidden dark:block"
                  />
                </a>
              </div>

              <div className="flex gap-6">
                <Link
                  href="https://www.amazon.com/dp/B0DQWR8LRD"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-yellow-300 transition-colors flex items-center gap-2"
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span>Amazon</span>
                </Link>
                <Link
                  href={`mailto:aoabraham04@gmail.com`}
                  className="hover:text-yellow-300 transition-colors flex items-center gap-2"
                >
                  <Mail className="h-5 w-5" />
                  <span>Contact</span>
                </Link>
                <Link href="#" className="hover:text-yellow-300 transition-colors">
                  Privacy Policy
                </Link>
              </div>
              <div className="flex gap-4 mt-2">
                <Link
                  href="https://www.facebook.com/profile.php?id=61572996085853"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-yellow-300 transition-colors"
                  aria-label="Facebook"
                >
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
                    className="h-5 w-5"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </Link>
                <Link
                  href="https://www.instagram.com/click.trust.regret"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-yellow-300 transition-colors"
                  aria-label="Instagram"
                >
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
                    className="h-5 w-5"
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </Link>
                <Link
                  href={`mailto:aoabraham04@gmail.com`}
                  className="hover:text-yellow-300 transition-colors"
                  aria-label="Email"
                >
                  <Mail className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
