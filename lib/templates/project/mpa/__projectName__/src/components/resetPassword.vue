<template>
  <div class="resetPassword">
    <AccountForm
      ref="accountForm"
      :is-reset-pwd="true"
    >
      <el-button
        slot="operations"
        type="primary"
        class="resetPassword-btn"
        @click="reset"
      >
        重置密码
      </el-button>
    </AccountForm>
  </div>
</template>

<script>
import AccountForm from './accountForm';
import api from '@/api';

export default {
  name: 'ResetPassword',
  components: { AccountForm },
  data() {
    return {
            
    };
  },
  methods: {
    async reset() {
      await this.$refs.accountForm.$validate();
      const formData = this.$refs.accountForm.$getFormData();
      let { email, emailCode, passWord } = formData;
      api.resetPwd({
        email, 
        verificationCode: emailCode, 
        newPassword: passWord,
      }).then(() => {
        this.$confirm('密码修改成功，请重新登录！', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'success',
        }).then(() => { 
          this.$router.push({ path: '/' }); 
        }).catch(() => {});
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.resetPassword {
    height: 100%;
    background-color: #fff;
    &-btn {
        outline: none;
        color: #fff;
        border-radius: 3px;
        cursor: pointer;
        width: 360px;
        height: 45px;
        font-size: 15px;
        margin-top: 10px;
    }
}
</style>