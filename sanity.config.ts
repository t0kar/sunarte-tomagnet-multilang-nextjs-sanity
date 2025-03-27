'use client'

import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import { apiVersion, dataset, projectId } from './lib/sanity.api'
import { schema } from './schemas'
import { settingsPlugin, settingsStructure } from './plugins/settings'

export default defineConfig({
  name: 'TechOn-Magnet-Blog',
  title: 'TechOn Magnet Blog',
  projectId,
  dataset,
  basePath: '/studio',
  schema,
  plugins: [
    deskTool({
      structure: settingsStructure(schema.types.find(x => x.name === 'settings')),
    }),
    settingsPlugin({ type: 'settings' }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
})