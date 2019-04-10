import createPersistedState from 'vuex-persistedstate'
import { Context } from '@nuxt/vue-app'

export default function ({ store }: Context): void {
  window.onNuxtReady((): void => {
    createPersistedState({
      key: 'gestion',
      paths: ['auth.user', 'settings.sidebar', 'settings.currentWebsite'],
      storage: {
        getItem (key: string): string | null {
          const item = localStorage.getItem(key)

          if (item !== null) {
            return atob(item)
          }
          return null
        },
        setItem (key: string, value: string): void {
          return localStorage.setItem(key, btoa(value))
        },
        removeItem (key): void {
          return localStorage.removeItem(key)
        }
      }
    })(store)
  })
}
