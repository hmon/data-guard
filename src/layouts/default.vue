<script setup lang="ts">
import { usePluginsStore } from '~/stores/plugins'

const store = usePluginsStore()

onMounted(() => {
  store.fetchData()
})
</script>

<template>
  <div class="bg-bodybg w-full h-full grid grid-cols-12">
    <aside class="flex flex-col col-span-2">
      <div class="logo">
        <img src="../assets/images/logo.png" alt="logo" width="150">
      </div>
      <side-navbar />
    </aside>

    <main class="col-span-10 bg-white py-8 px-12">
      <router-view />
    </main>
  </div>
</template>

<style lang="scss">
.logo {
  @apply flex w-full justify-center justify-items-center my-8
}
</style>
