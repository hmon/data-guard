<script setup lang="ts">
import Toggle from '~/components/kit/Toggle.vue'
import { usePluginsStore } from '~/stores/plugins'

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  modelValue: {
    type: Boolean,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})

const model = props.disabled ? ref(false) : useVModel(props, 'modelValue')

const store = usePluginsStore()

const plugin = store.getPlugin(props.id)

const modelText = computed(() => model.value ? 'Allowed' : 'Blocked')
const modelClass = computed(() => model.value ? 'text-green-400' : 'text-red-800')
const disableLogic = computed(() => {
  return store.getDisableAll || props.disabled
})
</script>

<template>
  <div class="card" :class="disableLogic ? 'card--disabled' : ''">
    <div class="grid grid-cols-4">
      <div class="col-span-3">
        <h2 class="font-averta text-lg text-primary">
          {{ plugin.title }}
        </h2>

        <p class="mt-4">
          {{ plugin.description }}
        </p>
      </div>

      <div class="flex flex-col">
        <div class="w-full flex justify-center">
          <toggle v-model="model" :disabled="disableLogic"/>
        </div>

        <div class="my-2 w-full text-center font-semibold" :class="[modelClass]">
          {{ modelText }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.card {
  @apply p-5;
  border: 2px solid #dcdcdc;
  border-radius: 10px;

  &--disabled {
    opacity: 0.5;
  }
}
</style>
