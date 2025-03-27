'use client'

import { Skeleton, Stack } from '@sanity/ui'
import { height, width } from 'components/OpenGraphImage'
import React, { lazy, Suspense, useDeferredValue } from 'react'
import { type ObjectInputProps } from 'sanity'
import styled from 'styled-components'

const OpenGraphPreview = lazy(() => import('components/OpenGraphPreview'))

const RatioSkeleton = styled(Skeleton)`
  aspect-ratio: ${width} / ${height};
  height: 100%;
  width: 100%;
`

const fallback = <RatioSkeleton animated radius={2} />

export default function OpenGraphInput(props: ObjectInputProps) {
  const value = useDeferredValue(props.value)
  return (
    <Stack space={2}>
      <Suspense fallback={fallback}>
        <OpenGraphPreview {...(value || {})} />
      </Suspense>
    </Stack>
  )
}