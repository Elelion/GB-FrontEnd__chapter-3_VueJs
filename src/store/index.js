import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

/**
 * все мутатции - синхронны
 * только мутации реактивно изменют состояние нашего хранилища
 *
 * мутация - это некий объект в котором у нас есть ф-ция и которая принмает
 * state и payload, payload - аргумент в котором мы вызываем мутацию
 *
 * мутации нужны для передачи данных из вне в хранилище
 */
const mutations = {
  setPaymentListData(state, payload) {
    state.paymentList = payload;
  },

  addDataToPaymentsList(state, payload) {
    state.paymentList.push(payload);
  },

  editPaymentListFirstElement(state, payload) {
    // 0 - нулевой елемент массива
    Vue.set(state.paymentList, 0, payload);
  },

  setCategories(state, payload) {
    state.categoryList = payload;
  },
};

/**
 * getters - для получения данных
 */
const getters = {
  getPaymentsListData: state => state.paymentList,
  getFullPaymentValue: state => {
    return state.paymentList.reduce((res, cur) => res + cur.value, 0)
  },

  getCategoryList: state => state.categoryList,
}

export default new Vuex.Store({
  state: {
    paymentList: [],
    categoryList: [],
  },

  actions: {
    fetchData({commit}) {
      return new Promise((resolve => {
        setTimeout(() => {
          const items = [];

          for (let i = 0; i <= 5; i++) {
            items.push({
              date: "28.03.2020",
              category: "Food",
              value: i,
              id: Math.floor(Math.random() * Math.floor(Math.random() * Date.now()))
            })
          } resolve(items);
        }, 2000)
      })).then(res => { commit('setPaymentListData', res); })
    },

    // кладем сюда наши категории
    fetchCategoryList({commit}) {
      return new Promise((resolve => {
        setTimeout(() => {
          resolve([

          ]);
        }, 1000)
      }).then(res => { commit('setCategories', res); })
      )
    },

    // шаблон
    /*
    fetchTemplate({commit}) {
      return new Promise((resolve => {
        setTimeout(() => {
          resolve([

          ]);
        }, 1000)
      }).then(res => { commit(''); })
      )
    },
   */
  },

  mutations,
  getters,
})
