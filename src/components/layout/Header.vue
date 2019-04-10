<template>
  <header class="header">
    <div class="header__content" />
    <div class="header__content">
      <dropdown
        class="header__link"
        btn-class="btn user-menu__btn"
        @toggle="userMenuToggle"
      >
        <template #button>
          {{ user.displayName }}

          <i class="material-icons">
            {{ userMenuVisible ? "expand_less" : "expand_more" }}
          </i>
        </template>

        <nuxt-link :to="localePath('account')" class="link">
          {{ $t("header.user.account") }}
        </nuxt-link>
        <nuxt-link :to="localePath('logout')" class="link">
          {{ $t("header.user.logout") }}
        </nuxt-link>
      </dropdown>
    </div>
  </header>
</template>

<script lang="ts">
import { Vue, Component, namespace } from 'nuxt-property-decorator'
import Dropdown from '~/components/Dropdown.vue'

const authModule = namespace('auth')

@Component({
  components: {
    Dropdown
  }
})
export default class Header extends Vue {
  private userMenuVisible: boolean = false

  /**
   * The logged user data
   */
  @authModule.State user

  /**
   * Update the `userMenuVisible` variable on toggle dropdown
   */
  private userMenuToggle (value: boolean) {
    this.userMenuVisible = value
  }
}
</script>

<style lang="scss">
.header {
  display: flex;
  justify-content: space-between;
  height: 55px;
  background-color: $header__bgColor;
}

.header__content {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.header__link {
  height: 100%;
  padding: 0 0.5rem;

  &:focus,
  &:hover {
    background-color: $header__link__bgColor-hover;
    color: $header__link__color-hover;
  }
}

.user-menu__btn {
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 0.5rem;
}
</style>
