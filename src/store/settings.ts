import { VuexModule, Module, Mutation } from 'vuex-module-decorators'
import { Website, Sidebar } from '@types'

@Module({
  name: 'content',
  namespaced: true,
  stateFactory: true
})
export default class Content extends VuexModule {
  public sidebar: Sidebar = 'website'
  public currentWebsite: Website.WebsiteType = null

  @Mutation
  public setSidebar (sidebar: Sidebar): void {
    this.sidebar = sidebar
  }

  @Mutation
  public setCurrentWebsite (currentWebsite: Website.WebsiteType): void {
    this.currentWebsite = currentWebsite
  }
}
