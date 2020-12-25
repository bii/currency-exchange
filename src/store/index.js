import Vue from 'vue'
import Vuex from 'vuex'
import init from '@/store/modules/init'
import exchange from '@/store/modules/exchange'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        init: init,
        exchange: exchange,
    },
})

export default store
