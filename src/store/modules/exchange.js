/* eslint-disable no-unused-vars */
import date from '@/store/modules/date'
import api from '@/store/modules/api'
import init from '@/store/modules/init'

const DECIMAL_PLACES = 5

export default {
    namespaced: true,
    modules: {
        date: date,
        api: api,
        init: init,
    },
    state: {
        currencyCodeIn: '',
        currencyCodeOut: '',
        amountIn: 0,
        amountOut: 0,
        latestRatesData: [],
    },
    getters: {
        getAmountIn: state => {
            return state.amountIn
        },
        getAmountOut: state => {
            return state.amountOut
        },
        getCurrencyCodeIn: state => {
            return state.currencyCodeIn
        },
        getCurrencyCodeOut: state => {
            return state.currencyCodeOut
        },
        getLatestRatesData: state => {
            return state.latestRatesData
        },
        exchange: (state, getters) => (amountIn, exchangeRate) => {
            const amountOut = getters
                .roundOff(
                    parseFloat(amountIn) * parseFloat(exchangeRate),
                    DECIMAL_PLACES)
            return amountOut
        },
        roundOff: () => (num, places) => {
            const x = Math.pow(10, places)
            return Math.round(num * x) / x
        },
        isCurrencyCodeInFiat: (state, getters) => {
            return getters['init/getFiatCurrencyItems'].indexOf(state.currencyCodeIn) !== -1
        },
        isCurrencyCodeOutFiat: (state, getters) => {
            return getters['init/getFiatCurrencyItems'].indexOf(state.currencyCodeOut) !== -1
        }
    },
    mutations: {
        setAmountIn: (state, payload) => {
            state.amountIn = payload
        },
        setAmountOut: (state, payload) => {
            state.amountOut = payload
        },
        setCurrencyCodeIn: (state, payload) => {
            state.currencyCodeIn = payload
        },
        setCurrencyCodeOut: (state, payload) => {
            state.currencyCodeOut = payload
        },
        pushToLatestRatesData: (state, payload) => {
            state.latestRatesData.push(payload)
        },
        removeFromLatestRatesData: (state, currencyCodeIn) => {
            state.latestRatesData.filter(item => item.base !== currencyCodeIn)
        },
    },
    actions: {
        exchangeCurrency: (injectee) => {
            const amountIn = injectee.state.amountIn
            if (!isNaN(amountIn)) {
                const currencyCodeIn = injectee.state.currencyCodeIn
                const currencyCodeOut = injectee.state.currencyCodeOut
                if (currencyCodeIn === currencyCodeOut) {
                    injectee.commit('exchange/setAmountOut', amountIn, {root: true})
                    return
                }

                let amountOut = 0

                if (injectee.getters.isCurrencyCodeInFiat) {
                    if (injectee.getters.isCurrencyCodeOutFiat) {
                        const latestExchangeRatesData = injectee.getters.getLatestRatesData
                            .find(item => item.base === currencyCodeIn)

                        if (latestExchangeRatesData) {
                            const {date, rates} = latestExchangeRatesData

                            injectee.commit('exchange/date/setDate', date, {root: true})
                            const dateDatePart = injectee.getters['date/getDateAsDate']
                            const todayDatePart = injectee.getters['date/getTodayDate']

                            if (dateDatePart < todayDatePart) {
                                injectee.dispatch('exchange/api/getLatestRatesByBasePromise', currencyCodeIn, {root: true})
                                    .then(response => response.json())
                                    .then(result => {
                                        injectee.commit('exchange/removeFromLatestRatesData', currencyCodeIn, {root: true})
                                        injectee.commit('exchange/pushToLatestRatesData', result, {root: true})
                                        const {rates} = result
                                        amountOut = injectee.getters.exchange(amountIn, rates[currencyCodeOut])
                                        injectee.commit('exchange/setAmountOut', amountOut, {root: true})
                                    })
                            } else {
                                amountOut = injectee.getters.exchange(amountIn, rates[currencyCodeOut])
                                injectee.commit('exchange/setAmountOut', amountOut, {root: true})
                            }
                        } else {
                            injectee.dispatch('exchange/api/getLatestRatesByBasePromise', currencyCodeIn, {root: true})
                                .then(response => response.json())
                                .then(result => {
                                    injectee.commit('exchange/pushToLatestRatesData', result, {root: true})
                                    const {rates} = result
                                    const amountOut = injectee.getters.exchange(amountIn, rates[currencyCodeOut])
                                    injectee.commit('exchange/setAmountOut', amountOut, {root: true})
                                })
                        }
                    } else {
                        injectee.dispatch('exchange/exchangeBySymbol', null, {root: true})
                    }
                } else {
                    injectee.dispatch('exchange/exchangeBySymbol', null, {root: true})
                }
            }
        },
        exchangeBySymbol: injectee => {
            const currencyCodeIn = injectee.getters.getCurrencyCodeIn
            const currencyCodeOut = injectee.getters.getCurrencyCodeOut
            const amountIn = injectee.getters.getAmountIn

            const symbol = currencyCodeIn + currencyCodeOut
            injectee.dispatch('exchange/api/getPriceBySymbolPromise', symbol, {root: true})
                .then(response => response.json())
                .then(result => {
                    const {price} = result
                    const amountOut = injectee.getters.exchange(amountIn, price)
                    injectee.commit('exchange/setAmountOut', amountOut, {root: true})
                })
        }

    }
}
