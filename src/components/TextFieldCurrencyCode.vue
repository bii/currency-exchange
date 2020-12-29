<template>
  <v-text-field
      single-line
      outlined
      rounded
      :clearable="true"
      @input="onInput($event)"
      @click:clear="onClickClear()"
  >
  </v-text-field>
</template>

<script>
export default {
name: "TextFieldCurrencyCode",
  methods: {
    onInput: function (currencyCode) {
      if (currencyCode !== null && currencyCode.length > 1) {
        const currencyCodeUppercase = currencyCode.toUpperCase()
        this.$store.commit('exchange/setCurrencyCodeIn', currencyCodeUppercase)
        this.$store.dispatch('exchange/init/findCurrencyOptions', currencyCodeUppercase)
      }
    },
    onClickClear: function () {
      this.$store.dispatch('exchange/init/resetCurrencyOptions')
    }
  }
}
</script>
