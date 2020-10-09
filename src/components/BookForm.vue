<template>
  <div class="add-book">
    {{ BookId }}
    <form action="" v-if="BookId">
      <input type="url" v-model="image" :placeholder="image" required />
      <input type="text" v-model="title" :placeholder="title" required />
      <input type="text" v-model="author" :placeholder="author" required />
      <input type="date" v-model="date" required />
      <button v-on:click="editBook">Сохранить</button>
      <button v-on:click="deleteBook">Удалить!</button>
    </form>
    <form action="" v-if="!BookId">
      <input
        type="url"
        v-model="image"
        placeholder="Ссылка на обложку"
        required
      />
      <input type="text" v-model="title" placeholder="Название" required />
      <input type="text" v-model="author" placeholder="Автор" required />
      <input type="date" v-model="date" required />
      <button v-on:click="saveBook">Сохранить</button>
    </form>
  </div>
</template>
<script>
export default {
  name: "AddBook",
  data() {
    return {
      image: "",
      author: "",
      title: "",
      date: "",
      bookIndex: 0, // индекс редактируемой книги в массиве, в store
      LIBRARY_CAPACITY: 999999
    };
  },

  props: {
    BookId: String
  },

  mounted() {
    this.renderBook();
  },
  methods: {
    saveBook() {
      const savedBooks = this.$store.getters.getBooks;
      const newId = this.generateBookId();
      savedBooks.push({
        id: newId,
        title: this.title,
        author: this.author,
        date: this.date,
        image: this.image
      });
      localStorage.setItem("books", JSON.stringify(savedBooks));
      const savedIds = this.$store.getters.getBooksIds;
      savedIds.push(newId);
      localStorage.setItem("booksIds", JSON.stringify(savedIds));
      this.$store.dispatch("fetchBooks");
    },

    generateBookId() {
      this.$store.dispatch("fetchBooksIds");
      const closedIds = this.$store.getters.getBooksIds;

      function getRandom() {
        let id = Math.floor(Math.random() * this.LIBRARY_CAPACITY);
        if (closedIds.includes(id, 0)) {
          return getRandom.call(this);
        }
        return id;
      }
      return getRandom.call(this);
    },
    renderBook() {
      const book = this.$store.getters.getBook(this.BookId);
      if (book.book) {
        this.title = book.book.title;
        this.image = book.book.image;
        this.author = book.book.author;
        this.date = book.book.date;
        this.bookIndex = book.bookIndex;
      }
    },
    editBook() {
      const savedBooks = this.$store.getters.getBooks;

      savedBooks[this.bookIndex] = {
        id: this.BookId,
        title: this.title,
        author: this.author,
        date: this.date,
        image: this.image
      };
      localStorage.setItem("books", JSON.stringify(savedBooks));
      this.$store.dispatch("fetchBooks");
    },
    deleteBook() {
      const savedBooks = this.$store.getters.getBooks;
      savedBooks.splice(this.bookIndex, 1);
      localStorage.setItem("books", JSON.stringify(savedBooks));
      this.$router.push("/");
    }
  }
};
</script>

<style></style>
