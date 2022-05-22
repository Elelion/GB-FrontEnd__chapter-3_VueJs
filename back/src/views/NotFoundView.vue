<template>
  <div class="about">
    <header>
      <router-link :to="{
        path: '/add/payment',
        // params: {section: 'payment', category: 'Food'},
        query: {value: 500} }"
      >Add new Food</router-link>

      <h1>404</h1>
    </header>

    <router-view />

    <main>
<!--      <AddPaymentFormView v-if="page === 'payment' "/>-->
    </main>
  </div>
</template>

<script>
// import AddPaymentFormView from "@/views/AddPaymentFormView";
// import PaymentAddForm from "@/components/PaymentAddForm";
export default {
  name: "NotFoundView",

  components: {
    // PaymentAddForm,
    // AddPaymentFormView,

  },

  data() {
    return {
      status: 'stop',
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

  computed: {

  },

  mounted() {
    this.setPage();

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

<style scoped>

</style>