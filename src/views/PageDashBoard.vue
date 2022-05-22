<template>
  <v-container>
    <v-row>
      <v-col>
        <div class="text-xl-h3 text-sm-h4 text-xs-h6">
          My personal cost
        </div>
        <v-dialog
          v-model="dialog"
          width="500"
        >
          <template #activator="{ on }">
            <v-btn
              color="blue"
              v-on="on"
            >
              Add new payment <v-icon>mdi-plus</v-icon>
            </v-btn>
          </template>
          <v-card>
            <v-card-title class="text-h5 grey lighten-2">
              Add Payment
            </v-card-title>

            <v-card-text>
              <v-menu
                ref="menu"
                v-model="menu"
                :close-on-content-click="false"
                :return-value.sync="paymentData.date"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template #activator="{ on, attrs }">
                  <v-text-field
                    v-model="paymentData.date"
                    label="Picker in menu"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  />
                </template>
                <v-date-picker
                  v-model="paymentData.date"
                  no-title
                  scrollable
                >
                  <v-spacer />
                  <v-btn
                    text
                    color="primary"
                    @click="menu = false"
                  >
                    Cancel
                  </v-btn>
                  <v-btn
                    text
                    color="primary"
                    @click="$refs.menu.save(paymentData.date)"
                  >
                    OK
                  </v-btn>
                </v-date-picker>
              </v-menu>
              <v-select
                v-model="paymentData.category"
                :items="cats"
                label="Category"
              />
              <v-text-field
                v-model.number="paymentData.value"
                label="Cost"
                :rules="rules"
                hide-details="auto"
              />
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn
                color="primary"
                text
                @click="addPayment"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6">
        <v-data-table
          :headers="headers"
          :items="getPaymentList"
          :items-per-page="10"
          :page.sync="page"
          class="elevation-1"
          hide-default-footer
          @page-count="pageCount = $event"
        />
        <v-pagination
          v-model="page"
          :length="pageCount"
        />
      </v-col>
      <v-col cols="6">
        <doughnut />
      </v-col>
    </v-row>
    <h2 class="subtitle">
      Total: {{ getFullPaymentValue }}
    </h2>
    <h1>DashBoard</h1>
    <button>Left</button>
    <button>Right</button>
  </v-container>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

import AddPayment from "../components/AddPayment";
import PaymentsDisplay from "../components/PaymentsDisplay.vue";
import ButtonModal from "../components/ButtonModal.vue";
import Doughnut from "../components/Doughnut.vue";
export default {
  name: "PageDashboard",
  components: {
    Doughnut,
    AddPayment,
    PaymentsDisplay,
    ButtonModal
  },
  data() {
    return {
       rules: [
        value => !!value || 'Required.',
        value => (value && value.length >= 1) || 'Min 1 characters',
      ],
      page: 1,
      pageCount: 0,
      settings: {},
      paymentData: {
        date: "",
        category: "",
        value: ""
      },
      cats: ["Food", "Transport", "Education", "House", "Internet"],
      headers: [
        { text: "Nr.", value: "value", sortable: true },
        {
          text: "Date",
          align: "start",
          sortable: false,
          value: "date"
        },
        { text: "Category", value: "category", sortable: true },
        { text: "Value", value: "value", sortable: true }
      ]
    };
  },
  computed: {
    ...mapGetters(["getPaymentList", "getFullPaymentValue"])
  },
  methods: {
    ...mapMutations(["setPaymentListData"]),
    actionEmit() {
      this.addBtnIsShown = false;
    },
    addPayment() {
      const {date, amount, category} = this
      this.$store.commit("addDataToPaymentList", {date, value:amount, category});
    },
    goTopage(pageName) {
      this.$router.push({
        name: pageName
      });
    }
  },
  openAuth() {
    this.isModalShow = true;
    this.settings = { name: "auth", headerName: "Auth User" };
  },
  openModal() {
    this.$modal.show("AddPayment", "add Payment");
  },
  onSave() {}
};
</script>

<style lang="scss" scoped>
.add-btn {
  width: 120px;
  height: 30px;
  background-color: #3bba9f;
  border: 1px solid #3f95cd;
  border-radius: 3px;
}
.modal-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 98;
  background-color: rgba(0, 0, 0, 0.3);
  height: 100vh;
}
.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 99;
  height: 160px;
  max-width: 400px;
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
}
</style>
