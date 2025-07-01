'use client';

interface SimpleContentDisplayProps {
  content: string;
  className?: string;
}

export default function SimpleContentDisplay({ content, className = '' }: SimpleContentDisplayProps) {
  if (!content) {
    return null;
  }

  return (
    <div 
      className={`prose prose-amber max-w-none ${className}`}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}

// Styles CSS pour l'affichage simple
const displayStyles = `
  .prose img {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
    margin: 16px 0;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  }

  .prose h2 {
    font-size: 1.5rem;
    font-weight: 600;
    margin-top: 1.5rem;
    margin-bottom: 0.75rem;
    color: #b45309;
  }

  .prose h3 {
    font-size: 1.25rem;
    font-weight: 500;
    margin-top: 1rem;
    margin-bottom: 0.5rem;
    color: #d97706;
  }

  .prose ul, .prose ol {
    margin: 1rem 0;
    padding-left: 2rem;
  }

  .prose li {
    margin: 0.25rem 0;
  }

  .prose p {
    margin: 0.75rem 0;
    line-height: 1.6;
  }

  .prose strong {
    font-weight: 600;
    color: #92400e;
  }

  .prose em {
    font-style: italic;
    color: #b45309;
  }
`;

// Injecter les styles dans le document
if (typeof document !== 'undefined') {
  const styleId = 'simple-content-display-styles';
  if (!document.getElementById(styleId)) {
    const styleSheet = document.createElement('style');
    styleSheet.id = styleId;
    styleSheet.textContent = displayStyles;
    document.head.appendChild(styleSheet);
  }
}
