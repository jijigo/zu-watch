<template>
    <section class="mid">
        <div id="preview">
            <div class="mockup-btns">
                <div
                    data-who="woman"
                    class="mockup-btn zuwatch-btn"
                    @click="toggleMockup">
                    <i
                        class="fa fa-eye"
                        aria-hidden="true"/>
                    Preview
                </div>
            </div>
            <div id="mobile-tools">
                <div class="gobackindex-btn">
                    <i
                        class="fa fa-arrow-left"
                        aria-hidden="true"/>
                </div>
                <div
                    class="hotstyle-btn"
                    @click="toggleHotstyle">
                    <i
                        class="fa fa-star-o"
                        aria-hidden="true"/>
                </div>
                <div
                    class="seecart-btn"
                    @click="toggleCart">
                    <i
                        class="fa fa-shopping-cart"
                        aria-hidden="true"/>
                </div>
                <div
                    data-who="woman"
                    class="mockup-btn"
                    @click="toggleMockup">
                    <i
                        class="fa fa-eye"
                        aria-hidden="true"/>
                </div>
                <div id="cart-notification">
                    變更成功
                </div>
            </div>
            <div
                class="top-box preview-show"
                style="pointer-events: none;">
                <div class="preview-show-body">
                    <!-- 預覽手錶照片 -->
                    <img
                        v-for="(image, index) in $store.getters.nowPreviewImage"
                        :key="index"
                        :class="`preview-${index+1}`"
                        :src="image"
                        alt="">
                </div>
            </div>
            <div class="bottom-box preview-btns">
                <div
                    id="save"
                    class="zuwatch-btn save-btn"
                    @click="$store.dispatch('saveElements', $store.state.preview)">
                    <i
                        class="fa fa-floppy-o"
                        aria-hidden="true"/>
                    Save
                </div>
                <div
                    id="random"
                    class="zuwatch-btn save-btn active"
                    @click="$store.dispatch('getRandomElements')">
                    <i
                        class="fa fa-random"
                        aria-hidden="true"/>
                    Random
                </div>
                <div
                    v-if="$store.state.cart.selected !== 'unlimited'"
                    id="checkcart"
                    class="zuwatch-btn save-btn">
                    My Cart
                </div>
                <div
                    v-if="$store.state.cart.selected === 'unlimited'"
                    id="addtocart"
                    class="zuwatch-btn save-btn"
                    @click="elementsAddOtherCart()">
                    <i
                        class="fa fa-plus-circle"
                        aria-hidden="true"/>
                    Add to Cart
                </div>
            </div>
        </div>
        <!-- <div
            id="mobile-double-switch"
            v-if="status === 'double'">
            <div
                class="btn"
                @click="doubleWhichChange(1)"
                :class="{ active: cart.doubleWhich == 1 }">1st Set</div>
            <div
                class="btn"
                @click="doubleWhichChange(2)"
                :class="{ active: cart.doubleWhich == 2 }">2nd Set</div>
        </div> -->
    </section>
</template>

<script>
import eventHub from '@/helper/eventHub';
import mockup from '@/components/mockup';

export default {
    components: {
        mockup
    },
    data() {
        return {
            showMockup: false
        };
    },

    methods: {
        elementsAddOtherCart() {
            _.forEach(Object.values(this.$store.state.preview), (v) => {
                this.$store.dispatch('addToCart', ['others', v]);
            });
        },

        toggleMockup() {
            eventHub.$emit('toggleMockup');
        },

        toggleCart() {
            eventHub.$emit('toggleCart');
        },

        toggleHotstyle() {
            eventHub.$emit('toggleHotstyle');
        }
    }
};
</script>

