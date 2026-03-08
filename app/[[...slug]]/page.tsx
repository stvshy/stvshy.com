import ClientPage from "@/components/client-page"
import { Metadata } from "next"
type Props = {
  params: Promise<{ slug?: string[] }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params
  const slug = resolvedParams.slug || []
  const firstSegment = slug[0]
  const secondSegment = slug[1]
  const isLangFirst = firstSegment === "pl" || firstSegment === "en"
  const isPl = firstSegment === "pl" || secondSegment === "pl"
  
  // Obsługa /pl i /en: sam język kieruje na domyślną sekcję "about"
  const sectionRaw = isLangFirst ? secondSegment || "about" : firstSegment || "home"
  
  // Słownik tytułów
  const titles: Record<string, string> = {
    home: 'Stvshy / Mateusz Staszków',
    about: isPl ? 'stvshy | O mnie ' : 'stvshy | About Me',
    dev: isPl ? 'Mateusz Staszków | Dev' : 'Mateusz Staszków | Dev',
    music: isPl ? 'stvshy | Muzyka' : 'stvshy | Music',
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

  // Tworzymy czysty URL bez członu "about", aby zapobiec duplikatom
  const cleanSlug = slug.filter(s => s !== "about")
  const canonicalUrl = `https://stvshy.com${cleanSlug.length > 0 ? '/' + cleanSlug.join('/') : ''}`

  return {
    title: {
      absolute: title,
    },
    description: description,
    alternates: {
      canonical: canonicalUrl, // Informacja dla Google o głównym adresie
    },
    openGraph: {
      title: title,
      description: description,
      locale: isPl ? 'pl_PL' : 'en_US',
      url: canonicalUrl, // Podmienione, aby nie używało "about" w Open Graph
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
export default async function Page({ params }: Props) {  // Odbieramy parametry z adresu URL
  const resolvedParams = await params
  const slug = resolvedParams.slug || []
  const firstSegment = slug[0]
  const secondSegment = slug[1]
  const isLangFirst = firstSegment === "pl" || firstSegment === "en"

  // Dla /pl i /en ustawiamy domyślnie sekcję "about"
  // Dla pustego slug zostawiamy undefined, żeby ClientPage użył swojego domyślnego zachowania
  const section = isLangFirst ? secondSegment || "about" : firstSegment || undefined
  
  // Określamy język na podstawie obecności "pl" w pierwszym lub drugim segmencie
  const lang = firstSegment === "pl" || secondSegment === "pl" ? "pl" : "en"

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
    { slug: ["pl"] },
    { slug: ["en"] },
    { slug: ["dev"] },
    { slug: ["dev", "pl"] },
    { slug: ["dev", "en"] },
    { slug: ["music"] },
    { slug: ["music", "pl"] },
    { slug: ["music", "en"] },
  ]
}