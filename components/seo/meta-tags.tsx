import Head from "next/head"

interface MetaTagsProps {
  title?: string
  description?: string
  keywords?: string
  ogImage?: string
  canonicalUrl?: string
}

export function MetaTags({
  title = "Click. Trust. Regret. - A Book by Oluwatoni Abraham",
  description = "A chilling reflection of the decision-making moments that lead to scams. Learn how to protect yourself from cyber fraud with practical cybersecurity strategies.",
  keywords = "cybersecurity, scam prevention, phishing, online safety, cyber fraud, identity theft, SMShing, ransomware, digital security, online banking fraud, dating scams",
  ogImage = "/images/book-cover.png",
  canonicalUrl,
}: MetaTagsProps) {
  const fullTitle = title.includes("Click. Trust. Regret.") ? title : `${title} | Click. Trust. Regret.`

  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Oluwatoni Abraham" />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />

      {/* Canonical URL */}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:alt" content="Click. Trust. Regret. Book Cover" />
      <meta property="og:site_name" content="Click. Trust. Regret." />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={ogImage} />
      <meta property="twitter:image:alt" content="Click. Trust. Regret. Book Cover" />

      {/* Additional SEO Meta Tags */}
      <meta name="theme-color" content="#ef4444" />
      <meta name="msapplication-TileColor" content="#ef4444" />
      <meta name="application-name" content="Click. Trust. Regret." />

      {/* Book-specific meta tags */}
      <meta name="book:author" content="Oluwatoni Abraham" />
      <meta name="book:isbn" content="B0DQWR8LRD" />
      <meta name="book:release_date" content="2024" />
      <meta name="book:tag" content="cybersecurity" />
      <meta name="book:tag" content="scam prevention" />
      <meta name="book:tag" content="digital safety" />
    </Head>
  )
}
