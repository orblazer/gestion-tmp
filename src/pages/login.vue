<template>
  <section class="content content--center content--dark">
    <div class="card card--modal">
      <div class="card__header">
        {{ $t("login.title") }}
      </div>
      <form action="/login" class="card__content form" @submit.prevent="submit">
        {{ username }}
        <div
          class="textfield"
          :class="{ 'textfield--error': errors.has('username') }"
        >
          <div class="textfield__content">
            <label for="username" class="textfield__label">
              {{ $t("fields.username.label") }}
            </label>
            <input
              id="username"
              v-model="username"
              v-validate.immediate="{ required: true, email: true }"
              class="textfield__input"
              type="email"
              name="username"
              :placeholder="$t('fields.username.placeholder')"
            />
          </div>
          <div class="textfield__error">
            {{ errors.first("username") }}
          </div>
        </div>

        <div
          class="textfield"
          :class="{ 'textfield--error': errors.has('password') }"
        >
          <div class="textfield__content">
            <label for="password" class="textfield__label">
              {{ $t("fields.password.label") }}
            </label>
            <input
              id="password"
              v-model="password"
              v-validate.immediate="{ required: true }"
              class="textfield__input"
              type="password"
              name="password"
              :placeholder="$t('fields.password.placeholder')"
            />
          </div>
          <div class="textfield__error">
            {{ errors.first("password") }}
          </div>
        </div>

        <div class="form__submit form__submit--right">
          <button type="submit" class="btn btn--primary" :disabled="submitting">
            {{ $t("login.submit." + (submitting ? "process" : "idle")) }}
          </button>
        </div>
      </form>
    </div>
  </section>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { MetaInfo } from 'vue-meta'
import seo from '~/plugins/seo'

@Component({
  layout: 'login'
})
export default class LoginPage extends Vue {
  auth = false // disable auth middleware

  /**
   * The status of submit form
   */
  private submitting: boolean = false
  /**
   * The username field
   */
  private username: string = ''
  /**
   * The password field
   */
  private password: string = ''

  /**
   * Define head of page
   */
  private head (): MetaInfo {
    console.log(this)
    return {
      title: this.$t('pages.login.title') as string,
      meta: {
        ...seo.title((this.$t('pages.login.title') as string)),
        ...seo.description((this.$t('pages.login.description') as string) + ' - ' + process.env.description)
      }
    }
  }

  /**
   * Submit the form
   */
  private async submit () {
    this.submitting = true

    try {
      await this.$store.dispatch('auth/login', {
        username: this.username,
        password: this.password
      })

      this.$toast.success(this.$t('login.notifications.success') as string)
      // this.$router.push(this.localePath('index'))
    } catch (err) {
      this.$toast.error(this.$t('login.notifications.error') as string)
      if (process.dev) {
        console.error(err)
      }
    }

    this.submitting = false
  }
}
</script>
