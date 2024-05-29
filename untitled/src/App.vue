<template>
  <Navbar />
  <div class="container">
    <router-view/>
  </div>
  <transition name="slide">
    <Toast/>
  </transition>
</template>

<script>
import Toast from "@/components/Toast.vue";
import Navbar from "@/components/Navbar.vue";

export default {
  components: {
    Toast,
    Navbar
  }
}
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s ease;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}

.slide-enter-to,
.slide-leave-from {
  opacity: 1;
  transform: translateY(0px);
}
</style>