import { Context } from '@nuxt/vue-app'

export default function (ctx: Context, inject): void {
  inject('apiURL', function apiURL (url: string): string {
    if (!(process.env.apiURL as string).endsWith('/') && !url.startsWith('/')) {
      url = '/' + url
    }

    return process.env.apiURL + url
  })
}
