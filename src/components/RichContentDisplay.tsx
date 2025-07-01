'use client';

import React from 'react';

interface RichContentDisplayProps {
  content: string;
  className?: string;
}

// Fonction pour obtenir l'URL complète d'une image
function getImageUrl(url: string): string {
  if (!url) return '';
  
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  return `${supabaseUrl}/storage/v1/object/public/${url}`;
}

export default function RichContentDisplay({ content, className = '' }: RichContentDisplayProps) {
  if (!content) return null;

  // Traiter les images dans le contenu HTML
  const processImages = (htmlContent: string) => {
    // Remplacer les balises img par des composants Image Next.js optimisés
    return htmlContent.replace(
      /<img([^>]*?)src="([^"]*?)"([^>]*?)>/g,
      (match, before, src) => {
        // Extraire l'attribut alt s'il existe
        const altMatch = match.match(/alt="([^"]*?)"/);
        const alt = altMatch ? altMatch[1] : 'Image';
        
        // Extraire la classe s'il existe
        const classMatch = match.match(/class="([^"]*?)"/);
        const imgClass = classMatch ? classMatch[1] : '';
        
        return `<div class="rich-image-container ${imgClass}">
          <img src="${getImageUrl(src)}" alt="${alt}" class="rich-content-image" />
        </div>`;
      }
    );
  };

  const processedContent = processImages(content);

  return (
    <div className={`rich-content-display ${className}`}>
      <div 
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: processedContent }}
      />
      
      <style jsx>{`
        .rich-content-display :global(.prose) {
          color: #374151;
          line-height: 1.8;
          font-size: 1.1rem;
        }

        .rich-content-display :global(.prose h1) {
          color: #92400e;
          font-size: 2.5rem;
          font-weight: 700;
          margin-top: 3rem;
          margin-bottom: 1.5rem;
          border-bottom: 3px solid #f59e0b;
          padding-bottom: 0.75rem;
          position: relative;
        }

        .rich-content-display :global(.prose h1:first-child) {
          margin-top: 0;
        }

        .rich-content-display :global(.prose h1::after) {
          content: '';
          position: absolute;
          bottom: -3px;
          left: 0;
          width: 60px;
          height: 3px;
          background: linear-gradient(to right, #f59e0b, #d97706);
          border-radius: 2px;
        }

        .rich-content-display :global(.prose h2) {
          color: #b45309;
          font-size: 2rem;
          font-weight: 600;
          margin-top: 2.5rem;
          margin-bottom: 1.25rem;
          position: relative;
          padding-left: 1.5rem;
        }

        .rich-content-display :global(.prose h2::before) {
          content: '';
          position: absolute;
          left: 0;
          top: 0.25rem;
          width: 6px;
          height: 100%;
          background: linear-gradient(to bottom, #f59e0b, #d97706);
          border-radius: 3px;
        }

        .rich-content-display :global(.prose h3) {
          color: #d97706;
          font-size: 1.5rem;
          font-weight: 500;
          margin-top: 2rem;
          margin-bottom: 1rem;
          position: relative;
        }

        .rich-content-display :global(.prose h3::before) {
          content: '🌿';
          margin-right: 0.5rem;
          font-size: 1.2rem;
        }

        .rich-content-display :global(.prose p) {
          margin-bottom: 1.75rem;
          text-align: justify;
          line-height: 1.8;
        }

        .rich-content-display :global(.prose strong) {
          color: #92400e;
          font-weight: 600;
        }

        .rich-content-display :global(.prose em) {
          color: #b45309;
          font-style: italic;
        }

        .rich-content-display :global(.prose ul) {
          margin: 2rem 0;
          padding-left: 0;
          list-style: none;
        }

        .rich-content-display :global(.prose li) {
          margin: 1rem 0;
          padding-left: 2rem;
          position: relative;
          line-height: 1.7;
        }

        .rich-content-display :global(.prose ul li::before) {
          content: '🌿';
          position: absolute;
          left: 0;
          top: 0.1rem;
          font-size: 1.1rem;
        }

        .rich-content-display :global(.prose ol) {
          counter-reset: list-counter;
          margin: 2rem 0;
          padding-left: 0;
          list-style: none;
        }

        .rich-content-display :global(.prose ol li) {
          counter-increment: list-counter;
          margin: 1rem 0;
          padding-left: 2.5rem;
          position: relative;
          line-height: 1.7;
        }

        .rich-content-display :global(.prose ol li::before) {
          content: counter(list-counter) '.';
          position: absolute;
          left: 0;
          top: 0;
          color: #f59e0b;
          font-weight: 600;
          font-size: 1.1rem;
        }

        .rich-content-display :global(.prose blockquote) {
          border-left: 4px solid #f59e0b;
          background: linear-gradient(to right, #fffbeb, #fef7e7);
          padding: 2rem;
          margin: 2.5rem 0;
          border-radius: 0 12px 12px 0;
          position: relative;
          font-style: italic;
          box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
          font-size: 1.1rem;
        }

        .rich-content-display :global(.prose blockquote::before) {
          content: '"';
          position: absolute;
          top: 0.5rem;
          left: 1.5rem;
          font-size: 4rem;
          color: #f59e0b;
          opacity: 0.3;
          font-family: serif;
          line-height: 1;
        }

        .rich-content-display :global(.prose blockquote p) {
          margin: 0;
          padding-left: 2rem;
        }

        .rich-content-display :global(.rich-image-container) {
          margin: 2.5rem 0;
          text-align: center;
        }

        .rich-content-display :global(.rich-content-image) {
          width: 100%;
          max-width: 100%;
          height: auto;
          border-radius: 12px;
          box-shadow: 0 10px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .rich-content-display :global(.rich-content-image:hover) {
          transform: scale(1.02);
          box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.2), 0 10px 10px -5px rgb(0 0 0 / 0.1);
        }

        .rich-content-display :global(.prose a) {
          color: #0d9488;
          text-decoration: none;
          border-bottom: 2px solid #0d948830;
          transition: all 0.3s ease;
          font-weight: 500;
        }

        .rich-content-display :global(.prose a:hover) {
          color: #0f766e;
          border-bottom-color: #0f766e;
          background-color: #f0fdfa;
          padding: 2px 6px;
          border-radius: 4px;
          margin: 0 -2px;
        }

        .rich-content-display :global(.prose code) {
          background-color: #fef7e7;
          color: #92400e;
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          font-size: 0.9em;
          border: 1px solid #fed7aa;
          font-family: 'Courier New', monospace;
        }

        .rich-content-display :global(.prose hr) {
          border: none;
          height: 3px;
          background: linear-gradient(to right, transparent, #f59e0b, transparent);
          margin: 3rem 0;
          border-radius: 2px;
        }

        .rich-content-display :global(.prose mark) {
          background: linear-gradient(120deg, #fef3c7 0%, #fed7aa 100%);
          color: #92400e;
          padding: 2px 4px;
          border-radius: 4px;
          font-weight: 500;
        }

        .rich-content-display :global(.prose [style*="color"]) {
          font-weight: 500;
        }

        /* Amélioration responsive */
        @media (max-width: 768px) {
          .rich-content-display :global(.prose h1) {
            font-size: 2rem;
          }
          
          .rich-content-display :global(.prose h2) {
            font-size: 1.5rem;
          }
          
          .rich-content-display :global(.prose) {
            font-size: 1rem;
          }
          
          .rich-content-display :global(.prose blockquote) {
            padding: 1.5rem;
            margin: 2rem 0;
          }
        }
      `}</style>
    </div>
  );
}
