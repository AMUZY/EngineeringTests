import React from 'react'
import RightPane from '@components/RightPane'

const page = ({params}) => {
  return (
    <>
      <RightPane pagename="My Projects" projectid={'something'} />
      <div>{params.projectid}</div>
    </>
  )
}

export default page