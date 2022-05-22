<template>
  <div>
    <div class="payment__table">
      <div class="payment__header">
        <div class="payment__header-item">
          Nr.
        </div>
        <div class="payment__header-item">
          Date
        </div>
        <div class="payment__header-item">
          Category
        </div>
        <div class="payment__header-item">
          Value
        </div>
      </div>
      <div
        v-for="(item, index) in currentElements"
        :key="index"
        class="payment__line"
      >
        {{
        <div class="payment__line-item">
          {{ index + 1 }}
        </div>
        <div class="payment__line-item">
          {{ item.date }}
        </div>
        <div class="payment__line-item">
          {{ item.category }}
        </div>
        <div class="payment__line-item">
          {{ item.value }}
        </div>
        <span @click="onItemClick($event, item)">...</span>
      </div>
    </div>

    <Pagination
      :length="getPaymentList.length"
      :n="n"
      :cur="page"
      @paginate="onPgaginate"
    />
  </div>
</template>

<script>
import Pagination from "./Pagination";
import { mapGetters } from "vuex";
export default {
  name: "PaymentsDisplay",
  components: {
    Pagination
  },
  props: {
    items: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      page: 0,
      n: 15
    };
  },
  computed: {
    ...mapGetters(["getPaymentList"]),
    currentElements() {
      const { n, page } = this;
      return this.items.slice(n * (page - 1), n * (page - 1) + n);
    }
  },
  created() {
    this.page = this.$route.params.page || 1;
  },
  methods: {
    deleteItem: 'itemDelete',
    onPgaginate(p) {
      this.page = p;
    },
    onItemClick(event, item) {
      const items = [
        {text: 'Delete', actions: () => {this.deleteItem(item.id)}},
        {text: 'Edit', actions: () => {console.log('Edit', item.id)}}
      ]
      this.$contextMenu.show({event, items})
    }
  }
};
</script>

<style scoped>
.payment__table {
  width: 90%;
  margin: 20px auto;
  display: flex;
  flex-direction: column;
  align-items: space-between;
}
.payment__header {
  height: 30px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  border-bottom: 2px solid #000;
}
.payment__header-item {
  font-style: oblique;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  font-size: 0.8rem;
  align-self: center;
}
.payment__line {
  height: 30px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  border-bottom: 1px solid #000;
  align-items: center;
}
</style>
