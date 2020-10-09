<template>
  <BookForm :BookId="$route.params.id" />
</template>

<script>
import BookForm from "../components/BookForm";
export default {
  name: "EditBook",
  components: {
    BookForm
  }
};
</script>

<style></style>
