import React from 'react'
import RightPane from '@components/RightPane'

const myprofile = () => {
  const details = ['1','2','3']
  return (
        <RightPane pagename="My Projects" projects={details}/>
  )
}

export default myprofile