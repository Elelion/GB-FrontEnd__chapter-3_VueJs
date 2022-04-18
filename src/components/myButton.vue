<!--
slot - некое пространство через которые мы можем передать данные,
те в данном случае это как бы значение по дефолту
используется как правило для дефолтных значений
-->
<template>
  <div class="btn">
    <div class="icon">
      <!-- v-bind - привязываем по ID в template->Calculator.vue -->
      <slot name="icon" v-bind="{count: countClick}" />
    </div>

    <button @click="onClick">
      <slot>
        MyButton_slot
      </slot>
    </button>
  </div>
</template>

<script>
export default {
  name: "myButton",

  data() {
    return {
      countClick: 0,
    }
  },

  methods: {
    onClick() {
      this.countClick++;
      this.$emit('click');
    }
  }
}
</script>

<style scoped>

</style>