import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: string;
  schema?: any;
}

const SEO: React.FC<SEOProps> = ({
  title = 'TaskMates - Get Things Done with Trusted Professionals',
  description = 'Connect with skilled professionals for any task. From quick deliveries to specialized services, TaskMates helps you get things done efficiently and affordably.',
  keywords = ['tasks', 'services', 'professionals', 'india', 'gig economy'],
  image = 'https://taskmates.in/og-image.jpg',
  url = 'https://taskmates.in',
  type = 'website',
  schema
}) => {
  const defaultSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'TaskMates',
    url: 'https://taskmates.in',
    logo: 'https://taskmates.in/logo.png',
    sameAs: [
      'https://facebook.com/taskmates',
      'https://twitter.com/taskmates',
      'https://linkedin.com/company/taskmates',
      'https://instagram.com/taskmates',
      'https://youtube.com/taskmates'
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+91-9916666560',
      contactType: 'customer service',
      areaServed: 'IN',
      availableLanguage: ['en', 'hi', 'ta', 'te', 'ml', 'kn']
    }
  };

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <html lang="en" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />
      <link rel="canonical" href={url} />
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      <meta name="google" content="notranslate" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="TaskMates" />
      <meta property="og:locale" content="en_IN" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:site" content="@taskmates" />

      {/* Mobile Meta */}
      <meta name="format-detection" content="telephone=no" />
      <meta name="theme-color" content="#2196F3" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(schema || defaultSchema)}
      </script>

      {/* Preconnect to Important Origins */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://images.unsplash.com" />
    </Helmet>
  );
};

export default SEO;