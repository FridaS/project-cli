<template>
  <div class="home">
    <HeaderMenu />
    <Platforms />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import HeaderMenu from '@common/components/headerMenu.vue';
import Platforms from './platforms.vue';

export default defineComponent({
  name: 'Home',
  components: { HeaderMenu, Platforms },
  setup() {

  },
});
</script>

<style lang="scss" scoped>

</style>