'use client';

import { useState } from 'react';
import Image from 'next/image';

interface RichContentProps {
  content: string;
  imageUrl?: string;
  imageAlt?: string;
  imageCaption?: string;
  additionalImages?: { url: string; alt: string; caption?: string }[];
  className?: string;
}

export default function RichContent({ 
  content, 
  imageUrl,
  imageAlt,
  imageCaption,
  additionalImages = [],
  className = '' 
}: RichContentProps) {
  const [imageErrors, setImageErrors] = useState<{ [key: string]: boolean }>({});

  // Combiner l'image principale avec les images additionnelles
  const allImages = [
    ...(imageUrl ? [{
      url: imageUrl,
      alt: imageAlt || 'Image',
      caption: imageCaption
    }] : []),
    ...additionalImages
  ];

  // Fonction pour parser le contenu et identifier les sections
  const parseContent = (text: string) => {
    // Séparer le contenu en sections basées sur les doubles retours à la ligne
    const sections = text.split('\n\n').filter(section => section.trim());
    
    return sections.map((section, index) => {
      const trimmedSection = section.trim();
      
      // Identifier les titres (lignes qui commencent par # ou sont en MAJUSCULES)
      if (trimmedSection.startsWith('#')) {
        const level = (trimmedSection.match(/^#+/) || [''])[0].length;
        const titleText = trimmedSection.replace(/^#+\s*/, '');
        return { type: 'title', content: titleText, level, index };
      }
      
      // Identifier les titres en majuscules (au moins 10 caractères en majuscules)
      if (trimmedSection.match(/^[A-ZÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝÞŸ\s]{10,}$/)) {
        return { type: 'title', content: trimmedSection, level: 2, index };
      }
      
      // Identifier les listes (lignes qui commencent par - ou •)
      if (trimmedSection.includes('\n-') || trimmedSection.includes('\n•')) {
        const items = trimmedSection.split('\n').filter(line => 
          line.trim().startsWith('-') || line.trim().startsWith('•')
        );
        if (items.length > 1) {
          return { type: 'list', content: trimmedSection, index };
        }
      }
      
      // Contenu normal
      return { type: 'paragraph', content: trimmedSection, index };
    });
  };

  const handleImageError = (imageKey: string) => {
    setImageErrors(prev => ({ ...prev, [imageKey]: true }));
  };

  const getImageUrl = (url: string) => {
    // Si l'URL commence par http, l'utiliser directement
    if (url.startsWith('http')) {
      return url;
    }
    // Sinon, construire l'URL Supabase Storage
    return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${url}`;
  };

  const sections = parseContent(content);
  const imageInsertPositions = allImages.length > 0 ? Math.floor(sections.length / (allImages.length + 1)) : 0;

  return (
    <div className={`prose prose-lg max-w-none ${className}`}>
      {sections.map((section, sectionIndex) => {
        const imageIndex = imageInsertPositions > 0 ? Math.floor(sectionIndex / imageInsertPositions) : -1;
        const shouldShowImage = imageIndex < allImages.length && 
                               imageIndex >= 0 &&
                               sectionIndex % imageInsertPositions === Math.floor(imageInsertPositions / 2) &&
                               !imageErrors[`image-${imageIndex}`];

        return (
          <div key={section.index}>
            {/* Contenu de la section */}
            {section.type === 'title' && (
              <>
                {section.level === 1 && (
                  <h2 className="text-2xl font-bold text-amber-900 mt-8 mb-4 font-playfair">
                    {section.content}
                  </h2>
                )}
                {section.level === 2 && (
                  <h3 className="text-xl font-bold text-amber-900 mt-6 mb-3 font-playfair">
                    {section.content}
                  </h3>
                )}
                {(section.level || 1) >= 3 && (
                  <h4 className="text-lg font-semibold text-amber-900 mt-4 mb-2 font-playfair">
                    {section.content}
                  </h4>
                )}
              </>
            )}
            
            {section.type === 'list' && (
              <div className="my-6">
                {section.content.split('\n').map((line, lineIndex) => {
                  const trimmedLine = line.trim();
                  if (trimmedLine.startsWith('-') || trimmedLine.startsWith('•')) {
                    return (
                      <div key={lineIndex} className="flex items-start mb-2">
                        <span className="text-amber-600 mr-3 mt-1 flex-shrink-0">•</span>
                        <span className="text-amber-800 leading-relaxed">
                          {trimmedLine.replace(/^[-•]\s*/, '')}
                        </span>
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            )}
            
            {section.type === 'paragraph' && (
              <p className="text-amber-800 leading-relaxed mb-6 text-justify">
                {section.content}
              </p>
            )}

            {/* Insérer une image si nécessaire */}
            {shouldShowImage && allImages[imageIndex] && (
              <div className="my-8 rounded-xl overflow-hidden shadow-lg border border-amber-200 bg-white">
                <div className="relative h-64 md:h-80">
                  <Image
                    src={getImageUrl(allImages[imageIndex].url)}
                    alt={allImages[imageIndex].alt}
                    fill
                    className="object-cover"
                    onError={() => handleImageError(`image-${imageIndex}`)}
                  />
                </div>
                {allImages[imageIndex].caption && (
                  <div className="bg-white p-4">
                    <p className="text-sm text-amber-600 italic text-center">
                      {allImages[imageIndex].caption}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}

      {/* Images restantes à la fin si pas encore affichées */}
      {allImages.slice(Math.ceil(sections.length / imageInsertPositions)).map((image, index) => {
        const imageKey = `end-image-${index}`;
        if (imageErrors[imageKey]) return null;
        
        return (
          <div key={imageKey} className="my-8 rounded-xl overflow-hidden shadow-lg border border-amber-200 bg-white">
            <div className="relative h-64 md:h-80">
              <Image
                src={getImageUrl(image.url)}
                alt={image.alt}
                fill
                className="object-cover"
                onError={() => handleImageError(imageKey)}
              />
            </div>
            {image.caption && (
              <div className="bg-white p-4">
                <p className="text-sm text-amber-600 italic text-center">
                  {image.caption}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
