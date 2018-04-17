<template>
    <section
        :class="{active: hotstyleActive}"
        class="left">
        <div id="recommend">
            <h2>
                Style
                <div
                    id="recommend-back"
                    @click="hotstyleActive = !hotstyleActive">
                    <i
                        class="fa fa-arrow-left"
                        aria-hidden="true"/>
                </div>
            </h2>
            <div class="top-box normal-box flex-afs-">
                <div
                    @click="elementChange('ca-01', 'zu-02-w', 'me-01'), hotstyleActive = !hotstyleActive"
                    style="background-image: url('https://s3cdn.backer-founder.com/lp/zuwatch/img/main/hotstyle/1.jpg');"
                    class="btn recommend-style" />
                <div
                    @click="elementChange('ca-03', 'zu-05-w', 'nl-03-s'), hotstyleActive = !hotstyleActive"
                    style="background-image: url('https://s3cdn.backer-founder.com/lp/zuwatch/img/main/hotstyle/2.jpg');"
                    class="btn recommend-style" />
                <div
                    @click="elementChange('ca-03', 'zu-04-w', 'lc-03'), hotstyleActive = !hotstyleActive"
                    style="background-image: url('https://s3cdn.backer-founder.com/lp/zuwatch/img/main/hotstyle/3.jpg');"
                    class="btn recommend-style" />
                <div
                    @click="elementChange('ca-02', 'zu-03-b', 'nl-03-b'), hotstyleActive = !hotstyleActive"
                    style="background-image: url('https://s3cdn.backer-founder.com/lp/zuwatch/img/main/hotstyle/4.jpg');"
                    class="btn recommend-style" />
                <div
                    @click="elementChange('ca-03', 'zu-01-w', 'lc-02'), hotstyleActive = !hotstyleActive"
                    style="background-image: url('https://s3cdn.backer-founder.com/lp/zuwatch/img/main/hotstyle/5.jpg');"
                    class="btn recommend-style" />
                <div
                    @click="elementChange('ca-03', 'zu-10-b', 'ny-03-g'), hotstyleActive = !hotstyleActive"
                    style="background-image: url('https://s3cdn.backer-founder.com/lp/zuwatch/img/main/hotstyle/6.jpg');"
                    class="btn recommend-style" />
            </div>
        </div>
        <div
            id="save"
            :class="{'hidetext': $store.state.saveItems.length !== 0}">
            <h2>Save</h2>
            <div
                class=" bottom-box normal-box flex-l4-jfs-ac-">
                <div
                    v-for="(item, index) in $store.state.saveItems"
                    :key="index"
                    class="save-box">
                    <div
                        @click="$store.dispatch('deleteElementsFromSave', index)"
                        class="delete-btn">
                        <img
                            src="https://s3cdn.backer-founder.com/lp/zuwatch/img/common/icons/delete.svg"
                            alt="">
                    </div>
                    <div
                        @click="$store.dispatch('changePreview', item)"
                        class="btn preview-show-body">
                        <img
                            v-for="(value, key, index) in item"
                            :key="index"
                            :class="`preview-${index+1}`"
                            :src="`https://s3cdn.backer-founder.com/lp/zuwatch/img/main/product/pv-${key}/${value}.png`"
                            alt="">
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import eventHub from '@/helper/eventHub';

// import store from '@/store/index';
export default {
    name: 'Left',
    data () {
        return {
            hotstyleActive: false,
        };
    },
    mounted() {
        eventHub.$on('toggleHotstyle', () => this.hotstyleActive = !this.hotstyleActive);
    },
    beforeDestroy() {
        eventHub.$off('toggleHotstyle');
    },
    methods: {
        elementChange(a, b, c) {
            this.$store.dispatch('changePreview',
                {
                    case: a,
                    dial: b,
                    strap: c
                });
        }
    }
};
</script>

<style scoped>

</style>
