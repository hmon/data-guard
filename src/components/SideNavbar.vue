<script setup>
import { usePluginsStore } from '../stores/plugins'
import Toggle from '~/components/kit/Toggle.vue'
import SubwayMenu from '~icons/subway/menu'
import SubwayCoin from '~icons/subway/coin'
import ClipboardCheck from '~icons/teenyicons/clipboard-tick-outline'
import MdiPower from '~icons/mdi/power'

const store = usePluginsStore()

const model = ref(false)

watchEffect(() => {
  model.value = !store.disableAll
})

const disableAllPlugins = () => {
  store.disableAllPlugins(!model.value)
}

const iconClass = computed(() => model.value ? 'text-green-500' : 'text-red-800')

const buttomNavClass = computed(() => model.value ? 'buttom-nav--enabled' : 'buttom-nav--disabled')

const buttomNavText = computed(() => model.value ? 'enabled' : 'disabled')

const menuItems = reactive([
  {
    title: 'Marketing',
    url: '/',
    icon: markRaw(SubwayMenu),
  },
  {
    title: 'Finance',
    url: '/finance',
    icon: markRaw(SubwayCoin),
  },
  {
    title: 'Personnel',
    url: '/personnel',
    icon: markRaw(ClipboardCheck),
  },
])

const icon = markRaw(MdiPower)
</script>

<template>
  <div class="flex-grow flex flex-col">
    <nav class="sidenav flex-grow">
      <router-link v-for="(item, index) in menuItems" :key="index" v-slot="{ isActive }" :to="item.url">
        <div class="item" :class="{ 'item--selected': isActive }">
          <span class="item__section flex-col justify-center item__section--side">
            <component :is="item.icon" />
          </span>
          <span class="item__section flex-col justify-center item__section--main font-averta">
            {{ item.title }}
          </span>
        </div>
      </router-link>
    </nav>

    <div class="buttom-nav flex items-center justify-center gap-5" :class="[buttomNavClass]">
      <span class="text-primary font-averta text-sm">All plugins {{ buttomNavText }}</span>
      <toggle v-model="model" size="sm" :icon="icon" @update:model-value="disableAllPlugins">
        <template #icon>
          <div v-if="icon" class="h-full flex justify-center items-center align-items-center" :class="[iconClass]">
            <component :is="icon" />
          </div>
        </template>
      </toggle>
    </div>
  </div>
</template>

<style lang="scss">
.sidenav {
  .item {
    @apply flex flex-row justify-items-center;
    min-height: 32px;
    transition: color .3s, background-color .3s;
    padding-left: 16px;
    padding-bottom: 10px;
    padding-top: 10px;
    cursor: pointer;
    position: relative;

    &::before {
      content: '';
      position: absolute;
      left: 0;
      width: 4px;
      height: 100%;
      top: 50%;
      transform: translateY(-50%);
      opacity: 0;
      background: #EE193AFF 0 0 no-repeat padding-box;
      transition: opacity 0.3s;
    }

    &:hover {
      background-color: white;

      &::before {
        opacity: 1;
      }
    }

    &--selected {
      background-color: white;

      &::before {
        color: #EE193AFF;
        opacity: 1;
      }
    }

    &__section {
      &--side {
        align-items: center;
        color: #757575;
        max-width: 100%;
        min-width: 0;
        padding-right: 16px;
        width: auto;

        svg {
          @apply h-full;
        }
      }

      &--main {
        flex: 10000 1 0;
        max-width: 100%;
        min-width: 0;
        width: auto;
      }
    }
  }
}

.buttom-nav {
  &--enabled {
    background: linear-gradient(0deg, rgba(158,218,186,1) 0%, rgba(0,0,0,0) 100%);
  }

  &--disabled {
    background: linear-gradient(0deg, rgba(198, 48, 64, 0.9) 0%, rgba(0,0,0,0) 100%);
  }
  height: 80px;
}
</style>
