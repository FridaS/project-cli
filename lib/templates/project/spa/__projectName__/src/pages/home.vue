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

<script>
export default {
  name: '',
  data() {
    return {

    };
  },
  methods: {
    jump(page) {
      this.$router.push({ path: `/${page}-test` });
    },
  },
};
</script>

<style lang="scss" scoped>
.btn{
    border-right: 1px solid;
    padding: 0 10px 0 0;
    border-radius: 0;
}
</style>