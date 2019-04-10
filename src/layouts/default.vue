<template>
  <div>
    <Header />
    <div class="container-sided">
      <sidebar />

      <main>
        <nuxt />
      </main>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import Header from '~/components/layout/Header.vue'
import Sidebar from '~/components/layout/Sidebar.vue'

@Component({
  components: {
    Header,
    Sidebar
  }
})
export default class DefaultLayout extends Vue {
}
</script>

<style lang="scss">
.container-sided {
  display: flex;
  background-color: $container__bgColor;

  & > .sidebar {
    flex: 1;
  }

  & > main {
    flex: 2;
    height: calc(100vh - 55px);
    overflow: auto;
  }
}
</style>
