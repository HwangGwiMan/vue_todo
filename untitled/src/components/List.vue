<template>
  <div
      class="card mt-2"
      :key="item.id"
      v-for="(item, index) in items"
  >
    <slot :item="item" :index="index"></slot>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true
    }
  }
}
</script>


<style scoped>

</style>