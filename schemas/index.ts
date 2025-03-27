import { SchemaTypeDefinition } from 'sanity'

import author from './author'
import post from './post'
import settings from './settings'
import about from './about'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [post, author, settings, about],
}