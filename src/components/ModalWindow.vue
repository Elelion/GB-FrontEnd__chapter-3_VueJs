<template>
  <div class="wrapper-modal">
    <div class="header">
      {{ headerName }}
    </div>
    <div class="content">
      <component :is="name" />
      <button @click="onClose">
        Close
      </button>
    </div>
  </div>
</template>

<script>
import AddPayment from "./AddPayment";
import AuthForm from "./AuthForm";
export default {
  name: "ModalWindow",
  components: {
    AddPayment,
    AuthForm
  },
  props: {
    name: String,
    headerName: String
  },
  methods: {
    onClose() {
      this.$modal.hide();
    }
  }
};
</script>

<style lang="scss" scoped>
.wrapper-modal {
  position: absolute;
  top: 0;
}
</style>
