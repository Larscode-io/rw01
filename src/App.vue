<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/i">Inschrijven Nieuwsbrief</router-link> |
      <router-link to="/j">Inschrijven Uitspraak</router-link> |
      <router-link to="/x">Afmelden & Opvragen wachtwoord</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="stylus">
#app
  font-family 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50
  margin-top 60px
</style>
