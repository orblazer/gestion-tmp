/* eslint-disable @typescript-eslint/no-explicit-any */
import Vue from 'vue'

export default function (): void {
  Vue.directive('click-outside', {
    bind (el: any, binding, vnode): void {
      el.clickOutsideEvent = function (event: MouseEvent): void {
      // here I check that click was outside the el and his childrens
        if (!(el === event.target || el.contains(event.target)) && vnode.context) {
        // and if it did, call method provided in attribute value
          vnode.context[binding.expression](event)
        }
      }

      document.body.addEventListener('click', el.clickOutsideEvent)
    },
    unbind (el: any): void {
      document.body.removeEventListener('click', el.clickOutsideEvent)
    }
  })
}
