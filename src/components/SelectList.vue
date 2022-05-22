<template>
  <div class="select">
    <select v-model="selected">
      <option
        v-for="(option, idx) in dictionaryList"
        :key="idx"
        :value="option"
      >
        {{ option }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: "SelectList",
  props: {
      dictionaryList: {
          type: Array,
          default: ()=>[],
          require: true
      }
  },
  data() {
    return {
      selected: '',
    }
  }
};
</script>
<style lang="scss">
select {
  height: 21px;
  width: 140px;
}
</style>
