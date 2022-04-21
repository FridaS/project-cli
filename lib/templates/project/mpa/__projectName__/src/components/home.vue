<template>
  <div class="home">
    <HeaderMenu />
    <Platforms />
  </div>
</template>

<script>
import HeaderMenu from '@common/components/headerMenu';
import Platforms from './platforms';

export default {
  name: 'Home',
  components: { HeaderMenu, Platforms },
  data() {
    return {

    };
  },
};
</script>

<style lang="scss" scoped>

</style>