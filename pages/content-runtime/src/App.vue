<script lang='ts' setup>
import { onMounted } from 'vue'

onMounted(() => {
  console.log('runtime content view loaded')
})

</script>

<template>
  <div class="runtime-content-view-text">runtime content view</div>
</template>
