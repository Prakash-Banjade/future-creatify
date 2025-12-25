import { LoaderCircle } from 'lucide-react';
import React, { Suspense } from 'react'

type Props = {
  children: React.ReactNode;
}

export default async function AuthLayout({ children }: Props) {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center h-screen gap-2 text-base">
        <LoaderCircle className="size-5 animate-spin" />
        Please wait...
      </div>
    }>
      {children}
    </Suspense>
  )
}