<template>
  <div class="pagination">
    <div class="page-item" @click="onClick(cur - 1)">-</div>
    <div class="page-item"
      v-for="i in amount" :key="i"
       @click="onClick(i)"
    >{{ i }}</div>
    <div class="page-item" @click="onClick(cur + 1)">+</div>
  </div>
</template>

<script>
export default {
  props: {
    length: Number,
    n: Number,
    cur: Number
  },
  computed: {
    amount () {
      return Math.ceil(this.length / this.n)
    }
  },
  methods: {
    onClick (p) {
      if (p < 1 || p > this.amount) {
        return
      }
      this.$emit('paginate', p)
    }
  }
}
</script>

<style lang="scss">
	.pagination {
    max-width: 750px;
		width: 70%;
		margin: 20px auto;
    display: flex;
    justify-content: space-evenly;
	}
	.page-item {
    width: 20px;
		font-size: 14px;
		color: #3bba9f;
		font-weight: 500;
        border: 1px solid #3f95cd;
        border-radius: 3px;
    &:hover, :active {
      background-color: #3bba9f;
      color: black;
    }
	}
</style>
