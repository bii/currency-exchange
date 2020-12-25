<template>
  <v-text-field
      :value="this.in ? getAmountIn : getAmountOut"
      :suffix="this.in ? getCurrencyCodeIn : getCurrencyCodeOut"
      :clearable="true"
      single-line
      outlined
      :disabled="disabled"
      @input="onAmountChange($event)"
  ></v-text-field>
</template>

<script>
export default {
  name: "TextFieldAmount",
  props: {
    amount: {
    },
    currencyCode: {
      type: String,
    },
    disabled: {
      type: Boolean,
      default: false
    },
    in: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onAmountChange: function (amount) {
     this.in
         ?
         this.$store.commit('exchange/setAmountIn', amount)
         :
         this.$store.commit('exchange/setAmountOut', amount)
      this.$store.dispatch('exchange/exchangeCurrency')
    }
  },
  computed: {
    getCurrencyCodeIn: function () {
      return this.$store.getters['exchange/getCurrencyCodeIn']
    },
    getAmountIn: function () {
      return this.$store.getters['exchange/getAmountIn']
    },
    getAmountOut: function () {
      return this.$store.getters['exchange/getAmountOut']
    },
    getCurrencyCodeOut: function () {
      return this.$store.getters['exchange/getCurrencyCodeOut']
    },
  }
}
</script>
