'use client'

import { PortableText } from '@portabletext/react'
import { height, width } from 'components/OpenGraphImage'

export default function OpenGraphPreview(props: any) {
  const { title } = props

  return (
    <div className="w-full p-4 border border-gray-200 rounded-lg">
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <div className="aspect-ratio" style={{ aspectRatio: `${width} / ${height}` }}>
        <div className="w-full h-full bg-gray-100 rounded flex items-center justify-center">
          <span className="text-gray-400">Preview not available in Studio</span>
        </div>
      </div>
    </div>
  )
}