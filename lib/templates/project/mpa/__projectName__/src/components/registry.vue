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

<script>
import md5 from 'md5';
import api from '@/api';
import AccountForm from './accountForm';

export default {
  name: 'Registry',
  components: { AccountForm },
  data() {
    return {};
  },
  methods: {
    async signIn() {
      await this.$refs.accountForm.$validate();
      const formData = this.$refs.accountForm.$getFormData();
      let {
        name,
        organization,
        department,
        phone,
        email,
        emailCode,
        passWord,
      } = formData;
      api.register({
        name,
        organization: organization.name,
        organizationCode: organization.organizationCode,
        department: department.NAME,
        departmentCode: department.DEPARTMENTCODE,
        phone,
        email,
        emailCode,
        passWord: md5(passWord),
      }).then(() => {
        this.$confirm('注册申请已提交，管理员审核结果将以邮件形式发送，请关注注册邮箱。', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(() => {
          this.$router.push({ path: '/login' });
        }).catch(() => {});
      });
    },
  },
};
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