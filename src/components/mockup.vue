<template>
    <transition name="fade">
        <div
            v-if="show"
            id="mockup-area">
            <div
                class="back btn"
                @click="show = !show">
                <div class="zuwatch-btn">BACK</div>
            </div>
            <div class="mockup-btns">
                <div
                    data-who="woman"
                    @click="who = 'woman'"
                    class="mockup-btn zuwatch-btn">WOMAN</div>
                <div
                    data-who="man"
                    @click="who = 'man'"
                    class="mockup-btn zuwatch-btn">MAN</div>
            </div>
            <div class="wrap">
                <img
                    :src="bgImage"
                    class=""
                    alt="">
                <div
                    :class="$store.state.locale"
                    class="watch">
                    <img
                        v-for="(image, index) in $store.getters.nowPreviewImage"
                        :key="index"
                        :class="`preview-${index+1}`"
                        :src="image"
                        alt="">
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
import eventHub from '@/helper/eventHub';

export default {
    name: 'Mockup',
    data() {
        return {
            who: 'woman',
            show: false
        };
    },
    computed: {
        bgImage() {
            if(window.innerWidth <= 850) {
                return `https://s3cdn.backer-founder.com/lp/zuwatch/img/main-mobile/mockup/${this.who}.png`;
            } else {
                return `https://s3cdn.backer-founder.com/lp/zuwatch/img/main/mockup/${this.who}.png`;
            }
             
        }
    },
    mounted() {
        eventHub.$on('toggleMockup', () => this.show = !this.show);
    },
    beforeDestroy() {
        eventHub.$off('toggleMockup');
    },
};
</script>


<style lang="scss" scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
