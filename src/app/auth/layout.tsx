import React, { Suspense } from 'react'

type Props = {
  children: React.ReactNode;
}

export default async function AuthLayout({ children }: Props) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <Suspense fallback={<div>Loading...</div>}>
          {children}
        </Suspense>
      </div>
    </div>
  )
}