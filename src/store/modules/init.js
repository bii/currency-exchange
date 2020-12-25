import api from '@/store/modules/api'

export default {
    namespaced: true,
    modules: {
        api: api,
    },
    state: {
        fiatCurrencyItems: [],
        symbols: [],
        currencyOptions: []
    },
    getters: {
        getFiatCurrencyItems: state => {
            return state.fiatCurrencyItems
        },
        getSymbols: state => {
            return state.symbols
        },
        getCurrencyOptions: state => {
            return state.currencyOptions
        },
    },
    mutations: {
        setFiatCurrencyItems: (state, payload) => {
            state.fiatCurrencyItems.push(...payload)
        },
        setSymbols: (state, payload) => {
            state.symbols.push(...payload)
        },
        setCurrencyOptions: (state, payload) => {
            state.currencyOptions.push(...payload)
        },
        resetCurrencyOptions: state => {
            state.currencyOptions = []
        },
    },
    actions: {
        initializeFiatCurrencyItems: injectee => {
            const fiatCurrencyItems = []
            injectee.dispatch('exchange/init/api/getLatestExchangeRates', null, {root: true})
                .then(response => response.json())
                .then(result => {
                    const {rates, base} = result;
                    const items = Object.keys(rates)
                    fiatCurrencyItems.push(...items, base)
                    injectee.commit('exchange/init/setFiatCurrencyItems', fiatCurrencyItems, {root: true})
                })
        },
        initializeSymbols: injectee => {
            injectee.dispatch('exchange/init/api/getPricesForAllSymbolsPromise', null, {root: true})
                .then(response => response.json())
                .then(result => {
                    const symbols = result.map(item => item.symbol)
                    injectee.commit('exchange/init/setSymbols', symbols, {root: true})
                })
        },
        findCurrencyOptions: (injectee, payload) => {
            injectee.dispatch('exchange/init/resetCurrencyOptions', null, {root: true})
            let options = []
            let fiatOptions = []
            let cryptoOptions

            if (payload && payload.length > 1) {
                if (injectee.getters.getFiatCurrencyItems.indexOf(payload) !== -1) {
                    fiatOptions = injectee.getters.getFiatCurrencyItems
                }

                cryptoOptions = injectee.getters.getSymbols
                    .filter(symbol => symbol.startsWith(payload))
                    .map(symbol => symbol.slice(payload.length))

                options = fiatOptions.concat(cryptoOptions)
                options = [...new Set(options)]

                injectee.commit('exchange/init/setCurrencyOptions', options, {root: true})
            } else {
                injectee.commit('exchange/init/resetCurrencyOptions', [], {root: true})
                return
            }

        },
        resetCurrencyOptions: injectee => {
            injectee.commit('exchange/init/resetCurrencyOptions', [], {root: true})
        },

    }
}
