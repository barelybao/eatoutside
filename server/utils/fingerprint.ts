import { createHash } from 'node:crypto'
import type { H3Event } from 'h3'

export function generateFingerprint(event: H3Event): string {
  const headers = event.node.req.headers
  const ip = headers['x-forwarded-for'] || headers['x-real-ip'] || event.node.req.socket.remoteAddress || 'unknown'
  const userAgent = headers['user-agent'] || 'unknown'

  // Create hash from IP + User-Agent for basic duplicate prevention
  const hash = createHash('sha256')
    .update(`${ip}-${userAgent}`)
    .digest('hex')

  return hash
}
