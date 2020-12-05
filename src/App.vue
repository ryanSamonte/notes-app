<template>
  <div id="app">
    <sign-in></sign-in>
  </div>
</template>

<script>
import SignIn from './components/SignIn'

export default {
  name: 'App',
  components: {
    'sign-in': SignIn
  }
}
</script>

<style>
  @import './assets/style.css';
</style>
