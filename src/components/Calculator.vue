<template>
  <div>
    <div class="display">
      <h1>{{ msg }}</h1>

      <!-- .number - будет работать только с числом -->
      <p>Число 1</p>
      <input v-model="operand1.number"/>

      <p>Число 2</p>
      <input v-model="operand2.number"/>

      <p>Результат в степень</p>
      <input v-model="operand3"/>

      <p>Результат: = {{result}} </p>
    </div>

    <div class="keyboard">
      <button v-on:click="addition">+</button>
      <button v-on:click="subtraction">-</button>
      <button v-on:click="division">/</button>
      <button v-on:click="multiplication">*</button>
      <button v-on:click="result = Math.pow(result, operand3)">pow</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CalculatorApp',

  props: {
    msg: {
      type: String,
      default: 'Калькулятор'
    },
  },

  // по сути это объект для хранения данных, а если точнее это св-ва
  data(){
    return {
      text: 'default text from - Calculator.vue',
      operand1: 0,
      operand2: 0,
      operand3: 1,
      result: 0,
    }
  },

  methods: {
    addition() {
      this.result = Number(this.operand1) + Number(this.operand2);
    },
    subtraction() {
      this.result = Number(this.operand1) - Number(this.operand2);
    },
    division() {
      this.result = Math.floor(Number(this.operand1) / Number(this.operand2));
    },
    multiplication() {
      this.result = Number(this.operand1) * Number(this.operand2);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.display {
  border: 1px solid gray;
}
</style>
