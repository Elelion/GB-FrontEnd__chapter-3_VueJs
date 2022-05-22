<template>
  <div>
    <Button @click="onClick">Clicked {{counter}} times!</Button>
  </div>
</template>

<script>
export default {
  name: "MyButton",

  data() {
    return {
      counter: 0,
    }
  },

  methods: {
    onClick() {
      this.counter++;
    },

    onMouseOver() {
      console.log('hovered');
    }
  },

  /**
   * хук жизненного цикла - каждый раз когда мы инициализируем компоненту
   * она проходит определенные этапы своего существования. Эти хуки ВСЕГДА
   * выполняются
   *
   * - beforeCreate() {...} - до того как компонент появится
   * - created() {...} - когда уже все создано (тут еще отсутствует DOM)
   * - beforeMount() {...} - перед монтированием DOM
   * - mounted() {...} - после монтирования DOM
   *
   * - beforeUpdate() {...} - цикл после создания во время жизни, перед обновлением
   * - updated() {...} - аналогично, после обновления
   * - beforeDestroy() {...} - перед тем, когда компонент уничтожается
   * - destroyed() {...} - когда компонент был уничтожен
   */

  beforeCreate() {
    this.counter = 1; // изменить не получится, тк еще не чего не создано
    console.log('beforeCreate');
  },

  created() {
    console.log('created');
  },

  mounted() {
    // $el - конкретный эелемент нашего документа
    const btn = this.$el.querySelector('button');

    if (btn) {
      btn.addEventListener('mousemove', this.onMouseOver)
    }

    console.log(btn)
    console.log('mounted');
  }
}
</script>

<style scoped>

</style>