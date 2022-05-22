import { Promise } from 'core-js'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
       paymentsList: [],
       categoryList: []
    },
    mutations: {
        setPaymentsListData (state, payload) {
            state.paymentsList = payload
        },

        addDataToPaymentList (state, payload) {
            state.paymentsList.push(payload)
        },

        setCategories (state, payload) {
            if(!Array.isArray(payload)){
                payload = [payload]
            }
            state.categoryList= payload
        }

    },
    getters: {
        getPaymentList: state => state.paymentsList,
        getFullPaymentValue: state => {
            return state.paymentsList.reduce((acc, cur)=> acc + Number(cur.value), 0)
        },
        getCategorylist: state => state.categoryList
    },
    actions: {
        deleteItem (commit, payload) {
            console.log(payload)
         },
        fetchData ({ commit }) {
            return new Promise((resolve) => {
            setTimeout(() => {
                const items = []
                for (let i = 1; i < 105; i++) {
                items.push({
                    date: '13.05.2021',
                    category: 'Education',
                    value: i
                })
                }
                resolve(items)
            }, 2000)
            })
            .then(res => {
                commit('setPaymentsListData', res)
            })
        },

        loadCategories({commit}){
            return new Promise((resolve) => {
                setTimeout(()=>{
                    resolve(['Food', 'Transport', 'Cloth', 'Edication', 'Mobile', 'Sport', 'House', 'Unsorted'])
                }, 1000)
            }).then(res=> {
                commit('setCategories', res)
            })
        }
    }
})
