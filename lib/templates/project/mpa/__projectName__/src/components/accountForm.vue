<template>
  <div class="account-form">
    <img
      src="@/assets/logo-blue.png"
      style="height:60px;"
    >
    <h1 style="font-size: 28px;padding:30px 0 50px;">
      多中心智能医学信息技术平台
    </h1>
    <el-form
      ref="form"
      class="account-form-form"
      label-width="95px"
      :rules="rules"
      :model="formData"
    >
      <template v-if="!isResetPwd">
        <el-form-item
          label="姓名"
          prop="name"
        >
          <el-input
            v-model="formData.name"
            placeholder="请输入真实姓名"
            clearable
          />
        </el-form-item>
        <el-form-item
          label="单位"
          prop="organization"
        >
          <el-select
            v-model="formData.organization"
            placeholder="请选择单位"
            value-key="organizationCode"
          >
            <el-option 
              v-for="item in organizationsResult" 
              :key="item.organizationCode"
              :value="item"
              :label="item.name"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="部门"
          prop="department"
        >
          <el-select
            v-model="formData.department"
            placeholder="请选择部门"
            value-key="DEPARTMENTCODE"
          >
            <el-option
              v-for="item in departments"
              :key="item.DEPARTMENTCODE"
              :value="item"
              :label="item.NAME"
              :disabled="Number(item.disable) === 1"
            />
          </el-select>
          <el-tooltip
            content="仅提供开放合作的部门，如有需要请联系院方管理员。"
            placement="right"
          >
            <i class="account-form-icon el-icon-info" />
          </el-tooltip>
        </el-form-item>
        <el-form-item
          label="手机号码"
          prop="phone"
        >
          <el-input
            v-model.number="formData.phone"
            placeholder="请输入手机号码"
            clearable
          />
        </el-form-item>
      </template>
      <el-form-item
        label="邮箱"
        prop="email"
      >
        <el-input
          v-model="formData.email"
          placeholder="请输入邮箱地址"
          clearable
        />
      </el-form-item>
      <el-form-item
        label="图形验证码"
        prop="verifyCode"
        size="medium"
      >
        <el-input 
          v-model="formData.verifyCode"
          placeholder="请输入图形验证码"
          clearable
        />
        <div
          class="verify-box"
          @click.stop="changeCode()"
        >
          <DrawVerifyCode :identify-code="verifyCode" />
        </div>
      </el-form-item>
      <el-form-item
        label="邮箱验证码"
        prop="emailCode"
        size="medium"
      >
        <el-input 
          v-model="formData.emailCode"
          class="account-form-email-verify"
          placeholder="请输入邮箱验证码"
          clearable
        >
          <span 
            slot="append"
            style="cursor:pointer;"
            @click="sendEmail"
          >{{ buttoncotent }}</span>
        </el-input>
      </el-form-item>
      <el-form-item
        :label="`输入${isResetPwd ? '新': ''}密码`"
        prop="passWord"
        size="medium"
      >
        <el-tooltip
          placement="right"
          :disabled="!showtip"
        >
          <div slot="content">
            <ol>
              <li>• 长度为8~14个字符</li>
              <li>• 字母/数字以及特殊符号至少包含两种组合</li>
              <li>• 不允许有空格、中文</li>
            </ol>
          </div>
          <el-input 
            v-model="formData.passWord"
            type="password"
            :placeholder="`请输入${isResetPwd ? '新': ''}密码`"
            show-password
            clearable
          />
        </el-tooltip>
      </el-form-item>
      <el-form-item
        :label="`确认${isResetPwd ? '新': ''}密码`"
        prop="checkPassWord"
        size="medium"
      >
        <el-input 
          v-model="formData.checkPassWord"
          type="password"
          :placeholder="`请确认${isResetPwd ? '新': ''}密码`"
          show-password
          clearable
        />
      </el-form-item>
    </el-form>
    <slot name="operations" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref, watch } from '@vue/composition-api';
import api from '@/api';
import { validatePassword } from '@/common/utils/util';
import DrawVerifyCode from '@components/drawVerifyCode.vue';
import { ElForm } from 'element-ui/types/form';
import { Department, Organization, ValidatorCB } from '@/common/types';

export default defineComponent({
  name: 'AccountForm',
  components: { DrawVerifyCode },
  props: {
    isResetPwd: { type: Boolean, default: false},
  },
  setup(props, { refs }) {    
    const formData = ref({
      name: '',
      organization: {} as Organization | {}, // 包括name和organizationCode
      department: {} as Department | {}, // 包括NAME和DEPARTMENTCODE
      phone: '',
      email: '',
      emailCode: '',
      passWord: '',
      verifyCode: '',
      checkPassWord: '',
    });
    const verifyCode = ref(''); // 图形验证码
    const buttoncotent = ref('发送验证码');//邮箱验证码发送按钮
    const totalTime = ref(60);//倒计时时间
    const canClick = ref(true);//按钮是否能够点击
    const showtip = ref(true);//是否显示密码格式提示
    const organizations = ref<{ 
      NAME: string, 
      ORGANIZATIONCODE: string, 
    }[]>([]); // 单位
    const departments = ref<{ 
      NAME: string, 
      DEPARTMENTCODE: string, 
      disable: boolean
    }[]>([]); // 部门

    const rules = {
      name: [
        { required: true, message: '请输入真实姓名', trigger: 'change' },
      ],
      organization: [
        { required: true, message: '请选择单位', trigger: 'change' },
      ],
      department: [
        { required: true, message: '请选择部门', trigger: 'change' },
      ],
      phone: [
        { required: true, message: '请输入手机号码', trigger: 'change' },
        { pattern: /^1[34578]\d{9}$/, message: '请输入正确的手机号码', trigger: 'blur' },
      ],
      email: [
        { required: true, message: '请输入邮箱地址', trigger: 'change' },
        { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' },
      ],
      verifyCode: [
        { required: true, message: '请输入图形验证码', trigger: 'change' },
        { validator: verifyCodeValidator, message: '请输入正确的图形验证码', trigger: 'blur' },
      ],
      emailCode: [
        { required: true, message: '请输入邮箱验证码', trigger: 'change' },
      ],
      passWord: [
        { required: true, message: '请输入密码', trigger: 'change' },
        { validator: passWordValidator, trigger: ['change', 'blur'] },
      ],
      checkPassWord: [
        { required: true, message: '请确认密码', trigger: 'change' },
        { validator: checkPassWordValidator, trigger: 'blur' },
      ],
    };
    
    const organizationsResult = computed(() => 
      organizations.value.map(item => ({
        name: item.NAME.trim(),
        organizationCode: item.ORGANIZATIONCODE.trim(),
      })),
    );

    onMounted(() => {
      changeCode();
      !props.isResetPwd && getOrganizations();
    });
    watch(formData.value.organization, () => {
      formData.value.department = {};
      getDepartments();
    });

    function changeCode() {
      const verifyCodes = '1234567890';
      verifyCode.value = '';
      verifyCode.value = randCode(verifyCodes, 4);
      function randCode(characters: string, length: number) {
        //length为所需长度，characters为所包含的所有字符，默认为字母+数字。
        const splitCharacters = characters.split('');//分割字符。
        let result = '';//返回的结果。 
        while (result.length < length) {
          var n = Math.floor(Math.random() * splitCharacters.length + 1) - 1;
          result += splitCharacters[n];
        }
        return result;
      }
    }
    async function getOrganizations() {
      const { data: { res } } = await api.getOrganizations();
      organizations.value = res;
    }
    async function getDepartments() {
      const { data: { res } } = await api.getDepartments();
      departments.value = res;
    }

    function sendEmail() {
      if (!canClick.value) {
        return;
      }
      (refs.form as ElForm).validateField('email', async (err) => {
        if (!err) {
          await api.sendEmail({
            email: formData.value.email,
            checkStatus: 0, // 0 - 无须校验该邮箱是否已注册
          });
          canClick.value = false;
          let time = totalTime.value;//倒计时时间
          buttoncotent.value = time + 's后重试';
          let clock = window.setInterval(() => {
            --time;
            buttoncotent.value = time + 's后重试';
            if (time < 0) {
              window.clearInterval(clock);
              buttoncotent.value = '发送验证码';
              time = totalTime.value;
              canClick.value = true;  //这里重新开启
            }
          }, 1000);
        }
      });
    }
    function $validate() {
      return (refs.form as ElForm).validate();
    }
    function $getFormData() {
      return formData.value;
    }

    return {
      formData,
      verifyCode,
      buttoncotent,
      totalTime,
      canClick,
      showtip,
      organizations,
      departments,
      rules,
      organizationsResult,
      changeCode,
      sendEmail,
      $validate,
      $getFormData,
    };

    function verifyCodeValidator(_: unknown, v: string, cb: ValidatorCB) {
      if (v.trim() !== verifyCode.value) { 
        cb(new Error()); 
      } else { 
        cb(); 
      }
    }
    function passWordValidator(_: unknown, v: string, cb: ValidatorCB) {
      if (v.indexOf(' ') !== -1) {
        //判断字符串是否有空格
        showtip.value = true;
        cb(new Error('请确认输入密码符合规则'));
      } else if (!validatePassword(v)) {
        showtip.value = true;
        cb(new Error('请确认输入密码符合规则'));
      } else {
        showtip.value = false;
        cb();
      }
    }
    function checkPassWordValidator(_: unknown, v: string, cb: ValidatorCB) {
      if (formData.value.passWord !== v) { 
        cb(new Error('请确认两次输入的密码相同'));
      } else { 
        cb();
      }
    }
  },
  
});
</script>

<style lang="scss" scoped>
@import '@/assets/css/var.scss';

.account-form{
    text-align: center;
    padding-top: 100px;
    &-form {
        width: 552px;
        margin: 0 auto;
        ::v-deep .el-input__inner {
            width: 457px;
        }
    }
    &-icon {
        float: right;
        margin-right: -20px;
        margin-top: 14px; 
    }
    &-email-verify ::v-deep {
        .el-input__inner{
            width: 341px;
            border-right: none;
        }
        .el-input-group__append{
            width: 115px;
            color: #fff;
            background-color: $color-primary;
            border-color: $color-primary;
        }
    }
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
.verify-box {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 1;
    width: 116px; /*设置图片显示的宽*/
    height: 36px; /*图片显示的高*/
    background: #e2e2e2;
    margin: 0px;
    cursor: pointer;
}
</style>