<template>
  <div class="main">
    <h1>Ваша Библиотека</h1>
    <div class="library">
      <div v-for="value in getData" v-bind:key="value.id" class="library-item">
        <img
          :src="value.image"
          alt="Обложка книги"
          class="library-item__image"
        />
        <h2>{{ value.title }}</h2>
        <h4>{{ value.author }}</h4>
        <p>{{ value.date }}</p>
        <router-link :to="`/edit-book/${value.id}`">Редактировать</router-link>
      </div>
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
<style>
.main {
  padding: 2rem;
}
.library {
  display: flex;
  flex-wrap: wrap;
  padding: 2rem;
}
.library-item {
  margin: 1rem;
}
.library-item__image {
  max-width: 200px;
  height: 300px;
  object-fit: contain;
}
</style>
