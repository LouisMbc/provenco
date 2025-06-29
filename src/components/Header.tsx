'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Bars3Icon, XMarkIcon, MagnifyingGlassIcon, UserIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { useAuth } from '@/contexts/AuthContext';

const simpleNavigation = [
  { name: 'Accueil', href: '/' },
  { name: 'Carte', href: '/carte' },
];

const villesDropdown = [
  { name: 'Villes', href: '/villes' },
  { name: 'Monuments', href: '/monuments' },
  { name: 'Légendes', href: '/legendes' },
  { name: 'Histoires', href: '/histoires' },
];

const vinDropdown = [
  { name: 'Appellations', href: '/appellations' },
  { name: 'Domaines', href: '/domaines' },
  { name: 'Vins', href: '/vins' },
  { name: 'Cépages', href: '/cepages' },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [villesDropdownOpen, setVillesDropdownOpen] = useState(false);
  const [vinDropdownOpen, setVinDropdownOpen] = useState(false);
  const { isAdmin, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  const closeDropdowns = () => {
    setVillesDropdownOpen(false);
    setVinDropdownOpen(false);
  };

  // Fermer les dropdowns quand on clique à l'extérieur
  useEffect(() => {
    const handleClickOutside = () => {
      closeDropdowns();
    };

    if (villesDropdownOpen || vinDropdownOpen) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [villesDropdownOpen, vinDropdownOpen]);

  return (
    <header className="bg-gradient-to-r from-amber-50 via-orange-50 to-amber-100 shadow-lg border-b-2 border-amber-200">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5" onClick={closeDropdowns}>
            <span className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
              🌻 Provence Authentique
            </span>
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-amber-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Ouvrir le menu principal</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {/* Navigation simple */}
          {simpleNavigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-semibold leading-6 text-amber-900 hover:text-orange-600 transition-colors duration-200"
              onClick={closeDropdowns}
            >
              {item.name}
            </Link>
          ))}
          
          {/* Dropdown Villes */}
          <div className="relative">
            <button
              type="button"
              className="flex items-center text-sm font-semibold leading-6 text-amber-900 hover:text-orange-600 transition-colors duration-200"
              onClick={() => {
                setVillesDropdownOpen(!villesDropdownOpen);
                setVinDropdownOpen(false);
              }}
            >
              Villes
              <ChevronDownIcon className="h-4 w-4 ml-1" aria-hidden="true" />
            </button>
            {villesDropdownOpen && (
              <div className="absolute left-0 z-10 mt-2 w-48 origin-top-left rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                {villesDropdown.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block px-4 py-2 text-sm text-amber-900 hover:bg-amber-50 transition-colors duration-200"
                    onClick={closeDropdowns}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Dropdown Vin */}
          <div className="relative">
            <button
              type="button"
              className="flex items-center text-sm font-semibold leading-6 text-amber-900 hover:text-orange-600 transition-colors duration-200"
              onClick={() => {
                setVinDropdownOpen(!vinDropdownOpen);
                setVillesDropdownOpen(false);
              }}
            >
              Vin
              <ChevronDownIcon className="h-4 w-4 ml-1" aria-hidden="true" />
            </button>
            {vinDropdownOpen && (
              <div className="absolute left-0 z-10 mt-2 w-48 origin-top-left rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                {vinDropdown.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block px-4 py-2 text-sm text-amber-900 hover:bg-amber-50 transition-colors duration-200"
                    onClick={closeDropdowns}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {isAdmin && (
            <Link
              href="/admin"
              className="text-sm font-semibold leading-6 text-amber-900 hover:text-orange-600 transition-colors duration-200 flex items-center"
              onClick={closeDropdowns}
            >
              <UserIcon className="h-4 w-4 mr-1" />
              Admin
            </Link>
          )}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:items-center lg:gap-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-amber-400" aria-hidden="true" />
            </div>
            <input
              type="text"
              placeholder="Rechercher..."
              className="block w-full pl-10 pr-3 py-2 border border-amber-300 rounded-full leading-5 bg-white placeholder-amber-400 focus:outline-none focus:placeholder-amber-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
            />
          </div>
          {isAdmin && (
            <button
              onClick={handleSignOut}
              className="text-sm font-semibold leading-6 text-amber-900 hover:text-red-600 transition-colors duration-200"
            >
              Déconnexion
            </button>
          )}
        </div>
      </nav>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden">
          <div className="fixed inset-0 z-10" />
          <div className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-amber-900/10">
            <div className="flex items-center justify-between">
              <Link href="/" className="-m-1.5 p-1.5">
                <span className="text-xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                  🌻 Provence
                </span>
              </Link>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-amber-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Fermer le menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-amber-500/10">
                <div className="space-y-2 py-6">
                  {/* Navigation simple */}
                  {simpleNavigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-amber-900 hover:bg-amber-50"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                  
                  {/* Section Villes */}
                  <div className="-mx-3 px-3 py-2">
                    <div className="text-base font-semibold leading-7 text-amber-800 mb-2">Villes</div>
                    {villesDropdown.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="ml-4 block rounded-lg px-3 py-1.5 text-sm leading-6 text-amber-700 hover:bg-amber-50"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>

                  {/* Section Vin */}
                  <div className="-mx-3 px-3 py-2">
                    <div className="text-base font-semibold leading-7 text-amber-800 mb-2">Vin</div>
                    {vinDropdown.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="ml-4 block rounded-lg px-3 py-1.5 text-sm leading-6 text-amber-700 hover:bg-amber-50"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>

                  {isAdmin && (
                    <>
                      <Link
                        href="/admin"
                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-amber-900 hover:bg-amber-50 flex items-center"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <UserIcon className="h-5 w-5 mr-2" />
                        Administration
                      </Link>
                      <button
                        onClick={() => {
                          handleSignOut();
                          setMobileMenuOpen(false);
                        }}
                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-red-600 hover:bg-red-50 w-full text-left"
                      >
                        Déconnexion
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
