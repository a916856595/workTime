<template>
  <div id="app">
    <head-menu></head-menu>
    <router-view/>
  </div>
</template>

<script>
import headMenu from './components/menu/head_menu.vue';

export default {
  'name': 'App',
  'components': {
    headMenu
  }
}
</script>

<style lang="less">
 body {
   margin: 0;
 }
</style>
