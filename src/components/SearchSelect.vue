<!-- eslint-disable vue/no-v-html -->
<template>
  <dropdown
    ref="dropdown"
    class="searchSelect"
    pos="top"
    :btn-class="btnClass"
    @toggle="toggled"
  >
    <template #button>
      {{ title }}
    </template>

    <div class="textfield">
      <div class="textfield__content">
        <input
          v-model="search"
          type="text"
          class="textfield__input"
          :placeholder="placeholder"
        />
      </div>
    </div>

    <button
      v-for="(option, index) in options"
      v-show="filtered(option)"
      :key="index"
      class="searchSelect__btn"
      :class="{ 'searchSelect__btn--active': value === index }"
      @click="change(index)"
      v-html="display(option)"
    />
  </dropdown>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import Dropdown from '~/components/Dropdown.vue'

export interface DisplayFunction<T> {
  (value: T): string;
}

@Component({
  components: {
    Dropdown
  }
})
export default class SearchSelect<T> extends Vue {
  /**
   * The search select dropdown button class
   */
  @Prop({ default: 'btn btn--primary' }) readonly btnClass!: string
  /**
   * The text displayed for toggle search Select
   */
  @Prop({ default: '' }) readonly title!: string
  /**
   * The placeholder of search input
   */
  @Prop({ default: '' }) readonly placeholder!: string
  /**
   * The available options
   */
  @Prop({ required: true }) readonly options!: T[]
  /**
   * The criteria for filter search
   */
  @Prop({ default: null }) readonly criteria!: string | null
  /**
   * The method for draw option
   */
  @Prop({ default: (value: T) => value.toString() }) readonly display!: DisplayFunction<T>
  /**
   * The current selected value
   */
  @Prop({ default: 0 }) readonly value!: number
  /**
   * The search value
   */
  private search: string = ''

  /**
   * Clear search value on close dropdown
   */
  private onToggled (val: boolean) {
    if (val === false) {
      this.search = ''
    }
  }

  /**
   * Check if option is filtered with search value
   */
  private filtered (option: T): boolean {
    if (this.criteria === null && this.isObject(option)) {
      throw new Error('The criteria is needed with object option')
    } else if (this.criteria === null) {
      return option.toString().toLowerCase().startsWith(this.search.toLowerCase())
    }

    return option[this.criteria].toLowerCase().startsWith(this.search.toLowerCase())
  }

  /**
   * Apply selected choice
   */
  private change (value: T) {
    (this.$refs.dropdown as Dropdown).close()

    this.$emit('input', value)
    this.$emit('change', value)
  }

  /**
   * Check if an object is an Object
   */
  private isObject (object): boolean {
    return object === Object(object)
  }
}
</script>

<style lang="scss">
.searchSelect .textfield {
  margin-bottom: 0;
}

.searchSelect__btn {
  border: none;
  width: 100%;
  background: none;
  padding: 0.8rem;

  &:focus,
  &:hover,
  &.searchSelect__btn--active {
    background-color: $dropdown__bgColor--active;
  }

  &.searchSelect__btn--active {
    font-weight: bold;
  }
}
</style>
