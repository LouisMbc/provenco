import Hero from "@/components/Hero";
import MapCard from "@/components/MapCard";
import Link from "next/link";

export default function Home() {
  const features = [
    {
      title: "🏛️ Villes historiques",
      description: "Découvrez les villes emblématiques de Provence avec leur riche patrimoine architectural et culturel.",
      href: "/villes",
      icon: "🏛️"
    },
    {
      title: "📚 Histoires millénaires", 
      description: "Plongez dans les récits fascinants qui ont façonné l'identité provençale à travers les siècles.",
      href: "/histoires",
      icon: "📚"
    },
    {
      title: "✨ Légendes mystérieuses",
      description: "Explorez les contes et légendes qui donnent à la Provence son charme mystique unique.",
      href: "/legendes", 
      icon: "✨"
    },
    {
      title: "🏰 Monuments emblématiques",
      description: "Admirez les châteaux, églises et fontaines qui témoignent du génie architectural provençal.",
      href: "/monuments",
      icon: "🏰"
    }
  ];

  const departements = [
    { name: "Bouches-du-Rhône", code: "13", description: "Marseille, Aix-en-Provence, Arles..." },
    { name: "Var", code: "83", description: "Toulon, Saint-Tropez, Draguignan..." },
    { name: "Vaucluse", code: "84", description: "Avignon, Orange, Carpentras..." },
    { name: "Alpes-de-Haute-Provence", code: "04", description: "Digne-les-Bains, Manosque..." }
  ];

  return (
    <div className="bg-gradient-to-b from-amber-50 to-orange-50">
      <Hero />
      
      {/* Section Carte Interactive - Mise en avant */}
      <section className="py-16 bg-gradient-to-br from-amber-100 to-orange-100">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-amber-900 sm:text-4xl font-playfair">
              🗺️ Explorez la Provence
            </h2>
            <p className="mt-4 text-lg text-amber-700">
              Découvrez les villes authentiques sur une carte interactive
            </p>
          </div>
          <div className="mx-auto max-w-4xl">
            <MapCard />
          </div>
        </div>
      </section>
      
      {/* Section Découvrir */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-amber-900 sm:text-4xl font-playfair">
              Que souhaitez-vous découvrir ?
            </h2>
            <p className="mt-6 text-lg leading-8 text-amber-700">
              Explorez les différentes facettes de la Provence à travers nos collections thématiques
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
              {features.map((feature) => (
                <Link key={feature.title} href={feature.href} className="group">
                  <div className="flex flex-col bg-gradient-to-br from-amber-50 to-orange-50 p-8 rounded-2xl border border-amber-200 hover:border-amber-400 hover:shadow-xl transition-all duration-300">
                    <dt className="flex items-center gap-x-3 text-xl font-semibold leading-7 text-amber-900 group-hover:text-orange-600 transition-colors">
                      <span className="text-3xl">{feature.icon}</span>
                      {feature.title}
                    </dt>
                    <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-amber-700">
                      <p className="flex-auto">{feature.description}</p>
                      <p className="mt-6">
                        <span className="text-sm font-semibold leading-6 text-amber-600 group-hover:text-orange-600 transition-colors">
                          Explorer <span aria-hidden="true">→</span>
                        </span>
                      </p>
                    </dd>
                  </div>
                </Link>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Section Départements */}
      <section className="py-24 bg-gradient-to-br from-amber-100 to-orange-100">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-amber-900 sm:text-4xl font-playfair">
              Explorez par département
            </h2>
            <p className="mt-6 text-lg leading-8 text-amber-700">
              Chaque département de Provence a ses propres trésors à découvrir
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-2 xl:grid-cols-4">
            {departements.map((dept) => (
              <Link
                key={dept.code}
                href={`/villes?dept=${dept.code}`}
                className="group relative flex flex-col bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-amber-200 hover:border-amber-400"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-amber-100 text-amber-800">
                    {dept.code}
                  </span>
                  <span className="text-2xl">🌻</span>
                </div>
                <h3 className="text-lg font-semibold text-amber-900 group-hover:text-orange-600 transition-colors">
                  {dept.name}
                </h3>
                <p className="mt-2 text-sm text-amber-600 flex-1">
                  {dept.description}
                </p>
                <div className="mt-4 text-sm font-semibold text-amber-600 group-hover:text-orange-600 transition-colors">
                  Découvrir <span aria-hidden="true">→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Section CTA */}
      <section className="py-16 bg-gradient-to-r from-amber-600 to-orange-600">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl font-playfair">
              Commencez votre voyage en Provence
            </h2>
            <p className="mt-6 text-lg leading-8 text-amber-100">
              Laissez-vous guider à travers les merveilles de cette région unique où histoire, culture et beauté se rencontrent.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/villes"
                className="rounded-md bg-white px-6 py-3 text-sm font-semibold text-amber-600 shadow-sm hover:bg-amber-50 transition-all duration-200"
              >
                Explorer maintenant
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
