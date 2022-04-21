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

<script>
import api from '@/api';
import { validatePassword } from '@/common/utils/util';
import DrawVerifyCode from '@components/drawVerifyCode';

export default {
  name: 'AccountForm',
  components: { DrawVerifyCode },
  props: ['isResetPwd'], // isResetPwd === true: 忘记密码页面；否则：注册账号页面
  data() {
    let verifyCodeValidator = (rule, value, cb) => {
      if (value.trim() !== this.verifyCode) { 
        cb(new Error()); 
      } else { 
        cb(); 
      }
    };
    let passWordValidator = (rule, value, cb) => {
      if (value.indexOf(' ') != -1) {
        //判断字符串是否有空格
        this.showtip = true;
        cb(new Error('请确认输入密码符合规则'));
      } else if (!validatePassword(value)) {
        this.showtip = true;
        cb(new Error('请确认输入密码符合规则'));
      } else {
        this.showtip = false;
        cb();
      }
    };
    let checkPassWordValidator = (rule, value, cb) => {
      if (this.formData.passWord != value) { 
        cb(new Error('请确认两次输入的密码相同'));
      } else { 
        cb();
      }
    };
    return {
      formData: {
        name: '',
        organization: {}, // 包括name和organizationCode
        department: {}, // 包括NAME和DEPARTMENTCODE
        phone: '',
        email: '',
        emailCode: '',
        passWord: '',
        verifyCode: '',
        checkPassWord: '',
      },
      rules: {
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
      },
      verifyCode: '', // 图形验证码
      buttoncotent: '发送验证码',//邮箱验证码发送按钮
      totalTime: 60,//倒计时时间
      canClick: true,//按钮是否能够点击
      showtip: true,//是否显示密码格式提示
      organizations: [], // 单位
      departments: [], // 部门
    };
  },
  computed: {
    organizationsResult() {
      return this.organizations.map(item => {
        return {
          name: item.NAME.trim(),
          organizationCode: item.ORGANIZATIONCODE.trim(),
        };
      });
    },
  },
  watch: {
    'formData.organization'() {
      this.formData.department = {};
      this.getDepartments();
    },
  },
  mounted() {
    this.changeCode();
    !this.isResetPwd && this.getOrganizations();
  },
  methods: {
    changeCode() {
      function randCode(characters, length) {
        //length为所需长度，characters为所包含的所有字符，默认为字母+数字。
        characters = characters.split('');//分割字符。
        let result = '';//返回的结果。 
        while (result.length < length) {
          var n = Math.floor(Math.random() * characters.length + 1) - 1;
          result += characters[n];
        }
        return result;
      }
      var verifyCodes = '1234567890';
      this.verifyCode = '';
      this.verifyCode = randCode(verifyCodes, 4);
    },
    getOrganizations() {
      api.getOrganizations().then(res => {
        this.organizations = res;
      });
    },
    getDepartments() {
      api.getDepartments().then(res => {
        this.departments = res;
      });
    },
    sendEmail() {
      if (!this.canClick) {
        return;
      }
      this.$refs.form.validateField('email', (err) => {
        if (!err) {
          api.sendEmail({
            email: this.formData.email,
            checkStatus: 0, // 0 - 无须校验该邮箱是否已注册
          }).then(() => {
            this.canClick = false;
            let time = this.totalTime;//倒计时时间
            this.buttoncotent = time + 's后重试';
            let clock = window.setInterval(() => {
              --time;
              this.buttoncotent = time + 's后重试';
              if (time < 0) {
                window.clearInterval(clock);
                this.buttoncotent = '发送验证码';
                time = this.totalTime;
                this.canClick = true;  //这里重新开启
              }
            }, 1000);
          });
        }
      });
    },
    $validate() {
      return this.$refs.form.validate();
    },
    $getFormData() {
      return this.formData;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/css/var.scss';

.account-form{
    text-align: center;
    padding-top: 100px;
    &-form {
        width: 552px;
        margin: 0 auto;
        /deep/ .el-input__inner {
            width: 457px;
        }
    }
    &-icon {
        float: right;
        margin-right: -20px;
        margin-top: 14px; 
    }
    &-email-verify /deep/ {
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