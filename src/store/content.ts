import { VuexModule, Module, MutationAction } from 'vuex-module-decorators'
import { Website } from '@types'
// import { login, logout } from '~/graphql/auth.gql'

@Module({
  name: 'content',
  namespaced: true,
  stateFactory: true
})
export default class Content extends VuexModule {
  public websites: Website.Website[] = []

  @MutationAction({ mutate: ['websites'] })
  public async getWebsites (): Promise<{websites: Website.Website[]}> {
    await Promise.resolve()
    return { websites: [] }
  }
}
