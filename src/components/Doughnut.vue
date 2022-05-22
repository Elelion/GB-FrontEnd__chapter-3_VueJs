<template>
  <v-col class="canvas">
    Graph
    <canvas ref="canvas" width="200" height="200"></canvas>
  </v-col>
</template>

<script>
import { mapGetters } from "vuex";
import { Doughnut } from "vue-chartjs";
export default {
  extends: Doughnut,
  data() {
    return {
      categoriesArr: [],
      quantityArr: [],
      details: [],
    };
  },
  computed: {
    ...mapGetters(["getCategorylist", "getPaymentList"]),
  },
  methods: {
    getChartData() {
      this.getCategorylist.forEach((el) => {
        let quantity = this.getPaymentList.filter(
          (item) => item.categoryList === el
        );
        this.quantityArr.push(quantity.length);
        this.details.push({ quantity: quantity.length, name: el });
      });
    },
  },
  mounted() {
    this.getChartData();
    this.renderChart(
      {
        labels: [...this.getCategorylist],
        datasets: [
          {
            label: "# of Votes",
            data: [...this.quantityArr],
            backgroundColor: [
              "#EF9A9A",
              "#303F9F",
              "#26A69A",
              "#00E5FF",
              "#C6FF00",
              "#FF6F00",
              "#BF360C",
              "#B388FF",
            ],
            borderColor: [
              "#EF9A9A",
              "#303F9F",
              "#26A69A",
              "#00E5FF",
              "#C6FF00",
              "#FF6F00",
              "#BF360C",
              "#B388FF",
            ],
            borderWidth: 1,
          },
        ],
      },
      { responsive: true, maintainAspectRatio: false }
    );
  },
};
</script>

<style lang="scss">
.canvas {
  width: 40vw !important;
  min-height: 400px !important;
  @media (max-width: 960px) {
    width: 100%;
  }
}
</style>
