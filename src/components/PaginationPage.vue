<template>
  <div class="pagination__wrapper">
    <ul>
      <li v-for="(item, index) in totalPages" :key="item">
        <button
            class="pagination__button"
            :class="{active: currentPage === p}"
            @click="changePage(p)"
        >
          {{index}}
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "PaginationPage",

  props: ['total', 'item'],

  data() {
    return {
      currentPage: 1,
    }
  },

  methods: {
    changePage(pageNumber) {
      this.currentPage = pageNumber;
      this.$emit('page-changed', pageNumber);
    },
  },

  computed: {
    totalPages() {
      return Math.ceil(this.total / this.item);
    },
  },
}
</script>

<style scoped lang="scss">

.pagination__wrapper {
  width: 300px;
  margin: 0 auto 0 auto;
}

ul {
  border: 1px solid #36495E;
  padding: 0;
  list-style: none;
  display: flex;
  justify-content: center;
}

ul li {
  list-style: none;
  padding: 0;
  margin: 0;
}

.pagination__button {
  background-color: white;
  color: #41B883;
  border: none;
}

.pagination__button:hover {
  background-color: #36495E;
  color: white;
}

.active {
  background-color: lightslategray;
  color: white;
  font-weight: bold;
}

</style>