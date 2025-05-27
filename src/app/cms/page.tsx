import { Button } from '@/components/ui/button'
import React from 'react'
import Link from 'next/link'

export default function CMSPage() {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6'>
      <h1 className="text-2xl font-bold mb-4">CMS Dashboard</h1>
      <p>Welcome to the CMS dashboard. Here you can manage your content.</p>

      <section className='space-x-4'>
        <Button asChild variant={'outline'}>
          <Link href="posts">Posts</Link>
        </Button>

        <Button asChild variant={'outline'}>
          <Link href="profile">Profile</Link>
        </Button>
      </section>
    </div>
  )
}