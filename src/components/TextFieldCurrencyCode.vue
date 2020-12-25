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
      this.$store.commit('exchange/setCurrencyCodeIn', currencyCode)
      this.$store.dispatch('init/findCurrencyOptions', currencyCode)
    },
    onClickClear: function () {
      this.$store.dispatch('init/resetCurrencyOptions')
    }
  }
}
</script>
