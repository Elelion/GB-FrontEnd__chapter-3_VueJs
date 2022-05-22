<template>
  <div class="hello">
    <h1>./HelloWorld.vue</h1>
    <h2>{{ msg }}</h2>
    <h3>{{ text }}</h3>

<!--    <hr>-->

    <!-- onBlur - событие при потери фокуса -->
<!--    <input type="text" v-model="textValue" @blur="onBlur('hi')">-->

<!--    <input :value="textValue2" @input="textValue2 = $event.target.value">-->
<!--    <button @click="result++">Click {{result}}</button>-->
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',

  props: {
    msg: {
      type: String,
    },
    text: {
      type: String,
      default: 'def'
    },
  },

  data() {
    return {
      result: 0,
      textValue: '',
      textValue2: '',
    }
  },

  methods: {
    onBlur(val) {
      console.log(val)
      console.log(this.textValue);
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
