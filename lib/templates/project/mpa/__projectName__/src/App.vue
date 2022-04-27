<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
export default defineComponent({
  name: 'App',
});
</script>

<style lang="scss" scoped>
#app {
    width: 100%;
    height: 100%;
}
</style>
