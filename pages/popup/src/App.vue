
<script lang='ts' setup>
import { useCounterStore } from '@src/stores/counter'

const counterStore = useCounterStore()

</script>

<template>
  <div class="flex flex-col bg-white">

    <div class="flex flex-col text-center mt-40 mx-auto">
      <span>{{ counterStore.count }}</span>

      <button @click="counterStore.increment()" class="px-7 py-2 bg-blue-500 rounded-lg text-white">Click</button>

    </div>

    <div class="mt-20 px-10">
      <RouterView />
    </div>
  </div>
</template>

