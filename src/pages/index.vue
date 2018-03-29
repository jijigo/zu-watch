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
    </div>

</template>

<script>
import left from '@/components/left';
import mid from '@/components/mid';
import right from '@/components/right';


export default {
    components: {
        left, mid, right
    },
    created() {
        this.$store.dispatch('fetchData');
    }

};
</script>

<style lang="scss">

$white: #fff;

</style>
