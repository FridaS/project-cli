<template>
    <div class="home">
        <header-menu />
        <platforms />
    </div>
</template>

<script>
import HeaderMenu from '@common/components/headerMenu';
import Platforms from './platforms'

export default {
    name: 'home',
    components: { HeaderMenu, Platforms },
    data() {
        return {

        }
    }
}
</script>

<style lang="scss" scoped>

</style>