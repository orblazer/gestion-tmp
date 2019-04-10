import Vue from 'vue'

// Extends Vue instance
declare module 'vue/types/vue' {
  interface Vue {
    $apiURL(url: string): string;
  }
}

// Extends "context"
declare module '@nuxt/vue-app' {
  interface Context {
    userAgent: string;
  }
}
