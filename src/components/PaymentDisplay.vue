<template>
  <div class="paymentList">
    <div class="paymentItem" v-for="(item, index) in items" :key="index">
      {{item}}
    </div>

    <br>
    <br>

    <table class="tftable" border="1">
      <tr>
        <th>#</th><th>Date</th><th>Category</th><th>Value</th>
      </tr>

      <tr v-for="(item, index) in items" :key="index">
        <td>{{index}}</td>
        <td>{{item['date']}}</td>
        <td>{{item['category']}}</td>
        <td>{{item['value']}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: "PaymentDisplay",

  props: {
    items: {
      type: Array,
      default: () => [],
    }
  },

  data() {
    return {

    }
  },

  methods: {

  },

  computed: {

  },
}
</script>

<style scoped lang="scss">

.paymentList {
  width: 800px;
  margin: 0 auto 0 auto;
}

.paymentList {
  width: 800px;
  margin: 0 auto 0 auto;
}

.paymentItem {

}

/**/

.tftable {
  font-size: 12px;
  width: 100%;
  border-width: 1px;
  border-collapse: collapse;
}

.tftable th {
  font-size: 12px;
  color: #36495E;
  border-width: 1px;
  padding: 8px;
  border-style: solid;
}

.tftable tr {
  //background-color:#d4e3e5;
}

.tftable td {
  font-size: 12px;
  border-width: 1px;
  padding: 8px;
  border-style: solid;
}

.tftable tr:hover {
  background-color: lightslategray;
}

</style>