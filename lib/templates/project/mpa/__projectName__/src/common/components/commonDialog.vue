<template>
    <el-dialog
        :title="options.title || '提示'"
        :class="`m-dialog ${options.type || ''} ` + (options.clazz || '')"
        :show-close="options.showClose"
        append-to-body
        :top="top"
        :close-on-click-modal="closeOnClickModal"
        :visible.sync="dialogVisible"
        :before-close="beforeClose">
        <i class="sqfont icn-exclamation-solid" v-if="options.type === 'warning'"></i>
        <slot name="content"></slot>
        <span slot="footer" class="dialog-footer" v-if="options.buttons">
            <el-button
                :class="'u-cancelbtn'"
                @click="onCancel"
                v-if="!!options.buttons[1]"
                :disabled="options.buttonsDisabled && options.buttonsDisabled[1]">{{options.buttons[1]}}</el-button>
            <el-button
                :class="'u-okbtn'"
                @click="onConfirm"
                v-if="!!options.buttons[0]"
                :loading="isLoading"
                :disabled="options.buttonsDisabled && options.buttonsDisabled[0]">{{options.buttons[0]}}</el-button>
        </span>
    </el-dialog>
</template>

<script>
/**
 * @param {Object} options  定制弹窗属性
 *      @param {String} title  标题
 *      @param {String} clazz （加在dialog根节点上）
 *      @param {String} type 弹窗类型，默认无，如果为“warning”，有warning弹窗默认样式（包括warning icon）
 *      @param {Array} buttons  按钮名称，第一个是确认按钮、第二个是取消按钮(确认按钮在右边、取消按钮在左边)
 *      @param {Array} buttonsDisabled  按钮是否可用，true-可用，false-disabled，默认都可用。eg.[false, true]
 *      @param {Boolean} isLoading  确认按钮显示loading状态
 *      @param {Boolean} beforeCloseNoClose 抛出beforeClose事件后是否关闭弹窗
 * @event onconfirm 点击'u-okbtn'按钮抛出的事件
 * @event oncancel 点击'u-cancelbtn'按钮抛出的事件
 * @event beforeClose 点击弹窗右上角“x”关闭弹窗之前抛出的事件
 */
export default {
    name: 'common-dialog',
    props: {
        options: {
            type: Object,
            default() {
                return {
                    title: '提示',
                    clazz: '',
                    showClose: true,
                    buttons: ['确定', '取消']
                };
            }
        },
        isLoading: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            dialogVisible: false,
            closeOnClickModal: false,
            top: '10%'
        };
    },
    methods: {
        onCancel() {
            this.$emit('oncancel');
            this.$close();
        },
        onConfirm() {
            this.$emit('onconfirm');
        },
        $show(callParams) {
            this.dialogVisible = true;
        },
        $close() {
            this.dialogVisible = false;
        },
        beforeClose() {
            this.$emit('beforeClose');
            if (this.options.beforeCloseNoClose) {
                return;
            }
            this.$close();
        }
    }
};
</script>
<style lang="scss">
@import '@/assets/css/var.scss';

.m-dialog {
    .el-dialog {
        width: 640px;
        padding-bottom: 30px;
        border-radius: 4px;
        font-size: 14px;
        color: #333;
    }
    .el-dialog__header {
        font-weight: bold;
        padding: 10px 30px;
        background: #f3f3f3;
        border-radius: 4px 4px 0 0;
    }
    .el-dialog__headerbtn {
        width: 22px;
        height: 22px;
        top: 12px;
        right: 25px;
    }
    .el-dialog__title{
        font-size: 16px;
        color: #333;
    }
    .el-dialog__close {
        color: #999;
        &:hover {
            color: #999;
        }
    }
    .el-dialog__body {
        padding: 26px 30px 30px;
    }
    .dialog-footer {
        display: inline-block;
    }
    .el-dialog__footer {
        text-align: right;
        padding: 0 30px !important;
    }
    .el-button {
        padding: 10px;
        min-width: 96px;
        height: 36px;
        &.u-okbtn{
            background: $color-primary;
            border-color: $color-primary;
            color: #fff;
            &.is-disabled{
                background: #ccc;
                border-color: #ccc;
            }
        }
        &.u-cancelbtn{
            border-color: $color-primary;
            color: $color-primary;
            &.is-disabled{
                color: #ccc;
                border-color: #ccc;
            }
        }
    }
    .el-dialog--small {
        width: 460px;
    }
    .msg {
        font-size: 16px;
        color: #333;
        font-weight: bold;
        text-align: center;
        padding: 20px 0 5px;
        line-height: 22px;
        .icn-exclamation-solid {
            color: #ffb539;
            font-size: 20px;
            margin-right: 5px;
        }
    }

    /* warning弹窗特殊样式 */
    &.warning{
        .el-dialog__body{
            font-size: 16px;
            line-height: 22px;
            display: flex;
            justify-content: center;
            color: #333;
            .icn-exclamation-solid{
                font-size: 16px;
                color: #f00;
                padding: 3px 5px 0 0;
            }
        }
    }
}
</style>
