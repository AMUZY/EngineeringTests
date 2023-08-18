import React from 'react'
import RightPane from '@components/RightPane'

const page = ({params}) => {
  console.log({params})
  return (
    <>
      <RightPane pagename="My Projects" resultid={'something'} />
      <div>{params.resultid}</div>
  </>
  )
}

export default page