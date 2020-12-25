<template>
  <v-autocomplete
      outlined
      rounded
      :items="getOptions"
      :hide-no-data="true"
      :label="`(${getOptions.length})`"
      @change="onCurrencyCodeChanged($event)"
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
  methods: {
    onCurrencyCodeChanged: function (currencyCode) {
      this.$store.commit('exchange/setCurrencyCodeOut', currencyCode)
      this.$store.dispatch('exchange/exchangeCurrency')
    }
  }
}
</script>
