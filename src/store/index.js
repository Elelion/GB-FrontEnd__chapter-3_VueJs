import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const localDB = {
  page1: [
    { id: 1, date: "26.03.2020", category: "Food", value: 155 },
    { id: 2, date: "27.04.2021", category: "Transport", value: 166 },
    { id: 3, date: "28.05.2022", category: "Rest", value: 177 },
  ],
  page2: [
    { id: 4, date: "26.03.2020", category: "Food", value: 255 },
    { id: 5, date: "27.04.2021", category: "Transport", value: 266 },
    { id: 6, date: "28.05.2022", category: "Rest", value: 277 },
  ],
  page3: [
    { id: 7, date: "26.03.2020", category: "Food", value: 355 },
    { id: 8, date: "27.04.2021", category: "Transport", value: 366 },
    { id: 9, date: "28.05.2022", category: "Rest", value: 377 },
  ],
  page4: [
    { id: 10, date: "26.03.2020", category: "Food", value: 455 },
    { id: 11, date: "27.04.2021", category: "Transport", value: 466 },
    { id: 12, date: "28.05.2022", category: "Rest", value: 477 },
  ],
}

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
    const newUniqIdObs = payload.filter((item) => {
      return state.paymentListIds.indexOf(item.id) < 0;
    });

    const uniqIds = newUniqIdObs.map((obj) => obj.id);
    state.paymentListIds.push(...uniqIds);

    // state.paymentList = payload;
    state.paymentList.push(...newUniqIdObs);
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
    paymentListIds: [],
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

    _fetchData({commit}, page) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const items = localDB[`page${page}`];
          resolve (items);
        }, 2000)
      }).then((res) => { commit('setPaymentListData', res)} )
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
