<script setup lang="ts">
import { type ExternalType } from '../types/ExternalType'

defineProps<{
  foo: ExternalType
}>()
</script>

<template>
  <h1>foo: {{ foo.bar }}</h1>
</template>
