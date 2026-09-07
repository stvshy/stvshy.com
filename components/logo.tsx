import Image from 'next/image'
import logoImage from '@/public/images/stvshy-przezroczyste1.png'

export function Logo() {
  return (
    <Image
      src={logoImage}
      alt="stvshy logo"
      width={1138} 
      height={496} 
      className="mx-auto h-9 w-auto -mt-8"
      sizes="(min-width: 1024px) 91px, 83px"
      loading="eager"
    />
  )
}