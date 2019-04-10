import Vue from 'vue'
import { Context } from '@nuxt/vue-app'
import VeeValidate from 'vee-validate'
import fr from 'vee-validate/dist/locale/fr'
import en from 'vee-validate/dist/locale/en'

// ip_or_fqdn
// min_dimensions
// max_dimensions
export default function ({ app }: Context): void {
  Vue.use(VeeValidate, {
    i18nRootKey: 'validations',
    i18n: app.$i18n,
    dictionary: {
      fr,
      en
    }
  })
}
