<script setup lang="ts">
import CompWithExplicitlyImportedType from './components/CompWithExplicitlyImportedType.vue';
import CompUsingGlobalType1 from './components/CompUsingGlobalType1.vue';
import CompUsingGlobalType2 from './components/CompUsingGlobalType2.vue';
</script>

<template>
  <!-- we should get ts errors for all components -->
  <CompWithExplicitlyImportedType
    :foo="{ bar: 123 }"
  />
  <CompUsingGlobalType1 
    :foo="{ bar: 123 }"
  />
  <CompUsingGlobalType2
    :foo="{ bar: 123 }"
  />
</template>
