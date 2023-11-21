<script setup lang="ts">
defineProps<{
  foo: GlobalExternalType2
}>()
</script>

<template>
  <h1>foo: {{ foo.bar }}</h1>
</template>
