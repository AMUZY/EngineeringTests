import React from 'react'
import Image from 'next/image'

const Card = ({addclass,src,sub,para}) => {
  return (
    <div className={'rounded-3xl py-6 px-10 bluegradient flex flex-col items-start '+ addclass}>
      <Image className='self-center' src={src} width={80} height={80} alt='chart emoji' />
      <div className='my-4'>
        <h2 className='tsubtitle white my-2'>{sub}</h2>
        <p className='tbase white'>{para}</p>
      </div>
    </div>
  )
}

export default Card