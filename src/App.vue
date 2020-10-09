<template>
  <div class="app">
    <vNavigation />
    <router-view />
  </div>
</template>

<script>
import vNavigation from "./components/vNavigation.vue";
export default {
  components: {
    vNavigation
  },
  created() {
    return this.$store.dispatch("fetchBooks");
  }
};
</script>

<style>
.app {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}
</style>
