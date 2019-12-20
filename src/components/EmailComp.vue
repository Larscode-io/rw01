<template>
<div class="hello">
  <h1>prop: {{ msg }} {{ label }}</h1>
  <v-text-field v-model="formulier.email" :rules="emailRules" :autofocus="true" :validate-on-blur="true" :hint="bio" label="E-mail" required @blur="$v.formulier.email.$touch()"></v-text-field>
  <div v-if="$v.formulier.email.$error">
    <p v-if="!$v.formulier.email.email">e-mail waarschijnlijk ongeldig</p>
  </div>
</div>
</template>
<script>
import { required, email } from 'vuelidate/lib/validators'
export default {
  name: 'EmailComp',
  validations: {
    formulier: {
      email: {
        required,
        email
      }
    }
  },
  props: {
    msg: {
      type: String,
      required: true
    },
    label: String
  },
  data: () => ({
    formulier: {
      msg: 'MagWegLater',
      email: '',
      wachtw: '',
      checkbox: '',
      checknl: false,
      checkfr: false,
      checkde: false,
      valid: false,
      fullname: '',
      selecttaal: {
        taal: '',
        abbr: ''
      },
    },
    bio: 'Uw e-mailadres zal enkel worden gebruikt voor het versturen van die nieuwsbrief. Wij geven het niet aan derden.',
    emailRules: [
      v => !!v || 'E-mail is het (enige) verplichtte gegeven',
      // v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail moet geldig zijn'
    ],
  }),
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
h3
  margin 40px 0 0

ul
  list-style-type none
  padding 0

li
  display inline-block
  margin 0 10px

a
  color #42b983
</style>
