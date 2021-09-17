<template>
    <ul class="platforms">
        <li class="platforms-item g-section" 
            v-for="(platform, i) in platforms" 
            :key="i">
            <div class="platforms-platform">
                <i :class="`iconfont ${platform.icon}`"></i>
                {{platform.name}}
            </div>
            <a class="platforms-jump" :href="platform.entry"></a>
        </li>
    </ul>
</template>

<script>
export default {
    name: 'platforms',
    data() {
        return {
            platforms: [{
                name: '数据生产平台',
                entry: '/data',
                icon: 'icon-shujuchuli'
            }, {
                name: '患者信息全景可视化软件',
                entry: '/patients',
                icon: 'icon-quanjing'
            }, {
                name: '实时BI分析',
                entry: '/',
                icon: 'icon-bi'
            }, {
                name: '药物评价工具',
                entry: '/',
                icon: 'icon-drug-full'
            }, {
                name: '数据交易平台',
                entry: '/',
                icon: 'icon-jiaoyi'
            }, {
                name: '一站式科研平台',
                entry: '/',
                icon: 'icon-keyan'
            }, {
                name: 'AI开放平台',
                entry: '/',
                icon: 'icon-wuguan'
            }, {
                name: 'AI中台',
                entry: '/',
                icon: 'icon-AI'
            }]
        }
    },
    methods: {
        // handlerHover(type) {
        //     console.log(type)
        // }
    }
}
</script>

<style lang="scss" scoped>
.platforms {
    // display: flex;
    // flex-wrap: wrap;
    // align-content: center;
    // justify-content: space-around;
    // align-items: center;
    // position: absolute;
    // top: 50%;
    // transform: translateY(-50%);
    // padding: 50px;
    padding: 40px;
    display: grid;
    grid-template-columns: repeat(4, 24%);
    grid-column-gap: 20px;
    grid-row-gap: 20px;
    &-item {
        margin: 0;
    //     width: 300px;
        position: relative;
        font-size: 20px;
    //     box-sizing: border-box;
    //     margin: 0 20px 100px 0;
    }
    &-platform {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    &-jump{
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
    }
}
.iconfont {
    font-size: 80px;
    padding-bottom: 20px;
}
</style>