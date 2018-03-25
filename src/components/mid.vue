<template>
    <section class="mid">
        <div id="preview">
            <div class="mockup-btns">
                <div
                    data-who="woman"
                    class="mockup-btn zuwatch-btn">
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
                <div class="hotstyle-btn">
                    <i
                        class="fa fa-star-o"
                        aria-hidden="true"/>
                </div>
                <div class="seecart-btn">
                    <i
                        class="fa fa-shopping-cart"
                        aria-hidden="true"/>
                </div>
                <div
                    data-who="woman"
                    class="mockup-btn">
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
                    @click="$store.dispatch('saveElements')"
                    id="save"
                    class="zuwatch-btn save-btn">
                    <i
                        class="fa fa-floppy-o"
                        aria-hidden="true"/>
                    Save
                </div>
                <!-- <div
                    id="random"
                    @click="twRandomElements"
                    class="zuwatch-btn save-btn active">
                    <i
                        class="fa fa-random"
                        aria-hidden="true"/>
                    Random
                </div> -->
                <!-- <div
                    v-if="status !== 'unlimited'"
                    id="checkcart"
                    class="zuwatch-btn save-btn">
                    My Cart
                </div>
                <div
                    v-if="status === 'unlimited'"
                    @click="elementsAddOtherCart()"
                    id="addtocart"
                    class="zuwatch-btn save-btn">
                    <i
                        class="fa fa-plus-circle"
                        aria-hidden="true"/>
                    Add to Cart
                </div> -->
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
export default {
    data() {
        return {
            
        };
    },

    methods: {
        
    }
};
</script>

