<template>
  <div class="home">
    <div class="g-menu">
      <el-button
        class="btn"
        type="text"
        @click="jump('a')"
      >
        a test page
      </el-button>
      <el-button
        type="text"
        @click="jump('b')"
      >
        b test page
      </el-button>
    </div>
    <div class="g-body">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  setup(_, context) {
    const router = context.root.$router;

    function jump(page: string) {
      router.push({ path: `/${page}-test` });
    }
    return {
      jump,
    };
  },
});
</script>

<style lang="scss" scoped>
.btn{
    border-right: 1px solid;
    padding: 0 10px 0 0;
    border-radius: 0;
}
</style>