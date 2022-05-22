<template>
  <div class="home" :class="homeClass">
    <header>
      <div>My personal costs</div>
      <br>
<!--      <div class="home__total-total">Total price: {{getFPV}}</div>-->
      <div class="home__total-total">Total price: {{getFullPaymentValue}}</div>
      <br>
    </header>

    <main>
<!--      <PaymentDisplay :items="paymentsList" />-->
      <!-- берем данные из геттера -->
<!--      <PaymentDisplay :items="this.getPaymentsListData" />-->

      <!-- добавляем пагинацию -->
      <PaymentDisplay :items="this.currentElements" />

      <!--
       @addNewPayment="addPaymentData"
       привязываем к событию onClick дочернего елемента при нажатии на кнопку
       передачу данных в родителя, те сюда, в метод addPaymentData
       те данные от туда, мы занесем сюда, по событию event click

       НО лучше так не делать, тк компонент будет зависеть от родителя
       и его не куда не привязать потом

       от ref в данном случае лучше вообще отказаться, это плохая практика
       просто для примера оставим что так можно
      -->
<!--      <PaymentAddForm @addNewPayment="addPaymentData" ref="paymentForm"/>-->
<!--      <PaymentAddForm @addNewPayment="addPaymentData"/>-->
      <PaymentAddForm />
      <MyPagination
          :cur="cur"
          :length="getPaymentsListData.length"
          :n="n"
          @changePage="changePage" />



    </main>
  </div>
</template>

<script>
import PaymentDisplay from "@/components/PaymentDisplay";
import PaymentAddForm from "@/components/PaymentAddForm";

import {
  // для ...mapMutations... и this.setPaymentListData(this.fetchData());
  mapMutations,

  // что бы на прямую получить getFullPaymentValue, без getFPV
  mapGetters
} from "vuex";
import MyPagination from "@/components/MyPagination";

export default {
  name: "HomeView",
  components: {
    MyPagination,
    PaymentAddForm,
    PaymentDisplay
  },

  data() {
    return {
      // берем данные из store
      paymentsList: [],
      cur: 1,
      n: 4,
    }
  },

  methods: {
    // ...mapMutations([
    //     'setPaymentListData'
    // ]),

    // даем псевдоним нашей мутации - MyMutation
    ...mapMutations({
        MyMutation: 'setPaymentListData'
    }),

    addPaymentData(data) {
      this.paymentsList.push(data);
    },

    changePage(p) {
      this.cur = p;
    },

    /**
     * эмитация backend, возвращающая значения, которые мы потом будем вызывать
     * и рендерить
     */
    fetchData() {
      return [
        {
          date: "28.03.2020",
          category: "Food",
          value: 169,
        },
        {
          date: "28.03.2021",
          category: "Transport",
          value: 360,
        },
        {
          date: "28.03.2022",
          category: "Rest",
          value: 532,
        }
      ]
    },
  },

  computed: {
    homeClass() {
      return 'home__coor'
    },

    /**
     * или getter можно вызвать иначе, через ...mapGetters
     */
    // getFPV() {
      // !важно! БЕЗ скобок в конце !
      // return this.$store.getters.getFullPaymentValue;
    // },

    ...mapGetters([
        'getFullPaymentValue',
        'getPaymentsListData'
    ]),

    currentElements() {
      return this.getPaymentsListData.slice(
          this.n * (this.cur - 1), this.n * (this.cur - 1) + this.n)
    },
  },

  /**
   * в момент создания, будет присвоин наш объект
   */
  created() {
    // вызываем наш actions из store, для ДО-заполнения данными
    this.$store.dispatch('fetchData');

    /**
     * вызываем нашу мутацию из store, $store.commit - для вызова мутации
     * setPaymentListData - название мутации,
     * this.fetchData() - значение которое упадет в state
     */
    // this.$store.commit('setPaymentListData', this.fetchData())

    /**
     * заносим в наш state данные из fetchData, теперь они в переменной
     * paymentList у state и дальше мы оперируем геттерами с этой же переменной
     * из state
     */
    // this.setPaymentListData(this.fetchData());

    this.MyMutation(this.fetchData());
    this.paymentsList = this.fetchData();
  },

  mounted() {
    /**
     * $refs - это объект который показывает наши Vue компоненты, что там лежит
     * те это ссылки на елементы
     */
    // this.$refs.paymentForm.getCurrentDate();

    if (!this.$route.params?.page || isNaN(this.$route.params.page)) {
      return true;
    }

    this.cur = Number(this.$route.params.page);
  },
}
</script>

<style scoped lang="scss">

.home__color {
  font-weight: bold;
  color: #41B883;
}

.home__total-total {
  color: #36495E;
}

</style>

<!--
устанавливаем Vuex

Vuex — паттерн управления состоянием + библиотека для приложений на Vue. js.
Он служит централизованным хранилищем данных для всех компонентов приложения
с правилами, гарантирующими, что состояние может быть изменено только
предсказуемым образом.

vue add vuex

далее создаем папку store тк так принято и работаем уже там
-->