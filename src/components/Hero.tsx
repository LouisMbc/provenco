import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {
  return (
    <div className="relative isolate overflow-hidden">
      {/* Image de fond Provence */}
      <div className="absolute inset-0 -z-20">
        <Image
          src="/image/provence/la-provence.jpg"
          alt="Paysage de la Provence authentique"
          fill
          className="object-cover"
          priority
        />
      </div>
      
      {/* Overlay gradient pour améliorer la lisibilité du texte */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-black/40 via-amber-900/30 to-orange-900/40" />
      
      <div className="relative px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl drop-shadow-lg">
            Découvrez la 
            <span className="bg-gradient-to-r from-amber-300 to-orange-300 bg-clip-text text-transparent"> Provence </span>
            Authentique
          </h1>
          <p className="mt-6 text-lg leading-8 text-amber-100 drop-shadow">
            Plongez dans l&apos;histoire millénaire de la Provence, explorez ses légendes fascinantes, 
            découvrez ses monuments emblématiques et laissez-vous charmer par ses villes authentiques 
            aux couleurs dorées du soleil méditerranéen.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/villes"
              className="rounded-md bg-gradient-to-r from-amber-600 to-orange-600 px-6 py-3 text-sm font-semibold text-white shadow-lg hover:from-amber-700 hover:to-orange-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 transition-all duration-200 hover:shadow-xl"
            >
              Explorer les villes
            </Link>
            <Link
              href="/histoires"
              className="text-sm font-semibold leading-6 text-amber-200 hover:text-white transition-colors duration-200 drop-shadow"
            >
              Lire les histoires <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
