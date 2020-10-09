<template>
  <div class="add-book">
    <h1 v-if="BookId">Редактирование книги "{{ title }}"</h1>
    <h1 v-if="!BookId">Добавьте новую книгу</h1>
    <form action="" v-if="BookId" class="add-book-form">
      <input
        type="url"
        v-model="image"
        :placeholder="image"
        required
        class="add-book-form__input"
      />
      <input
        type="text"
        v-model="title"
        :placeholder="title"
        required
        class="add-book-form__input"
      />
      <input
        type="text"
        v-model="author"
        :placeholder="author"
        required
        class="add-book-form__input"
      />
      <input type="date" v-model="date" required class="add-book-form__input" />
      <button v-on:click="editBook" class="add-book-form__button">
        Сохранить
      </button>
      <button v-on:click="deleteBook" class="add-book-form__button">
        Удалить книгу!
      </button>
    </form>
    <form action="" v-if="!BookId" class="add-book-form">
      <input
        type="url"
        v-model="image"
        placeholder="Ссылка на обложку"
        required
        class="add-book-form__input"
      />
      <input
        type="text"
        v-model="title"
        placeholder="Название"
        required
        class="add-book-form__input"
      />
      <input
        type="text"
        v-model="author"
        placeholder="Автор"
        required
        class="add-book-form__input"
      />
      <input type="date" v-model="date" required class="add-book-form__input" />
      <button v-on:click="saveBook" class="add-book-form__button">
        Сохранить
      </button>
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

<style>
.add-book {
  padding: 2rem;
}
.add-book-form {
  display: flex;
  flex-direction: column;
  max-width: 40%;
  margin: 3rem auto;
  background: #c5c5c5;
  padding: 1rem;
  border-radius: 0.5rem;
}
.add-book-form__button {
  margin-top: 2rem;
  padding: 1rem;
}
.add-book-form__input {
  padding: 1rem;
  margin-top: 1rem;
}
</style>
