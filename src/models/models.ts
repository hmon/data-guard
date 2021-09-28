export interface Plugins {
  plugins: PluginsClass
}

export interface PluginsClass {
  data: Data
  errors: null
}

export interface Data {
  tabs: string[]
  tabdata: Tabdata
  plugins: { [key: string]: Plugin }
}

export interface Plugin {
  title: string
  description: string
}

export interface Tabdata {
  [key: string]: Tab
}

export interface Tab {
  title: string
  icon: string
  active: string[]
  disabled: string[]
  inactive: string[]
}
