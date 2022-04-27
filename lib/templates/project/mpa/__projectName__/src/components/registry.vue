<template>
  <div class="registry">
    <AccountForm ref="accountForm">
      <el-button
        slot="operations"
        type="primary"
        class="registry-btn"
        @click="signIn"
      >
        注册
      </el-button>
    </AccountForm>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import md5 from 'md5';
import api from '@/api';
import AccountForm from './accountForm.vue';
import { AccountFormInst, Department, Organization } from '@/common/types';

export default defineComponent({
  name: 'Registry',
  components: { AccountForm },
  setup(_, context) {
    const refs = context.refs;
    const { $confirm, $router } = context.root;
    async function signIn() {
      await (refs.accountForm as AccountFormInst).$validate();
      const formData = (refs.accountForm as AccountFormInst).$getFormData();
      const {
        name,
        organization,
        department,
        phone,
        email,
        emailCode,
        passWord,
      } = formData;
      await api.register({
        name,
        organization: (organization as Organization).name,
        organizationCode: (organization as Organization).organizationCode,
        department: (department as Department).NAME,
        departmentCode: (department as Department).DEPARTMENTCODE,
        phone,
        email,
        emailCode,
        passWord: md5(passWord),
      });
      await $confirm(
        '注册申请已提交，管理员审核结果将以邮件形式发送，请关注注册邮箱。', 
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        },
      );
      $router.push({ path: '/login' });
    }
    return {
      signIn,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/css/var.scss';

.registry{
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