<template>
    <div class="login">
        <img src="@/assets/logo-blue.png" style="height:60px;">
		<h1 class="login-title">医疗大数据智能管理软件</h1>
		<div class="login-box">
			<el-form ref="form">
				<el-form-item>
					<el-input type="text"
						v-model="loginForm.username"
						placeholder="请输入手机号码"
						@keyup.enter.native="handleLogin"
						clearable>
						<template slot="prepend"> <i class="login-icon el-icon-user"></i></template>
					</el-input>
				</el-form-item>
				<el-form-item>
					<el-input type="password"
						v-model="loginForm.password"
						placeholder="请输入密码"
						show-password
						clearable
						@keyup.enter.native="handleLogin">
						<template slot="prepend"> <i class="login-icon el-icon-key"></i></template>
					</el-input>
				</el-form-item>
			</el-form>
			<div class="login-btns">
				<el-button class="login-btns-login" type="primary" @click="handleLogin()">登录</el-button>
				<div>
					<el-button type="text" 
						class="login-btns-registry" 
						@click="$router.push({path: '/registry'})">注册账号</el-button>
					<el-button type="text"
						class="login-btns-pwd"
						@click="$router.push({path:'/resetPassword'})">忘记密码？</el-button>
				</div>
			</div>
			<div class='login-tips' v-show="loginErr">{{loginErrTips}}</div>
		</div>
		<el-tooltip 
			style="position:absolute;bottom:20px;left:10px"
			popper-class="thistooltip"
			content="84：开发（dev）版；82：稳定展示版；86：稳定使用版"
			placement="right">
			<i style="color:dimgray;" class="el-icon-info"></i>
		</el-tooltip>
    </div>
</template>

<script>
import api from '@/api';
import { getUrlParams } from '@common/utils/util';

export default {
    name: 'login',
	data() {
		return {
			loginForm: {
				username: '',
				password: '',
			},
			loginErr: false,
			loginErrTips: ''
		}
	},
	methods: {
		handleLogin() {
			this.loginErr = false;
			const { username, password } = this.loginForm;
			// 手机号有效性判断
			var phoneReg = /^1[34578]\d{9}$/.test(username)
			if (!phoneReg) {
				this.loginErr = true;
				this.loginErrTips = "请输入正确的手机号";
				return;
			}
			if (password.length < 6) {
				this.loginErr = true;
				this.loginErrTips = "密码不能小于6位";
				return;
			}
			api.login({ username, password }).then(() => {
				this.loginErr = false;
				this.getUserInfo();
			});
		},
		getUserInfo() {
			api.getUserInfo().then(res => {
				window.localStorage.setItem('organizationCode', res.organizationCode)
				window.localStorage.setItem('name', res.name)

				let redirectUrl = getUrlParams(location.href, 'redirect') || '/'
				console.log('login success, ready to jump')
				redirectUrl = decodeURIComponent(redirectUrl);
				window.location.href = redirectUrl;
			});
		}
	}
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/var.scss';

.login {
    position: fixed;
    height: 100%;
    width: 100%;
    background-color: #fff;
	display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 100px;
	&-title {
		font-size: 28px;
		padding:30px 0 50px;
	}
	&-box {
		width: 360px;
		position: relative;
	}
	&-icon {
		font-weight: bold;
		&.el-icon-key{
			transform: rotate(45deg);
		}
	}
	&-btns {
		margin-top: 30px;
		border-radius: 5px;
		color: #454545;
		&-login {
			outline: none;
			color: #fff;
			border-radius: 3px;
			cursor: pointer;
			width: 100%;
			height: 45px;
			font-size: 15px;
		}
		&-registry, &-pwd {
			float: right;
			font-weight: bold;
			font-size: 12px;
			color: #aaa;
			text-decoration: underline;
		}
		&-registry {
			float: left;
		}
	}
	&-tips {
		font-size: 14px;
		color: $color-danger;
		position:absolute;
		right: 0;
		bottom: 95px;
	}
}
.login /deep/ {
	.el-input-group__prepend{
		background: white;
		padding: 0 10px;
	}
	.el-input__inner{
		border-left:none;
		padding-left: 0;
		&:focus,&:hover{
		border-color: #DCDFE6;
		}
	}
	.el-form-item{
		margin-bottom: 10px;
	}
}
</style>
