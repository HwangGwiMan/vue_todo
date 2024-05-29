<template>
  <div>Home Page</div>
</template>

<script>
import {useCount} from "@/composables/count.js";
export default {
  setup() {
    const {count} = useCount();

    return {
      count
    }
  }
}
</script>

<style scoped>

</style>