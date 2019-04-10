<template>
  <div />
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { Context } from '@nuxt/vue-app'

@Component({})
export default class AUsersPage extends Vue {
  private users: object[] = []

  private asyncData ({ app, error }: Context) {
    // const client = app.apolloProvider.defaultClient
  }
}
</script>
