<!-- AddPaymentForm -->
<template>
  <div class="form-wrapper">
    <br>

    <div>
      <button @click="show = !show">Add new cost +</button>
    </div>

    <div class="form-fields" v-if="show">
      <input type="text" v-model="date" placeholder="date" />
      <input type="text" v-model="category" placeholder="category" />
      <input type="text" v-model="value" placeholder="value" />

      <button @click="onClickSave">Save / Add</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "PaymentAddForm",

  data() {
    return {
      date: "",
      category: "",
      value: "",
      show: false,
    }
  },

  methods: {
    onClickSave() {
      const data = {
        // date: присвоим значение 1 | если нет значения, то | присвоим значение 2
        date: this.date || this.getCurrentDate,
        category: this.category,
        value: this.value,
      }

      /**
       * Просто генерирует событие, на которое может подписаться его родительский
       * компонент. Заметьте что такие события не "всплывают" как события в js,
       * это только для общения между двумя компонентами.
       *
       * addNewPayment - название аргумента, data - передаем нашу data что выше
       *
       * подробнее тут:
       * https://ru.vuejs.org/v2/guide/components-custom-events.html
       */
      this.$emit('addNewPayment', data)
    }
  },

  computed: {
    getCurrentDate() {
      const today = new Date();
      const d = today.getDate();
      const m = today.getMonth() + 1;
      const y = today.getFullYear();

      return `${d}.${m}.${y}`;
    },
  },
}
</script>

<style scoped lang="scss">

.form-wrapper button {
  background: #41B883;
  border: none;
  width: 150px;
  height: 40px;
  border-radius: 4px;
  font-size: 16px;
  color: white;
}

</style>