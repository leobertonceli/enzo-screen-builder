#!/usr/bin/env node
import { Server } from '@modelcontextprotocol/sdk/server/index.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import { CallToolRequestSchema, ListToolsRequestSchema } from '@modelcontextprotocol/sdk/types.js'
import { readFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const manifest = JSON.parse(readFileSync(join(__dirname, 'ds-manifest.json'), 'utf8'))

const server = new Server(
  { name: 'wonderland-ds', version: '1.0.0' },
  { capabilities: { tools: {} } }
)

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: 'list_components',
      description: 'List all available Wonderland Design System components with a brief description of each. Call this first to know what components exist before building a screen.',
      inputSchema: { type: 'object', properties: {}, required: [] },
    },
    {
      name: 'get_component',
      description: 'Get the full API spec for a specific Wonderland DS component: import path, all props with types and defaults, and a usage example. Call this before using a component in code.',
      inputSchema: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            description: 'Component name exactly as listed by list_components, e.g. "Button", "ListItem", "Chip"',
          },
        },
        required: ['name'],
      },
    },
    {
      name: 'get_tokens',
      description: 'Get all design tokens (colors, spacing, font sizes, radii, font families) and global rules for the Wonderland DS. Call this to ensure correct token usage.',
      inputSchema: { type: 'object', properties: {}, required: [] },
    },
  ],
}))

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params

  if (name === 'list_components') {
    const lines = manifest.components.map(c => `- **${c.name}**: ${c.description}`)
    const text = [
      `# ${manifest.ds}`,
      '',
      '## Available components',
      ...lines,
      '',
      '> Call `get_component` with the component name to get full props and usage.',
      '> Call `get_tokens` to get all design tokens and rules.',
    ].join('\n')
    return { content: [{ type: 'text', text }] }
  }

  if (name === 'get_component') {
    const compName = args?.name
    const comp = manifest.components.find(
      c => c.name.toLowerCase() === compName?.toLowerCase()
    )
    if (!comp) {
      const names = manifest.components.map(c => c.name).join(', ')
      return {
        content: [{
          type: 'text',
          text: `Component "${compName}" not found.\n\nAvailable: ${names}`,
        }],
      }
    }

    const propsLines = comp.props.map(p => {
      const parts = [`  ${p.name}: ${p.type}`]
      if (p.required) parts.push('// required')
      else if (p.default) parts.push(`// default: ${p.default}`)
      if (p.description) parts.push(`— ${p.description}`)
      return parts.join(' ')
    })

    const text = [
      `# ${comp.name}`,
      '',
      comp.description,
      '',
      '## Import',
      '```tsx',
      comp.import,
      '```',
      '',
      '## Props',
      '```',
      ...propsLines,
      '```',
      '',
      '## Usage example',
      '```tsx',
      comp.usage,
      '```',
    ].join('\n')

    return { content: [{ type: 'text', text }] }
  }

  if (name === 'get_tokens') {
    const { colors, spacing, fontSize, fontWeight, fontFamily, radius } = manifest.tokens

    const fmt = (obj) => Object.entries(obj).map(([k, v]) => `  ${k}: ${v}`).join('\n')

    const text = [
      '# Wonderland DS — Design Tokens',
      '',
      '## Rules',
      manifest.rules.map((r, i) => `${i + 1}. ${r}`).join('\n'),
      '',
      '## Colors',
      '```',
      fmt(colors),
      '```',
      '',
      '## Spacing',
      '```',
      fmt(spacing),
      '```',
      '',
      '## Font sizes',
      '```',
      fmt(fontSize),
      '```',
      '',
      '## Font weights',
      '```',
      fmt(fontWeight),
      '```',
      '',
      '## Font families',
      '```',
      fmt(fontFamily),
      '```',
      '',
      '## Border radius',
      '```',
      fmt(radius),
      '```',
      '',
      '## Screen template',
      '```tsx',
      manifest.screenTemplate,
      '```',
    ].join('\n')

    return { content: [{ type: 'text', text }] }
  }

  throw new Error(`Unknown tool: ${name}`)
})

const transport = new StdioServerTransport()
await server.connect(transport)
