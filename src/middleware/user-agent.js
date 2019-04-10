export default function UserAgentMiddleware (context) {
  if ((process.server && typeof context.req !== 'undefined') || typeof navigator !== 'undefined') {
    context.userAgent = process.server ? context.req.headers['user-agent'] : navigator.userAgent
  }
}
