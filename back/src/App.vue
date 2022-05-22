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

    <header>
      <!-- для # используем hash + hashchange -->
<!--      <a href="dashboard">Dashboard</a>-->
<!--      <a href="about">About</a>-->
<!--      <a href="notfound">Not found</a>-->
      <router-link to="/">Home</router-link>
      <router-link to="about">About</router-link>
      <router-link to="notfound">404</router-link>
    </header>

    <!--
     ставим для vue2 пакет vue-router

     npm install vue-router@3.5.1

     далее создаем в src папку router
    -->
    <nav>

    </nav>
    <router-view />

    <main>
      <HomeView v-if="page === 'dashboard' || page === '' "/>
      <AboutView v-if="page === 'about' " />
      <NotFound v-if="page === 'notfound' "/>
    </main>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
// import CalculatorApp from "@/components/Calculator";
// import DifferentElements from "@/components/DifferentElements";

import HomeView from "@/views/HomeView";
import NotFound from "@/views/NotFoundView";
import AboutView from "@/views/about/AboutView";
export default {
  name: 'App',

  components: {
    AboutView,
    NotFound,
    HomeView
    // DifferentElements,
    // CalculatorApp,
    // HelloWorld
  },

  data() {
    return {
      page: '',
    }
  },

  methods: {
    setPage() {
      // для #dashboard итп
      // this.page = location.hash.slice(1);

      this.page = location.pathname.slice(1);
    },
  },

  mounted() {
    this.setPage();

    // событие позволяющее менять странички по якорям
    // для #dashboard итп
    /*
    window.addEventListener('hashchange', () => {
      this.setPage();
    })
    */

    // подписываемся на наши кнопки перехода
    const links = this.$el.querySelectorAll('a');
    links.forEach(link => {
      link.addEventListener('click', (event) => {
        event.preventDefault();
        history.pushState({}, '', link.href);
        this.setPage();
      });

      // popstate - для переходов назад и в перед (возврат на пред стр итп)
      window.addEventListener('popstate', () => {
        this.setPage()
      });
    });
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

header a {
  margin-left: 20px;
}
</style>

<!--
26
-->