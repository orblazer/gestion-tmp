<template>
  <section class="content--dark" />
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { MetaInfo } from 'vue-meta'
import seo from '~/plugins/seo'

@Component({})
export default class LogoutPage extends Vue {
  /**
   * Define head of page
   */
  private head (): MetaInfo {
    return {
      title: this.$t('pages.logout.title') as string,
      meta: {
        ...seo.title((this.$t('pages.logout.title') as string)),
        ...seo.description((this.$t('pages.logout.description') as string) + ' - ' + process.env.description)
      }
    }
  }

  private mounted () {
    this.submit()
  }

  private async submit () {
    try {
      await this.$store.dispatch('auth/logout')

      this.$toast.success(this.$t('logout.notifications.success') as string)
      // this.$router.push(this.localePath('index'))
    } catch (err) {
      this.$toast.error(this.$t('logout.notifications.error') as string)
      if (process.dev) {
        console.error(err)
      }
    }
  }
}
</script>
