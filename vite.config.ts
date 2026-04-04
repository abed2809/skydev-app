import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

const DATA_FILE = path.resolve(__dirname, 'phones-data.json')

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'phones-api',
      configureServer(server) {
        server.middlewares.use('/api/phones', (req, res) => {
          res.setHeader('Access-Control-Allow-Origin', '*')
          res.setHeader('Content-Type', 'application/json')

          if (req.method === 'GET') {
            const data = fs.existsSync(DATA_FILE)
              ? fs.readFileSync(DATA_FILE, 'utf-8')
              : '[]'
            res.end(data)
          } else if (req.method === 'POST') {
            let body = ''
            req.on('data', (chunk: Buffer) => { body += chunk.toString() })
            req.on('end', () => {
              fs.writeFileSync(DATA_FILE, body)
              res.end('{"ok":true}')
            })
          } else {
            res.end('{}')
          }
        })
      },
    },
  ],
  server: {
    host: true,
  },
})
