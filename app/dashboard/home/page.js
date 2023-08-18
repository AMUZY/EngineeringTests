'use client'
import React from 'react'
import RightPane from '@components/RightPane'

const Dashboard = () => {
  const details = ['1','2','3']
  return (
      <RightPane pagename = "All Results" results={details} />
  )
}

export default Dashboard