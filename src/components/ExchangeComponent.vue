<template>
  <v-app>
    <v-app-bar app></v-app-bar>
    <v-main>
      <v-container>
        <v-row>
          <v-col
              cols="6"
              md="6"
              sm="6"
          >
            <text-field-currency-code/>
            <text-field-amount :in="true"/>
          </v-col>
          <v-col
              cols="6"
              md="6"
              sm="6"
          >
            <auto-complete-currency-code/>
            <text-field-amount :disabled="true"/>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import TextFieldAmount from '@/components/TextFieldAmount'
import TextFieldCurrencyCode from '@/components/TextFieldCurrencyCode'
import AutoCompleteCurrencyCode from '@/components/AutoCompleteCurrencyCode'

export default {
  name: "ExchangeComponent",
  components: {
    TextFieldAmount,
    TextFieldCurrencyCode,
    AutoCompleteCurrencyCode
  },
  methods: {
    init: function () {
      this.$store.dispatch('init/initializeFiatCurrencyItems')
      this.$store.dispatch('init/initializeSymbols')
    }
  },
  mounted() {
    this.init()
  },
}
</script>
