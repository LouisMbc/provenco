import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-amber-900 via-orange-900 to-amber-800 text-white">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8">
            <div>
              <div className="flex items-center">
                <Image 
                  src="/image/logo_prouvenco-removebg-preview.png" 
                  alt="Logo Provenco" 
                  width={120} 
                  height={40} 
                  className="h-10 w-auto"
                />
              </div>
              <p className="text-sm leading-6 text-amber-200 mt-2">
                Découvrez les trésors cachés de la Provence, ses histoires millénaires, 
                ses légendes fascinantes et ses monuments emblématiques.
              </p>
            </div>
            <div className="flex space-x-6">
              <span className="text-amber-300">
                Fait avec ❤️ pour la Provence
              </span>
            </div>
          </div>
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-amber-100">Découvrir</h3>
                <ul role="list" className="mt-6 space-y-4">
                  <li>
                    <Link href="/villes" className="text-sm leading-6 text-amber-200 hover:text-white transition-colors">
                      Villes de Provence
                    </Link>
                  </li>
                  <li>
                    <Link href="/histoires" className="text-sm leading-6 text-amber-200 hover:text-white transition-colors">
                      Histoires
                    </Link>
                  </li>
                  <li>
                    <Link href="/legendes" className="text-sm leading-6 text-amber-200 hover:text-white transition-colors">
                      Légendes
                    </Link>
                  </li>
                  <li>
                    <Link href="/monuments" className="text-sm leading-6 text-amber-200 hover:text-white transition-colors">
                      Monuments
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-amber-100">Départements</h3>
                <ul role="list" className="mt-6 space-y-4">
                  <li>
                    <Link href="/villes?dept=13" className="text-sm leading-6 text-amber-200 hover:text-white transition-colors">
                      Bouches-du-Rhône (13)
                    </Link>
                  </li>
                  <li>
                    <Link href="/villes?dept=83" className="text-sm leading-6 text-amber-200 hover:text-white transition-colors">
                      Var (83)
                    </Link>
                  </li>
                  <li>
                    <Link href="/villes?dept=84" className="text-sm leading-6 text-amber-200 hover:text-white transition-colors">
                      Vaucluse (84)
                    </Link>
                  </li>
                  <li>
                    <Link href="/villes?dept=04" className="text-sm leading-6 text-amber-200 hover:text-white transition-colors">
                      Alpes-de-Haute-Provence (04)
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-16 border-t border-amber-700 pt-8 sm:mt-20 lg:mt-24">
          <p className="text-xs leading-5 text-amber-300 text-center">
            &copy; 2025 Provence Authentique. Découvrez la beauté de la Provence.
          </p>
        </div>
      </div>
    </footer>
  );
}
