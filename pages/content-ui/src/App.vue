<script lang='ts' setup>
import { onMounted } from 'vue'

onMounted(() => {
  console.log('content ui loaded')
})

</script>

<template>

    <div class="flex items-center justify-between gap-2 rounded bg-blue-100 px-2 py-1">
      <div class="flex gap-1 text-blue-500">
        Edit <strong class="text-blue-700">pages/content-ui/src/app.tsx</strong> and save to reload.
      </div>
    </div>

</template>