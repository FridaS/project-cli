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

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import AccountForm from './accountForm.vue';
import api from '@/api';
import { AccountFormInst } from '@/common/types';

export default defineComponent({
  name: 'ResetPassword',
  components: { AccountForm },
  setup(_, context) {
    async function reset() {
      const refs = context.refs;
      const { $confirm, $router } = context.root;

      await (refs.accountForm as AccountFormInst).$validate();
      const formData = (refs.accountForm as AccountFormInst).$getFormData();
      const { email, emailCode, passWord } = formData;
      await api.resetPwd({
        email, 
        verificationCode: emailCode, 
        newPassword: passWord,
      });
      await $confirm('密码修改成功，请重新登录！', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'success',
      });
      await $router.push({ path: '/' }); 
    }
    return {
      reset,
    };
  },
});
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