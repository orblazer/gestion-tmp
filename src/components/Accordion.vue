<template>
  <div class="accordion">
    <button
      class="accordion__btn"
      :class="btnClass"
      @click="_opened = !_opened"
    >
      <i class="material-icons">
        {{ _opened ? "expand_less" : "expand_more" }}
      </i>

      <slot name="button" />
    </button>

    <div v-show="_opened" class="accordion__content">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'nuxt-property-decorator'

@Component({})
export default class Accordion extends Vue {
  /**
   * The accordion button class
   */
  @Prop({ default: 'btn btn--primary' }) readonly btnClass!: string
  /**
   * The accordion is default opened
   */
  @Prop({ default: false }) readonly opened!: boolean
  /**
   * The accordion state opened
   */
  private _opened: boolean = this.opened

  /**
   * Watch change of `_opened` data
   */
  @Watch('_opened')
  private onToggle (val: string, oldVal: string) {
    this.$emit('toggle', val, oldVal)
  }

  /**
   * Close the accordion
   */
  close () {
    this._opened = false
  }
}
</script>

<style lang="scss">
.accordion__btn {
  display: flex;
  align-items: center;
  padding: 0.8rem;
  width: 100%;
}
</style>
