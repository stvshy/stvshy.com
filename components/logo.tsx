import Image from 'next/image'

export function Logo() {
  return (
    <Image
      src="/images/stvshy-przezroczyste1.png"
      alt="stvshy logo"
      width={1138} 
      height={496} 
      className="mx-auto h-9 w-auto -mt-8"
      quality={95}
      sizes="(max-width: 768px) 250px, 300px"
      priority={true} 
    />
  )
}