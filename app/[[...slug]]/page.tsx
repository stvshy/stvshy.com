import ClientPage from "@/components/client-page" // ⚠️ Upewnij się, że nazwa pliku to client-page.tsx

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