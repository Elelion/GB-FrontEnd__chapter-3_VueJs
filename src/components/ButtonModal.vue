<template>
  <button @click="onClick">
      <slot />
      </button>
</template>

<script>
export default {
    name: 'ButtonModal',
    methods: {
     onClick() {}
 },
}
</script>

<style lang="scss" scoped></style>
