import ClientPage from "@/components/client-page"
import { Metadata } from "next"
type Props = {
  params: Promise<{ slug?: string[] }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params
  const slug = resolvedParams.slug || []
  
  // Logika: Pierwszy element to sekcja (np. music), drugi to język (np. pl)
  // Jeśli brak slug, to 'home'
  const sectionRaw = slug[0] || 'home'
  const isPl = slug[1] === 'pl' || slug.includes('pl') // proste wykrywanie języka
  
  // Słownik tytułów
  const titles: Record<string, string> = {
    home: 'Mateusz Staszków (stvshy) - Developer & Producer',
    about: isPl ? 'O mnie | Mateusz Staszków' : 'About Me | Mateusz Staszków',
    dev: isPl ? 'Dev | Mateusz Staszków' : 'Dev | Mateusz Staszków',
    music: isPl ? 'Muzyka | stvshy' : 'Music | stvshy',
  }

  // Słownik opisów
  const descriptions: Record<string, string> = {
    default: isPl 
      ? 'Programista Full-stack i Producent Muzyczny z Wrocławia. Sprawdź moje projekty i muzykę.'
      : 'Full-stack developer and music producer based in Wrocław. Check out my coding projects and music releases.',
    music: isPl
      ? 'Posłuchaj najnowszych utworów stvshy. Dostępne na Spotify, Apple Music i wielu innych platformach.'
      : 'Listen to the latest tracks by stvshy. Available on Spotify, Apple Music, and more.',
    dev: isPl
      ? 'Projekty programistyczne. Zobacz moje portfolio developera.'
      : 'Coding projects. Check out my developer portfolio.',
  }

  // Wybór odpowiedniego tytułu i opisu
  const title = titles[sectionRaw] || titles.home
  const description = descriptions[sectionRaw] || descriptions.default

  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      locale: isPl ? 'pl_PL' : 'en_US',
      url: `https://stvshy.com/${slug.join('/')}`,
      images: [
        {
          url: '/images/stvshy-open.png',
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
  }
}

export default async function Page({ params }: { params: Promise<{ slug?: string[] }> }) {
  // Odbieramy parametry z adresu URL
  const resolvedParams = await params
  const slug = resolvedParams.slug || []

  // Pierwszy człon to sekcja (np. 'dev' lub 'music'), domyślnie 'about'
  // Jeśli slug jest pusty (strona główna), ustawiamy undefined, żeby ClientPage wybrał domyślne "about"
  const section = slug[0] || undefined
  
  // Drugi człon to język, jeśli występuje (np. 'pl')
  const lang = slug[1] === "pl" ? "pl" : "en"

  return (
    <ClientPage 
      initialSection={section} 
      initialLang={lang} 
    />
  )
}

// Generowanie statycznych ścieżek dla szybszego działania strony
export function generateStaticParams() {
  return [
    { slug: [] },
    { slug: ["dev"] },
    { slug: ["dev", "pl"] },
    { slug: ["dev", "en"] },
    { slug: ["music"] },
    { slug: ["music", "pl"] },
    { slug: ["music", "en"] },
    { slug: ["about"] }, // Opcjonalnie, dla pewności
    { slug: ["about", "pl"] },
  ]
}