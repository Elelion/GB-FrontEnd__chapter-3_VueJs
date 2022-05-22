<template>
  <div class="wrp">
    <div @click="onClick(cur - 1)">-</div>

    <div
      v-for="i in amount"
      :key="i"
      :class="{active: cur === i}"
      @click="onClick(i)"
    >
      {{i}}
    </div>

    <div @click="onClick(cur + 1)">+</div>
  </div>
</template>

<script>
export default {
  name: "MyPagination",

  props: {
    length: Number,
    n: Number,
    cur: Number,
  },

  data() {
    return {

    }
  },

  methods: {
    onClick(p) {
      if (p < 1 || p > this.amount) {
        return;
      }

      this.$emit('changePage', p);
    }
  },

  computed: {
    amount() {
      // получаем длинну
      return Math.ceil(this.length / this.n);
    }
  },
}
</script>

<style scoped lang="scss">

.wrp {
  display: flex;
  width: 300px;
  margin: 20px auto 0 auto;
  border: 1px solid #41B883;
  justify-content: center;

   & > div {
     padding: 10px;
     cursor: pointer;

     &:hover {
       background: #41B883;
     }

     &.active {
       background: #36495E;
       color: white;
     }
   }
}

</style>