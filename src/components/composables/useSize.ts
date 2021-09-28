import { computed } from 'vue'

export const useSizeDefaults = {
  xs: 14,
  sm: 18,
  md: 24,
  lg: 32,
  xl: 48,
}

export const useSizeProps = {
  size: String,
}

export default function(props: any, sizes: any = useSizeDefaults) {
  // return sizeStyle
  return computed(() => (
    props.size !== undefined
      ? { fontSize: props.size in sizes ? `${sizes[props.size]}px` : props.size }
      : null
  ))
}
