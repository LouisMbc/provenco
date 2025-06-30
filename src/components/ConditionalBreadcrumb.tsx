'use client';

import { usePathname } from 'next/navigation';
import Breadcrumb from './Breadcrumb';

export default function ConditionalBreadcrumb() {
  const pathname = usePathname();
  
  // Pages où on ne veut pas afficher le breadcrumb
  const excludedPaths = ['/', '/login'];
  
  // Vérifier si on doit afficher le breadcrumb
  const shouldShowBreadcrumb = !excludedPaths.includes(pathname);
  
  if (!shouldShowBreadcrumb) {
    return null;
  }
  
  return <Breadcrumb />;
}
