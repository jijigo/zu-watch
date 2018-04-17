<template>
    <div id="customize">
        <div class="zu-title flex-ac-jc- logo-mobil-black">
            <a
                class="zu-title"
                href="https://www.zu-watch.com/">
                <span class="logo">
                    <img
                        src="https://s3cdn.backer-founder.com/lp/zuwatch/img/common/logo.svg"
                        alt="">
                </span>
            </a>
        </div>
        <div
            class="content flex-jc-ac- all-wrapper"
            style="position: relative">
            <left/>
            <mid/>
            <right/>
        </div>
        <footer>
            COPYRIGHTS  ©  Zu WATCH ™ 2017
        </footer>
        <mockup/>
    </div>

</template>

<script>
import left from '@/components/left';
import mid from '@/components/mid';
import right from '@/components/right';
import mockup from '@/components/mockup';

export default {
    components: {
        left, mid, right, mockup
    },
    created() {
        this.$store.dispatch('fetchData');
    },
    mounted() {
        console.log('loaded');
        this.$store.dispatch('onLoading', false);
    }

};
</script>

<style lang="scss">

$white: #fff;

</style>
