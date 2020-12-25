const EXCHANGE_RATES_API_BASE_ENDPOINT = 'https://api.exchangeratesapi.io'
const BINANCE_API_BASE_ENDPOINT = 'https://api.binance.com'

export default {
    namespaced: true,
    actions: {
        getLatestExchangeRates: () => {
            return fetch(`${EXCHANGE_RATES_API_BASE_ENDPOINT}/latest`)
        },
        getLatestRatesByBasePromise: (injectee, base) => {
            return fetch(`${EXCHANGE_RATES_API_BASE_ENDPOINT}/latest?base=${base}`)
        },
        getPricesForAllSymbolsPromise: () => {
            return fetch(`${BINANCE_API_BASE_ENDPOINT}/api/v3/ticker/price`)
        },
        getPriceBySymbolPromise: (injectee, symbol) => {
            return fetch(`${BINANCE_API_BASE_ENDPOINT}/api/v3/ticker/price?symbol=${symbol}`)
        },
    }
}
