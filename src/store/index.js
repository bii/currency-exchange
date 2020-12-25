import Vue from 'vue'
import Vuex from 'vuex'
import exchange from '@/store/modules/exchange'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        exchange: exchange,
    },
})

export default store
