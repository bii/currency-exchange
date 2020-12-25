export default {
    namespaced: true,
    state: {
        strDate: ''
    },
    getters: {
        getDate: (state) => {
            return state.strDate
        },
        getTodayDate: () => {
            const date = new Date()
            return new Date(date.getFullYear(), date.getMonth(), date.getDate())
        },
        getDateAsDate: (state) => {
            const date = new Date(state.strDate)
            return new Date(date.getFullYear(), date.getMonth(), date.getDate())
        },
    },
    mutations: {
        setDate: (state, payload) => {
            state.strDate = payload
        },
    }
}
