import { SignUp } from '@clerk/nextjs'
import React from 'react'

export default function page() {
  return (
    <section className='py-24'>
    <div className='container flex items-center justify-center'>
      <SignUp />
    </div>
  </section>
  )
}
