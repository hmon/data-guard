<script setup lang="ts">
import Card from '~/components/PluginCard.vue'
import { useTabData } from '~/hooks/useTabData'

const { plugins, currentTab, models, togglePlugin } = useTabData(0)
</script>

<template>
  <div class="font-averta text-lg text-primary">
    {{ currentTab.title }} Plugins
  </div>

  <div class="py-10 grid grid-cols-3 gap-10">
    <card
      v-for="plugin in plugins"
      :id="plugin"
      :key="plugin"
      v-model="models[plugin].active"
      :disabled="models[plugin].disabled"
      @update:model-value="togglePlugin(plugin)"
    />
  </div>
</template>
