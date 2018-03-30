<template>
    <section class="right">
        <div id="elements">
            <div class="top-box normal-box">
                <div class="elements-tabbar flex-ac-jfs-nw-">
                    <div
                        v-for="(category, index) in ['case', 'dial', 'strap', 'craft', 'other']"
                        :key="index"
                        :class="['elements-tab-btn', { active: activeTab === category}]"
                        style="text-transform: capitalize;"
                        @click="activeTab = category">
                        {{ category }}
                    </div>
                </div>
                <div
                    class="elements-content">
                    <div
                        v-for="(category, index) in ['case', 'dial', 'strap']"
                        :key="index"
                        :data-tab="category"
                        :class="{active: category === activeTab}"
                        class="elements-content-box flex-jfs-afs-">
                        <div
                            v-for="item in $store.state.elements[category]"
                            :key="item.id"
                            :data-selected="item.tags[0]"
                            :class="{active: $store.state.preview[category] === item.tags[0]}"
                            class="e-c-b-c"
                            @click="$store.dispatch('changePreview', {[category]: item.tags[0]})">
                            <div
                                :data-details="item.tags[0]"
                                class="e-c-b-c-top-bar">
                                <span><i
                                    class="fa fa-search-plus"
                                    aria-hidden="true"/>Details</span>
                            </div>
                            <div
                                :data-selected="item.tags[0]"
                                :class="{active: $store.state.preview[category] === item.tags[0]}"
                                class="element-selected"/>
                            <img
                                :src="item.avatar.small.url"
                                alt="">
                            <span>{{ item.title }}
                                <div><b :class="item | in_stock">{{ item | in_stock }}</b></div>
                            </span>
                        </div>
                    </div>
                    <!-- 刻字 CRAFT -->
                    <!-- <div
                        data-tab="craft"
                        class="elements-content-box flex-l3-jfs-afs-">
                        <div
                            v-for="cb in twElements.backCase"
                            v-if="status !== 'unlimited' || cb.tags[0] == 'backcase-02' || cb.tags[0] == 'backcase-01'"
                            :data-selected="cb.tags[0]"
                            @click=""
                            class="e-c-b-c">
                            <div
                                class="e-c-b-c-top-bar"
                                :data-details="cb.tags[0]">
                                <span>
                                    <i
                                        class="fa fa-search-plus"
                                        aria-hidden="true"/>Details</span>
                            </div>
                            <div
                                :data-selected="cb.tags[0]"
                                class="element-selected"/>
                            <img
                                :src="cb.avatar.small.url"
                                alt=""
                                @click="changeCartBackCase(cb.tags[0])">
                            <span @click="changeCartBackCase(cb.tags[0])">{{ cb.title }}
                                <div>
                                    <b :class="cb | in_stock">{{ cb | in_stock }}</b>
                                </div>
                            </span>
                            <div
                                v-if="status === 'unlimited'"
                                @click="elementAddOtherCart(cb.tags[0])"
                                class="add-this-btn {{ s | in_stock }}">ADD TO CART</div>
                        </div>
                    </div> -->
                    <!-- 其他服務 Others -->
                    <!-- <div
                        data-tab="others"
                        class="elements-content-box flex-l3-jfs-afs-">
                        <div
                            v-for="o in twElements.others"
                            :data-selected="o.tags[0]"
                            @click=""
                            class="e-c-b-c">
                            <div
                                class="e-c-b-c-top-bar"
                                :data-details="o.tags[0]">
                                <span><i
                                    class="fa fa-search-plus"
                                    aria-hidden="true"/>Details</span>
                            </div>
                            <div
                                :data-selected="o.tags[0]"
                                class="element-selected"/>
                            <img
                                :src="o.avatar.small.url"
                                alt=""
                                @click="elementAddOtherCartAndChangeStatus(o.tags[0])">
                            <span @click="elementAddOtherCartAndChangeStatus(o.tags[0])">{{ o.title }}
                                <div><b :class="o | in_stock">{{ o | in_stock }}</b></div>
                            </span>
                            <div
                                v-if="status === 'unlimited'"
                                @click="elementAddOtherCartAndChangeStatus(o.tags[0])"
                                class="add-this-btn {{ o | in_stock }}">ADD TO CART</div>
                        </div>
                    </div> -->
                </div>
            </div>
        </div>
        <div id="code-and-share">
            <h2>
                <div id="cart-back">
                    <i
                        class="fa fa-chevron-up"
                        aria-hidden="true"/>
                </div>
                <div
                    id="cart-bigger"
                    class="btn">
                    <i
                        class="fa fa-angle-up"
                        aria-hidden="true"/>
                </div>
                <i
                    style="margin-right: 10px;"
                    class="fa fa-shopping-cart"
                    aria-hidden="true"/>Cart
            </h2>
            <div class="bottom-box normal-box">
                <div class="status-exchange">
                    <div
                        class="cart-status-btn"
                        :class="{ active: cartType === 'basic' }"
                        @click="cartType = 'basic'">BASIC SET
                    </div>
                    <div
                        class="cart-status-btn"
                        :class="{ active: cartType === 'double' }"
                        @click="cartType = 'double'">
                        DOUBLE SET
                    </div>
                    <div
                        class="cart-status-btn"
                        :class="{ active: cartType === 'unlimited' }"
                        @click="cartType = 'unlimited'">OTHER
                    </div>
                </div>
                <div
                    v-if="cartType === 'basic' || cartType === 'double'"
                    :class="cartType"
                    class="cart-content">
                    <div id="mobile-double-set-hint">
                        <i class="fa fa-angle-down"/>
                    </div>
                    <div
                        v-for="(displayItems, index) in cartDisplay"
                        :key="index"
                        :class="{ active: $store.state.cart.doubleWhich === index + 1 }"
                        class="cart-content-set-wrap cart-content-basic-set flex-l4-jfs-afs-"
                        @click="$store.dispatch('changeDoubleWhich', index + 1)">
                        <div
                            v-for="(category, index) in ['case', 'dial', 'strap']"
                            :key="index"
                            class="cart-item">
                            <template v-if="$store.state.cart[displayItems][category]">
                                <div
                                    class="delete-btn"
                                    @click="$store.dispatch('deleteElementsFromCart', [displayItems, category])">
                                    <!-- {{ cart.basic.a1 }} -->
                                    <img
                                        src="https://s3cdn.backer-founder.com/lp/zuwatch/img/common/icons/delete.svg"
                                        alt="">
                                </div>
                                <img
                                    :src="cartThumbnail(displayItems, category)"
                                    alt=""
                                    @click="$store.dispatch('changePreview', {[category]: $store.state.cart[displayItems][category]})">
                                    <!-- <span class="cart-item-price">
                                    {{ $store.state.currency + $store.getters.elementsByTag[$store.state.cart[cartType][category]].price }}
                                </span> -->
                            </template>
                            <template v-else>
                                <img
                                    :src="`https://s3cdn.backer-founder.com/lp/zuwatch/img/main-mobile/product/${category}/null.png`"
                                    alt="">
                            </template>
                        </div>
                        <!-- <div class="cart-item {{ cart.common.backCase }}">
                            <div
                                @click="deleteCartCraft('backCase')"
                                class="delete-btn">
                                <img
                                    src="https://s3cdn.backer-founder.com/lp/zuwatch/img/common/icons/delete.svg"
                                    alt="">
                            </div>
                            <img
                                :src="apiData[cart.common.backCase].avatar_small"
                                `
                                alt="">
                            <span class="cart-item-price">
                                {{ (location === 'tw' ? 'NT ' : 'USD ') + apiData[cart.common.backCase].price }}
                            </span>
                        </div> -->
                    </div>
                    <!-- <div
                        v-if="cartType === 'double'"
                        :class="{ active: doubleWhich === 2 }"
                        class="cart-content-set-wrap cart-content-double-set flex-l4-jfs-afs-"
                        @click="doubleWhich = 2">
                        <div class="cart-item {{ cart.double.a1 }}">
                            <div
                                @click="deleteCartElement('double', 'a1')"
                                class="delete-btn {{ cart.double.a1 }}">
                                <img
                                    src="https://s3cdn.backer-founder.com/lp/zuwatch/img/common/icons/delete.svg"
                                    alt="">
                            </div>
                            <img
                                @click="elementChange(cart.double.a1, '', '')"
                                :src="apiData[cart.double.a1].avatar_small | cartCaseDefault"
                                alt="">
                            <span class="cart-item-price">
                                {{ (location === 'tw' ? 'NT ' : 'USD ') + apiData[cart.double.a1].price }}
                            </span>
                        </div>
                        <div class="cart-item {{ cart.double.b1 }}">
                            <div
                                @click="deleteCartElement('double', 'b1')"
                                class="delete-btn {{ cart.double.b1 }}">
                                <img
                                    src="https://s3cdn.backer-founder.com/lp/zuwatch/img/common/icons/delete.svg"
                                    alt="">
                            </div>
                            <img
                                @click="elementChange('', cart.double.b1, '')"
                                :src="apiData[cart.double.b1].avatar_small | cartDialDefault"
                                alt="">
                            <span class="cart-item-price">
                                {{ (location === 'tw' ? 'NT ' : 'USD ') + apiData[cart.double.b1].price }}
                            </span>
                        </div>
                        <div class="cart-item {{ cart.double.c1 }}">
                            <div
                                @click="deleteCartElement('double', 'c1')"
                                class="delete-btn {{ cart.double.c1 }}">
                                <img
                                    src="https://s3cdn.backer-founder.com/lp/zuwatch/img/common/icons/delete.svg"
                                    alt="">
                            </div>
                            <img
                                @click="elementChange('', '', cart.double.c1)"
                                :src="apiData[cart.double.c1].avatar_small | cartStrapDefault"
                                alt="">
                            <span class="cart-item-price">
                                {{ (location === 'tw' ? 'NT ' : 'USD ') + apiData[cart.double.c1].price }}
                            </span>
                        </div>
                        <div class="cart-item {{ cart.common.doubleSetBackCase }}">
                            <div
                                @click="deleteCartCraft('doubleSetBackCase')"
                                class="delete-btn">
                                <img
                                    src="https://s3cdn.backer-founder.com/lp/zuwatch/img/common/icons/delete.svg"
                                    alt="">
                            </div>
                            <img
                                :src="apiData[cart.common.doubleSetBackCase].avatar_small"
                                `
                                alt="">
                            <span class="cart-item-price">
                                {{ (location === 'tw' ? 'NT ' : 'USD ') + apiData[cart.common.doubleSetBackCase].price }}
                            </span>
                        </div>
                    </div> -->
                </div>
                <div
                    v-if="cartType === 'unlimited'"
                    class="cart-content flex-l4-jfs-afs-">
                    <!-- vue 會自動過濾重複的元素，使用 track-by="$index" 可以讓他重複渲染 -->
                    <!-- <div
                        v-for="(i, o) in cart.unlimited"
                        track-by="$index"
                        class="cart-item {{ o }}">
                        <div
                            @click="deleteOtherCartElement(i)"
                            class="delete-btn {{ o }}">
                            <img
                                src="https://s3cdn.backer-founder.com/lp/zuwatch/img/common/icons/delete.svg"
                                alt="">
                        </div>
                        <img
                            @click=""
                            :src="apiData[o].avatar_small"
                            alt="">
                        <span class="cart-item-price">
                            {{ (location === 'tw' ? 'NT ' : 'USD ') + apiData[o].price }}
                        </span>
                    </div> -->
                </div>
                <!-- <div class="cart-price-section">
                    <div class="total">
                        Total<b>{{ totalAmount }}</b>{{ location == 'tw' ? '(NT)' : '(USD)' }}
                    </div>
                    <div
                        v-if="status === 'unlimited'"
                        id="cart-code-btn"
                        class="btn"
                        @click="formSubmit"
                        :class="{ ok: cart.unlimited.length >= 1 }">
                        CHECKOUT
                    </div>
                    <div
                        v-else
                        id="cart-code-btn"
                        @click="formSubmit"
                        class="btn">
                        {{ calcElementsInCart() }}
                    </div>
                </div> -->
            </div>
        </div>
    </section>
</template>

<script>
import store from '@/store/index';

export default {
  
    filters: {
        // taiwan
        in_stock: function(v) {
            if (v.quantity_limit === 0) {
                return 'sufficient stock';
            } else {
                var in_stock_count = v.quantity_limit - (v.pledged_count + v.wait_pledged_count);
                if (in_stock_count >= 5) {
                    var in_stock_count = 'sufficient stock';
                } else if (in_stock_count >= 2) {
                    var in_stock_count = 'low quantity';
                } else if (in_stock_count >= 0) {
                    var in_stock_count = 'out of stock';
                }
                return in_stock_count;
            }
        }
       
    },

    data() {
        return {
            activeTab: 'case',
            cartType: 'basic',
            doubleWhich: 1
        };
    },
    computed: {
        cartDisplay() {
            if(this.cartType === 'basic') {
                return ['basic'];
            } else if (this.cartType === 'double') {
                return ['basic', 'double'];
            }

        }
    },
    methods: {
        cartThumbnail(cartType, category) {
            if(Object.keys(this.$store.getters.elementsByTag).length !== 0 && this.$store.state.cart[cartType][category]) {
                return this.$store.getters.elementsByTag[this.$store.state.cart[cartType][category]].avatar_small;
            } else {
                return `https://s3cdn.backer-founder.com/lp/zuwatch/img/main-mobile/product/${category}/null.png`;
            }
        }
    },
};
</script>
