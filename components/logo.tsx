import Image from 'next/image'

export function Logo() {
  return (
    <Image
      src="/images/stvshy-przezroczyste1.png"
      alt="stvshy logo"
      width={1138} // Wpisz tu oryginalną szerokość pliku PNG w pikselach
      height={496} // Wpisz tu oryginalną wysokość pliku PNG w pikselach
      className="mx-auto h-9 w-auto -mt-8"
      priority={true} // Ponieważ to logo na górze strony, ładujemy je priorytetowo
    />
  )
}