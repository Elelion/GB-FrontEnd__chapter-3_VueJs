<template>
  <div>
    <h1>./Different Elements</h1>

    <!-- ** -->

    <p>Slots.vue:</p>
    <MySlots>
      <template #icon="count">
        + {{count}}
      </template>
      Нажать
    </MySlots>

    <MySlots />

    <!-- ** -->

    <br>
    <p>MyButton.vue:</p>

    <button @click="show = !show">hide/show</button>
    <MyButton v-if="show" />
    <!-- ** -->

  </div>
</template>

<script>
import MySlots from "@/components/Slots";
import MyButton from "@/components/MyButton";
export default {
  name: "DifferentElements",
  components: {MyButton, MySlots},

  data() {
    return {
      textVal: 'Some text',
      show: true,
      arr: [1, 2, 3, 4, 5],
    }
  }
}
</script>

<style scoped>

</style>