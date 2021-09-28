<script lang="ts" setup="props">
import useSize from '~/components/composables/useSize'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String,
    default: () => 'xs',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:modelValue'])

// ref
const rootEl = ref(null)

// Data
const width = ref(100)
const state = ref(false)
const pressed = ref(0)
const position = ref(0)
const interval = ref(0)

// Computed
const sizeStyle = useSize(props)
const posPercentage = computed(() => `${position.value / width.value * 100}%`)
const style = computed(() => ({
  transform: `translateX(${posPercentage.value})`,
}))
const stateClass = computed(() => state.value ? 'active' : '')

watch(position, (value) => {
  state.value = value >= 50
})

// Methods
const toggle = (newState) => {
  state.value = newState
  position.value = !newState
    ? 0
    : 100
}

const startTimer = () => {
  interval.value = setInterval(() => {
    pressed.value++
  }, 1)
}

const resolvePosition = () => {
  position.value = state.value ? 100 : 0
}

const onClick = () => {
  if (props.disabled) return
  toggle(!state.value)
  emit('update:modelValue', state.value)
}

const dragging = (e) => {
  const pos = e.clientX - rootEl.value.offsetLeft
  const percent = pos / width.value * 100
  position.value = percent <= 0
    ? 0
    : percent >= 100
      ? 100
      : percent
}

const dragStop = () => {
  window.removeEventListener('mousemove', dragging)
  window.removeEventListener('mouseup', dragStop)
  resolvePosition()
  clearInterval(interval.value)
  if (pressed.value < 30)
    toggle(!state.value)

  pressed.value = 0
  emit('update:modelValue', state.value)
}

const dragStart = (e) => {
  if (props.disabled) return
  startTimer()
  window.addEventListener('mousemove', dragging)
  window.addEventListener('mouseup', dragStop)
}

onMounted(() => {
  toggle(props.modelValue)
})
</script>

<template>
  <div :style="sizeStyle">
    <div
      ref="rootEl"
      class="toggle flex"
      :class="[stateClass]"
      @click.self="onClick"
    >
      <div
        class="draggable"
        :style="style"
        @mousedown.prevent="dragStart"
      >
        <slot name="icon"></slot>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
$width: 4em;
$background: #fff;
$background-inactive: #c63040;
$background-active: #5bc88d;
$button-size: 1.65em;
$button-color: $background;

.toggle {
  cursor: pointer;
  width: $width;
  background: $background-inactive;
  border-radius: 300px;
  padding: 5px;
  transition: background 0.6s;

  .draggable {
    width: $button-size;
    height: $button-size;
    background: $button-color;
    border-radius: 100%;
    box-shadow: 0px 3px 10px rgba(0,0,0, 0.6);
    transform: translateX(0%);
    transition: transform 0.05s ease-in-out;
  }

  &.active {
    background: $background-active;
    transition: background 0.6s;
  }
}

.switches {
  margin-right: 30px
}
</style>
