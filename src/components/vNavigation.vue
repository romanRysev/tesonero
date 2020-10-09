<template>
  <nav class="menu">
    <router-link to="/" class="menu__link">Главная</router-link>
    <router-link to="/add-book" class="menu__link">Добавить книгу</router-link>
  </nav>
</template>

<script>
export default {};
</script>

<style>
.menu {
  padding: 2rem;
  background: #e9e9e9;
}
.menu__link {
  text-decoration: none;
  color: black;
  font-size: 2rem;
  margin-right: 3rem;
}

.menu__link:hover {
  font-weight: 500;
}
</style>
