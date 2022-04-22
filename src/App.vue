<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">

    <!--
    props - входные параметры компонента
    в данном случае props это msg=""
    -->
<!--    <HelloWorld msg="Здесь могла быть ваша реклама - Vue.js App" />-->

    <!--
    !!!важно!!!
    биндим наш пропс, на значение из calculator.vue/data/text
    что бы значение было булевым, его нужно забиндить, например:
    :someNumber="false"
    -->
<!--    <hr>-->
<!--    <CalculatorApp v-bind:text="text" />-->

    <!-- ** -->
    <!-- 1: inline-выражение -->
    <!-- <button v-on:click="c = a + b">summa</button> -->

    <!-- 2: вызов метода обработчика с параметрами -->
    <!-- <button v-on:click="doThat('hello', $event)"></button> -->

    <!-- 3: вызов метода обработчика без параметров -->
    <!-- <button v-on:click="doThis"></button> -->
<!--    <hr>-->
<!--    <DifferentElements />-->

    <MyPersonalCosts />
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
// import CalculatorApp from "@/components/Calculator";
// import DifferentElements from "@/components/DifferentElements";

import MyPersonalCosts from "@/components/MyPersonalCosts";
export default {
  name: 'App',
  components: {
    MyPersonalCosts
    // DifferentElements,
    // CalculatorApp,
    // HelloWorld
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

<!--
1-41
-->