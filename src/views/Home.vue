<template>
  <div class="home">
    <p>Home</p>
    <router-link to="/add-book">Добавить книгу</router-link>
    <div v-for="value in getData" v-bind:key="value.id">
      <img :src="value.image" alt="" />
      <p>{{ value.title }}</p>
      <p>{{ value.author }}</p>
      <p>{{ value.date }}</p>
      <router-link :to="`/edit-book/${value.id}`">Редактировать</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  computed: {
    getData() {
      return this.$store.getters.getBooks;
    }
  }
};
</script>
