import { VuexModule, Module, MutationAction } from 'vuex-module-decorators'
import { UserRole } from '@/lib/enum'
import { User } from '@types'
// import { login, logout } from '~/graphql/auth.gql'

@Module({
  name: 'auth',
  namespaced: true,
  stateFactory: true
})
export default class Auth extends VuexModule {
  public user: User.UserType = false

  public get isLogged (): boolean {
    return this.user !== false
  }

  @MutationAction({ mutate: ['user'] })
  public async login (payload: User.UserInput): Promise<{user: User.UserType}> {
    console.log(this.context, payload)

    /* const client = this.context.app.apolloProvider.defaultClient

    const res = await client
      .mutate({
        // mutation: login,
        variables: payload
      })
      .then(({ data }) => data && data.login)
    await this.$apolloHelpers.onLogin(res.token)

    const user = {
      id: res.user._id,
      username: res.user.username,
      displayName: res.user.displayName,
      role: res.user.role
    }

    return user */

    await Promise.resolve()
    return { user: {
      id: 'null',
      username: 'null',
      displayName: 'null',
      role: UserRole.CLIENT
    } }
  }

  @MutationAction({ mutate: ['user'] })
  public async logout (): Promise<{user: User.UserType}> {
    /* const client = this.app.apolloProvider.defaultClient

    await client.mutate({
      // mutation: logout
    })
    await this.$apolloHelpers.onLogout() */

    await Promise.resolve()
    return { user: false }
  }
}
