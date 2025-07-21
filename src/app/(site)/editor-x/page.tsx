import { Editor } from '@/components/editor/blocks/editor-x/editor'
import React from 'react'

type Props = {}

export default function EditorPage({}: Props) {
  return (
    <div className='mt-10 container mx-auto'>
        <Editor />
    </div>
  )
}