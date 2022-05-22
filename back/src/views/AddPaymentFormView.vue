<template>
  <div class="form-wrapper">
    <input v-model="date" placeholder="date" />
    <select name="" id="" v-model="category" v-if="categoryList">
      <option value="" v-for="(value, index) in categoryList" :key="index">
        {{value}}
      </option>
    </select>
    <input v-model="value" placeholder="date" />
    <button @click="onClickSave">Save</button>
  </div>
</template>

<script>
export default {
  name: "AddPaymentForm",

  data() {
    return {
      date: '',
      category: '',
      value: '',
    }
  },

  methods: {
    onClickSave() {
      const data = {
        date: this.date || this.getCurrentDate,
        category: this.category,
        value: this.value,
      };

      this.$store.commit('addDataToPaymentsList', data);
    },
  },

  computed: {
    getCurrentDate() {
      const today = new Date();
      const d = today.getDate();
      const m = today.getMonth() + 1;
      const y = today.getFullYear();

      return `${d}.${m}.${y}`;
    },

    categoryList() {
      return this.$store.getters.getCategoryList;
    }
  },

  async created() {
    await this.$store.dispatch('fetchCategoryList')
  },

  mounted() {
    const {category, section} = this.$route.params;
    if (!category || !section) {
      return;
    }

    this.category = category;
    const {value} = this.$route.query;

    if (!value) {
      return;
    }

    this.value = value

    if (this.value&& this.category) {
      this.onClickSave()
    }
  }
}
</script>

<style scoped>

</style>