<template>
  <v-autocomplete
      outlined
      rounded
      :items="getOptions"
      :hide-no-data="true"
      :label="`(${getOptions.length})`"
      @change="onCurrencyCodeChanged($event)"
      :value="getOptions.length > 0 && getOptions[0]"
  ></v-autocomplete>
</template>

<script>
export default {
  name: "AutoCompleteCurrencyCode",
  computed: {
    getOptions: function () {
      return this.$store.getters['exchange/init/getCurrencyOptions']
    }
  },
  updated() {
    const options = this.getOptions
    if (options.length > 0) {
      this.$store.commit('exchange/setCurrencyCodeOut', options[0])
    }
  },
  methods: {
    onCurrencyCodeChanged: function (currencyCode) {
      this.$store.commit('exchange/setCurrencyCodeOut', currencyCode)
      this.$store.dispatch('exchange/exchangeCurrency')
    }
  }
}
</script>
