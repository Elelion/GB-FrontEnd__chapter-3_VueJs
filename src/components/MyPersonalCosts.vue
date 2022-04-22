<!-- HomeView -->
<template>
  <div class="home" :class="homeClass">
    <header>
      <div>My personal costs</div>
    </header>

    <main>
      <PaymentDisplay :items="paymentsList" />

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
      <PaymentAddForm @addNewPayment="addPaymentData"/>

      <PaginationPage :total="paymentsList.length" :item="2" @page-changed="fetchData" />



    </main>
  </div>
</template>

<script>
import PaymentDisplay from "@/components/PaymentDisplay";
import PaymentAddForm from "@/components/PaymentAddForm";
import PaginationPage from "@/components/PaginationPage";
export default {
  name: "MyPersonalCosts",
  components: {PaginationPage, PaymentAddForm, PaymentDisplay},

  data() {
    return {
      paymentsList: [],
    }
  },

  methods: {
    addPaymentData(data) {
      this.paymentsList.push(data);
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
      return 'home__color'
    }
  },

  /**
   * в момент создания, будет присвоин наш объект
   */
  created() {
    this.paymentsList = this.fetchData();
  },

  mounted() {
    /**
     * $refs - это объект который показывает наши Vue компоненты, что там лежит
     * те это ссылки на елементы
     */
    // this.$refs.paymentForm.getCurrentDate();
    console.log('mounted:');
    console.log(this.$refs.paymentForm.onClickSave);
  },
}
</script>

<style scoped lang="scss">
.home__color {
  font-weight: bold;
  color: #41B883;
}


</style>