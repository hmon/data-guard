import { defineStore } from 'pinia'
import axios from 'axios'
import { Data, PluginsClass, Tab } from '~/models/models'

export const usePluginsStore = defineStore('plugins', {
  state: () => {
    const tabs = ref<Data['tabs']>([])
    const tabData = ref<Data['tabdata']>({})
    const plugins = ref<Data['plugins']>({})
    const fullData = ref<PluginsClass>({} as any)
    const disableAll = ref<Boolean>(false)

    return {
      tabs,
      tabData,
      plugins,
      fullData,
      disableAll,
    }
  },

  getters: {
    getDisableAll: state => state.disableAll,
    getTabs: state => state.tabs,
    getTabData: state => state.tabData,
    getPlugins: state => state.plugins,
    getCurrentTab() {
      return (tabIndex: number) => {
        return this.getTabs.length > 0 ? this.getTabData[this.getTabs[tabIndex]] : {} as Tab
      }
    },
    getTabAllPlugins() {
      return (tabIndex: number) => {
        const currentTab = this.getCurrentTab(tabIndex)
        return currentTab.active
          ? currentTab.active.concat(currentTab.disabled, currentTab.inactive).sort()
          : []
      }
    },
    getPlugin() {
      return (pluginName: string) => {
        return this.plugins[pluginName]
      }
    },
  },

  actions: {
    async fetchData() {
      const response = await axios.get<PluginsClass>('http://localhost:3000/plugins')

      const data = response.data.data
      this.plugins = data.plugins
      this.tabData = data.tabdata
      this.tabs = data.tabs
      this.fullData = response.data
    },

    async togglePlugin(tabId: number, pluginName: string) {
      const tab = this.getCurrentTab(tabId)
      const tabSlug = this.getTabs[tabId]
      if (tab.disabled.includes(pluginName)) return

      const isActive = tab.active.includes(pluginName)

      const tabCopy = Object.assign({}, tab)

      if (isActive) {
        tabCopy.active.splice(
          tabCopy.active.indexOf(pluginName),
          1,
        )
        tabCopy.inactive.push(pluginName)
      }
      else {
        tabCopy.inactive.splice(
          tabCopy.inactive.indexOf(pluginName),
          1,
        )
        tabCopy.active.push(pluginName)
      }

      const data = Object.assign({}, this.fullData)

      data.data.tabdata[tabSlug] = tab

      await axios.patch<PluginsClass>('http://localhost:3000/plugins', data)
    },

    disableAllPlugins(disable: Boolean) {
      this.disableAll = disable
    },
  },
})
