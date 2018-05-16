<template>
  <div id="app">
    <head-menu></head-menu>
    <div class="all-box">
      <router-view/>
    </div>
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
   .all-box {
      padding-top: 61px;
      margin-top: -61px;
      box-sizing: border-box;
      height: 100%;
   }
 }
</style>
