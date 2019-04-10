<template>
  <section class="sidebar">
    <div class="sidebar__tabs">
      <button
        class="sidebar__tab material-icons"
        :class="{ 'sidebar__tab--active': sidebar === 'website' }"
        :title="$t('sidebar.tabs.website')"
        @click="setSidebar($event, 'website')"
      >
        web
      </button>
      <button
        v-if="isAdmin"
        class="sidebar__tab material-icons"
        :class="{ 'sidebar__tab--active': sidebar === 'admin' }"
        :title="$t('sidebar.tabs.admin')"
        @click="setSidebar($event, 'admin')"
      >
        apps
      </button>
    </div>

    <div v-show="sidebar === 'website'" class="sidebar__content">
      <search-select
        v-if="websites.length > 0"
        class="sidebar__select-website"
        dir="left"
        :title="
          $t('sidebar.website.selectWebsite', {
            current: websites[currentWebsiteId].name
          })
        "
        :placeholder="$t('sidebar.website.searchWebsite')"
        :options="websites"
        criteria="name"
        @change="switchWebsite"
      />

      <nuxt-link
        :to="localePath('index')"
        :title="$t('sidebar.dashboard.long')"
        class="sidebar__link"
        active-class="sidebar__link--active"
        exact
      >
        <i class="material-icons">dashboard</i>
        {{ $t("sidebar.dashboard.short") }}
      </nuxt-link>

      <accordion
        v-if="
          hasModules(
            WTModules.BLOG_POSTS,
            WTModules.BLOG_CATEGORIES,
            WTModules.BLOG_POSTS
          )
        "
        :opened="subActive('blog')"
      >
        <template #button>
          {{ $t("sidebar.website.blog.title") }}
        </template>

        <nuxt-link
          v-if="WTModules.BLOG_POSTS"
          :to="localePath('blog-posts')"
          :title="$t('sidebar.website.blog.posts.long')"
          class="sidebar__link"
          active-class="sidebar__link--active"
        >
          <i class="material-icons">description</i>
          {{ $t("sidebar.website.blog.posts.short") }}
        </nuxt-link>
        <nuxt-link
          v-if="WTModules.BLOG_CATEGORIES"
          :to="localePath('blog-categories')"
          :title="$t('sidebar.website.blog.categories.long')"
          class="sidebar__link"
          active-class="sidebar__link--active"
        >
          <i class="material-icons">label</i>
          {{ $t("sidebar.website.blog.categories.short") }}
        </nuxt-link>
        <nuxt-link
          v-if="WTModules.BLOG_POSTS"
          :to="localePath('blog-comments')"
          :title="$t('sidebar.website.blog.comments.long')"
          class="sidebar__link"
          active-class="sidebar__link--active"
        >
          <i class="material-icons">comment</i>
          {{ $t("sidebar.website.blog.comments.short") }}
        </nuxt-link>
      </accordion>

      <nuxt-link
        v-if="hasModules(WTModules.SERVICES)"
        :to="localePath('services')"
        :title="$t('sidebar.website.services.long')"
        class="sidebar__link"
        active-class="sidebar__link--active"
      >
        <i class="material-icons">room_service</i>
        {{ $t("sidebar.website.services.short") }}
      </nuxt-link>

      <nuxt-link
        v-if="hasModules(WTModules.VTC_VEHICLES)"
        :to="localePath('vehicles')"
        :title="$t('sidebar.website.vehicles.long')"
        class="sidebar__link"
        active-class="sidebar__link--active"
      >
        <i class="material-icons">directions_car</i>
        {{ $t("sidebar.website.vehicles.short") }}
      </nuxt-link>
    </div>
    <div v-if="isAdmin" v-show="sidebar === 'admin'" class="sidebar__content">
      <nuxt-link
        :to="localePath('admin')"
        :title="$t('sidebar.dashboard.long')"
        class="sidebar__link"
        active-class="sidebar__link--active"
        exact
      >
        <i class="material-icons">dashboard</i>
        {{ $t("sidebar.dashboard.short") }}
      </nuxt-link>

      <nuxt-link
        :to="localePath('admin-users')"
        :title="$t('sidebar.admin.users.long')"
        class="sidebar__link"
        active-class="sidebar__link--active"
      >
        <i class="material-icons">people</i>
        {{ $t("sidebar.admin.users.short") }}
      </nuxt-link>

      <accordion :opened="subActive('admin-websites')">
        <template #button>
          {{ $t("sidebar.admin.websites.title") }}
        </template>

        <nuxt-link
          :to="localePath('admin-websites-web')"
          :title="$t('sidebar.admin.websites.websites.long')"
          class="sidebar__link"
          active-class="sidebar__link--active"
        >
          <i class="material-icons">storage</i>
          {{ $t("sidebar.admin.websites.websites.short") }}
        </nuxt-link>

        <nuxt-link
          :to="localePath('admin-websites-templates')"
          :title="$t('sidebar.admin.websites.templates.long')"
          class="sidebar__link"
          active-class="sidebar__link--active"
        >
          <i class="material-icons">web</i>
          {{ $t("sidebar.admin.websites.templates.short") }}
        </nuxt-link>
      </accordion>
    </div>

    <div class="sidebar__bottom">
      <dropdown
        ref="switchLocale"
        pos="bottom-top"
        btn-class="sidebar__bottom__btn material-icons"
        :title="$t('sidebar.bottom.locales')"
      >
        <template #button>
          language
        </template>

        <nuxt-link
          v-for="locale in availableLocales"
          :key="locale.code"
          :to="switchLocalePath(locale.code)"
          class="link"
          :class="{ 'link--active': locale.code === $i18n.locale }"
          @click.native="closeSwitchLocale"
        >
          {{ locale.name }}
        </nuxt-link>
      </dropdown>
    </div>
  </section>
</template>

<script lang="ts">
import { Vue, Component, namespace } from 'nuxt-property-decorator'
import SearchSelect from '~/components/SearchSelect.vue'
import Accordion from '~/components/Accordion.vue'
import Dropdown from '~/components/Dropdown.vue'
import { UserRole, WebsiteTemplateModule } from '~/lib/enum'

const settingsModule = namespace('settings')
const contentModule = namespace('content')

@Component({
  components: {
    SearchSelect,
    Accordion,
    Dropdown
  }
})
export default class Sidebar extends Vue {
  /**
   * Enum of websites modules
   */
  private WTModules: typeof WebsiteTemplateModule = WebsiteTemplateModule

  /**
   * Get current sidebar is enabled
   */
  @settingsModule.State sidebar
  /**
   * Get all websites of user
   */
  @contentModule.State websites
  /**
   * Get current selected website id
   */
  @settingsModule.State currentWebsiteId

  /**
   * Get current selected website
   */
  private get currentWebsite () {
    return this.websites.find(website => website._id === this.currentWebsiteId)
  }
  /**
   * Check if user is admin
   */
  private get isAdmin (): boolean {
    return this.$store.state.auth.user.role === UserRole.ADMIN
  }
  /**
   * Get the available locales
   */
  private get availableLocales () {
    return (this.$i18n as any).locales
  }

  /**
   * Check if route have parent route name
   */
  private subActive (parent: string): boolean {
    return (this.$route.name as string).startsWith(parent)
  }
  /**
   * Switch the activated sidebar
   */
  private setSidebar (event, name: string) {
    event.target.blur()
    this.$store.commit('settings/SET_SIDEBAR', name)
  }
  /**
   * Select the current website
   */
  private selectWebsite (index: number) {
    const websiteId = this.websites.map(website => website._id)[index]
    this.$store.commit('settings/SET_CURRENT_WEBSITE', websiteId)
  }
  /**
   * Check if module is enabled on the website
   */
  private hasModules (...modules: WebsiteTemplateModule[]): boolean {
    if (!this.currentWebsite) {
      return false
    }

    for (const module of modules) {
      if (this.currentWebsite.enabledModules.indexOf(module)) {
        return true
      }
    }

    return false
  }
  /**
   * Close the dropdown switch locale
   */
  private closeSwitchLocale () {
    (this.$refs.switchLocale as Dropdown).close()
  }
}
</script>

<style lang="scss">
.sidebar {
  display: flex;
  flex-direction: column;
  max-width: 12vw;
  background-color: $sidebar__bgColor;
}

.sidebar__tabs {
  display: flex;
}

.sidebar__tab {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  border: none;
  padding: 0;
  height: 64px;
  background: $sidebar__tab__bgColor;
  color: $sidebar__tab__color;
  font-size: 2rem;

  &:not(:last-child) {
    border-right: 1px solid $sidebar__tab__border;
  }

  &:hover,
  &:focus {
    background-color: $sidebar__tab-hover__bgColor;
    color: $sidebar__tab-hover__color;
  }
}

.sidebar__tab--active {
  background-color: $sidebar__tab-active__bgColor;
  color: $sidebar__tab-active__color;
}

.sidebar__content {
  margin-top: 1rem;
  flex: 1;
}

.sidebar__select-website {
  padding-bottom: 1rem;

  & > .dropdown__content {
    max-width: 12vw;
  }
}

.sidebar__accordion__btn {
  width: 100%;
}

.sidebar__link {
  display: flex;
  align-items: center;
  padding: 0.8rem 0.5rem;
  text-decoration: none;
  color: $sidebar__link__color;

  &:focus,
  &:hover,
  &.sidebar__link--active {
    background-color: $sidebar__link-active__bgColor;
    color: $sidebar__link-active__color;
  }

  & > .material-icons {
    margin-right: 0.5rem;
  }
}

.accordion + .accordion {
  margin-bottom: 0.2rem;
}

.accordion__content > .sidebar__link {
  background-color: $sidebar__link-accordion__bgColor;
  padding-left: 1rem;

  &:focus,
  &:hover,
  &.sidebar__link--active {
    background-color: $sidebar__link-active__bgColor;
    color: $sidebar__link-active__color;
  }
}

.sidebar__bottom {
  display: flex;
  justify-content: space-around;
}

.sidebar__bottom__btn {
  background: none;
  border: none;
  padding: 0.5rem;
  color: $sidebar__link__color;

  &:focus,
  &:hover {
    background-color: $sidebar__link-active__bgColor;
    color: $sidebar__link-active__color;
  }
}
</style>
