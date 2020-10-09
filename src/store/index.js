import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    books: [],
    booksIds: []
  },
  mutations: {
    setBooks(store, data) {
      store.books = data;
    },
    setBooksIds(store, data) {
      store.booksIds = data;
    }
  },
  actions: {
    fetchBooks(state) {
      if (localStorage.books) {
        return state.commit("setBooks", JSON.parse(localStorage.books));
      }
    },
    fetchBooksIds(state) {
      if (localStorage.booksIds) {
        return state.commit("setBooksIds", JSON.parse(localStorage.booksIds));
      }
    }
  },
  getters: {
    getBooks(state) {
      return state.books;
    },
    getBooksIds(state) {
      return state.booksIds;
    },
    getBook: state => id => {
      const bookIndex = state.books.findIndex(item => item.id == id);
      console.log(bookIndex);
      return { book: state.books[bookIndex], bookIndex };
    }
  }
});
