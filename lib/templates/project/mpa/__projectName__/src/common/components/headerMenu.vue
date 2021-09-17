<template>
    <div class="header">
        <div class="header-left">
            <img class="logo" src="@/assets/logo.png" />
            <div class="platform">医疗大数据智能管理软件</div>
        </div>
        <el-dropdown class="header-right dropdown" trigger="hover" @command="handleCommand">
            <span class="el-dropdown-link">
                <i class="usericon el-icon-user-solid" />
                {{admin}}
                <el-badge is-dot v-if="msgCount > 0" />
                <i class="el-icon-arrow-down el-icon--right" />
            </span>
            <el-dropdown-menu slot="dropdown">
                <!-- <el-dropdown-item command="toPersonalPage">个人中心</el-dropdown-item> -->
                <!-- <el-dropdown-item command="toMsg">
                    消息中心
                    <el-badge is-dot v-if="msgCount > 0"></el-badge>
                </el-dropdown-item> -->
                <el-dropdown-item command="toLogout">登出</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
        <el-dialog title="登出" :visible.sync="dialogVisible" width="30%">
            <span>确定退出当前账号并回到登录页面吗？</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="toLogout()">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import api from '@/api';

export default {
    name: 'header-menu',
    data() {
        return {
            admin: window.localStorage.getItem('name'),
            msgCount: 0,
            dialogVisible: false
        }
    },
    methods: {
        handleCommand(command) {
            // 页面跳转
            if (command == 'toLogout') { 
                this.dialogVisible = true 
            } else if (command == "toMsg") {
                this.$router.push({
                    path: '/messagereview',
                });
            } else if (command == "toPersonalPage") { 
                this.$router.push({ path: '/personalpage', }); 
            }
        },
        toLogout() {
            api.logout().then(() => {
                this.$router.push('/login')
                this.dialogVisible = false
            })
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/var.scss';

.header{
    background-color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    border-bottom: 4px solid $color-primary;
    &-left{
        display: flex;
        align-items: center;
        cursor: pointer;
    }
    .platform{
        padding-left: 10px;
        font-size: 24px;
        font-weight: bold;
    }
    .logo{
        width: 133px;
        height: 54px;
    }
    .usericon{
        color: $color-primary;
        font-size: 16px;
    }
    .dropdown{
        cursor: pointer;
    }
}
</style>