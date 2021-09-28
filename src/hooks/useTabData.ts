import { computed } from 'vue'
import { usePluginsStore } from '~/stores/plugins'

export function useTabData(tabId: number) {
  const store = usePluginsStore()

  const plugins = computed(() => {
    return store.getTabAllPlugins(tabId)
  })

  const currentTab = computed(() => {
    return store.getCurrentTab(tabId)
  })

  const models = ref({})

  watchEffect(() => {
    models.value = plugins.value.reduce((acc, pluginName) => {
      return {
        ...acc,
        [pluginName]: {
          active: currentTab.value.active.includes(pluginName),
          disabled: currentTab.value.disabled.includes(pluginName),
        },
      }
    }, {})
  })

  const togglePlugin = (pluginName: string) => {
    store.togglePlugin(tabId, pluginName)
  }

  return {
    plugins,
    currentTab,
    models,
    togglePlugin,
  }
}
