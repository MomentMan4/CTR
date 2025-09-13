"use client"

import { useEffect } from "react"

export function StructuredData() {
  useEffect(() => {
    // Book Schema
    const bookSchema = {
      "@context": "https://schema.org",
      "@type": "Book",
      name: "Click. Trust. Regret.",
      author: {
        "@type": "Person",
        name: "Oluwatoni Abraham",
        url: "https://aoabraham.substack.com",
        sameAs: [
          "https://www.facebook.com/profile.php?id=61572996085853",
          "https://www.instagram.com/click.trust.regret",
        ],
      },
      description:
        "A chilling reflection of the decision-making moments that lead to scams. Learn how to protect yourself from cyber fraud.",
      genre: ["Cybersecurity", "Self-Help", "Technology", "Personal Finance"],
      isbn: "B0DQWR8LRD",
      publisher: {
        "@type": "Organization",
        name: "Amazon Kindle Direct Publishing",
      },
      datePublished: "2024",
      inLanguage: "en-US",
      numberOfPages: "200",
      bookFormat: "https://schema.org/EBook",
      url: "https://www.amazon.com/dp/B0DQWR8LRD",
      offers: {
        "@type": "Offer",
        price: "9.99",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        url: "https://www.amazon.com/dp/B0DQWR8LRD",
      },
      keywords:
        "cybersecurity, scam prevention, phishing, online safety, cyber fraud, identity theft, SMShing, ransomware, digital security",
      about: [
        {
          "@type": "Thing",
          name: "Cybersecurity",
        },
        {
          "@type": "Thing",
          name: "Scam Prevention",
        },
        {
          "@type": "Thing",
          name: "Digital Safety",
        },
      ],
    }

    // Website Schema
    const websiteSchema = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Click. Trust. Regret. - Official Book Website",
      url: window.location.origin,
      description: "Official website for the cybersecurity book 'Click. Trust. Regret.' by Oluwatoni Abraham",
      author: {
        "@type": "Person",
        name: "Oluwatoni Abraham",
      },
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: "https://www.amazon.com/s?k={search_term_string}+click+trust+regret",
        },
        "query-input": "required name=search_term_string",
      },
    }

    // FAQ Schema
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is Click. Trust. Regret. about?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Click. Trust. Regret. is a cybersecurity book that explores the decision-making moments that lead to scams. It provides practical advice on identifying and preventing cyber fraud, including phishing emails, SMShing scams, online banking fraud, and identity theft.",
          },
        },
        {
          "@type": "Question",
          name: "Who should read this book?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "This book is perfect for anyone who uses the internet, online banking, email, or social media. It's especially valuable for individuals who want to protect themselves and their families from cyber scams and fraud.",
          },
        },
        {
          "@type": "Question",
          name: "What will I learn from this book?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "You'll learn to spot warning signs of scams, protect your online identity, recognize phishing emails and SMShing attacks, secure your financial accounts, prevent ransomware attacks, and identify online dating scams.",
          },
        },
        {
          "@type": "Question",
          name: "Is this book based on real experiences?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, the book is inspired by real-life events and includes stories of actual scam victims. The author himself experienced cyber fraud firsthand, which motivated him to write this guide.",
          },
        },
      ],
    }

    // Organization Schema
    const organizationSchema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Click. Trust. Regret.",
      url: window.location.origin,
      logo: `${window.location.origin}/images/book-cover.png`,
      description: "Cybersecurity education and scam prevention resources",
      founder: {
        "@type": "Person",
        name: "Oluwatoni Abraham",
      },
      sameAs: [
        "https://www.facebook.com/profile.php?id=61572996085853",
        "https://www.instagram.com/click.trust.regret",
        "https://aoabraham.substack.com",
      ],
    }

    // Add all schemas to the page
    const schemas = [bookSchema, websiteSchema, faqSchema, organizationSchema]

    schemas.forEach((schema, index) => {
      const script = document.createElement("script")
      script.type = "application/ld+json"
      script.id = `structured-data-${index}`
      script.textContent = JSON.stringify(schema)
      document.head.appendChild(script)
    })

    // Cleanup function
    return () => {
      schemas.forEach((_, index) => {
        const script = document.getElementById(`structured-data-${index}`)
        if (script) {
          document.head.removeChild(script)
        }
      })
    }
  }, [])

  return null
}
