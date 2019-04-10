<template>
  <div v-click-outside="close" class="dropdown">
    <button class="dropdown__btn" :class="btnClass" :title="title" @click="opened = !opened">
      <slot name="button" />
    </button>

    <div v-show="opened" class="dropdown__content">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'nuxt-property-decorator'

@Component({})
export default class Dropdown extends Vue {
  /**
   * The dropdown button class
   */
  @Prop({ default: 'btn btn--primary' }) readonly btnClass!: string;
  /**
   * The dropdown title for button
   */
  @Prop({ default: '' }) readonly title!: string;
  /**
   * The dropdown state opened
   */
  private opened: boolean = false;

  /**
   * Watch change of `_opened` data
   */
  @Watch('opened')
  private onToggle (val: string, oldVal: string) {
    this.$emit('toggle', val, oldVal)
  }

  /**
   * Close the dropdown
   */
  close () {
    this.opened = false
  }
}
</script>

<style lang="scss">
.dropdown {
  position: relative;
  overflow: visible !important;
}

.dropdown__btn {
  width: 100%;
  height: 100%;
}

.dropdown__content {
  position: absolute;
  background-color: $dropdown__bgColor;
  z-index: 100;

  @include shadow($dropdown__border);

  & > * {
    display: block;
    padding: 0.5rem;

    &:not(:last-child) {
      border-bottom: 1px solid $dropdown__border;
    }
  }
}

.dropdown[pos="top"] .dropdown__content {
  top: 0;
}

.dropdown[pos="top-top"] .dropdown__content {
  bottom: 100%;
}

.dropdown[pos="bottom"] .dropdown__content {
  top: 100%;
}

.dropdown[pos="bottom-top"] .dropdown__content {
  bottom: 0;
}

.dropdown[dir="left"] .dropdown__content {
  left: 0;
}

.dropdown[dir="right"] .dropdown__content {
  right: 0;
}
</style>
