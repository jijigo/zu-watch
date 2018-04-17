<template>
    <section
        :class="{'bigger': cartBigger}"
        class="right">
        <popup
            :element="selectedElement"
            @clearElement="selectedElement = null"/>
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
                            v-for="item in $store.getters.elementsByCategories[category]"
                            :key="item.id"
                            :data-selected="item.tags[0]"
                            :class="{active: $store.state.preview[category] === item.tags[0]}"
                            class="e-c-b-c"
                            @click="$store.dispatch('changePreview', {[category]: item.tags[0]})">
                            <div
                                class="e-c-b-c-top-bar"
                                @click="getDetails(item)">
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
                            <div
                                v-if="cartType === 'unlimited'"
                                class="add-this-btn"
                                @click="elementAddOtherCartAndChangeStatus(item.tags[0])">ADD TO CART
                            </div>
                        </div>
                    </div>
                    <!-- 刻字 CRAFT -->
                    <div
                        :class="{active: 'craft' === activeTab}"
                        data-tab="craft"
                        class="elements-content-box flex-l3-jfs-afs-">
                        <div
                            v-for="(cb, index) in $store.getters.elementsByCategories.backCase"
                            v-if="cartType !== 'unlimited' || cb.tags[0] == 'backcase-02' || cb.tags[0] == 'backcase-01'"
                            :key="index"
                            :data-selected="cb.tags[0]"
                            class="e-c-b-c">
                            <div
                                @click="getDetails(cb)"
                                class="e-c-b-c-top-bar">
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
                                @click="$store.dispatch('addToCart', ['common', cb.tags[0]])">
                            <span @click="$store.dispatch('addToCart', ['common', cb.tags[0]])">{{ cb.title }}
                                <div>
                                    <b :class="cb | in_stock">{{ cb | in_stock }}</b>
                                </div>
                            </span>
                            <!-- ?? -->
                            <div
                                v-if="cartType === 'unlimited'"
                                class="add-this-btn"
                                @click="elementAddOtherCart(cb.tags[0])">ADD TO CART
                            </div>
                            <!-- {{ s | in_stock }} -->
                            <!-- ?? -->
                        </div>
                    </div>
                    <!-- 其他服務 Others -->
                    <div
                        :class="{active: 'other' === activeTab}"
                        data-tab="others"
                        class="elements-content-box flex-l3-jfs-afs-">
                        <div
                            v-for="(o, index) in $store.getters.elementsByCategories.others"
                            :data-selected="o.tags[0]"
                            :key="index"
                            class="e-c-b-c">
                            <div
                                class="e-c-b-c-top-bar"
                                @click="getDetails(o)">
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
                                v-if="cartType === 'unlimited'"
                                class="add-this-btn"
                                @click="elementAddOtherCartAndChangeStatus(o.tags[0])">ADD TO CART</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div
            id="code-and-share"
            :class="{'active' : cartActive}">
            <h2>
                <div
                    id="cart-back"
                    @click="cartActive = !cartActive">
                    <i
                        class="fa fa-chevron-up"
                        aria-hidden="true"/>
                </div>
                <div
                    id="cart-bigger"
                    class="btn"
                    @click="cartBigger = !cartBigger">
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
                        :class="{ active: cartType === 'basic' }"
                        class="cart-status-btn"
                        @click="$store.dispatch('cartSelect', 'basic')">BASIC SET
                    </div>
                    <div
                        :class="{ active: cartType === 'double' }"
                        class="cart-status-btn"
                        @click="$store.dispatch('cartSelect', 'double')">
                        DOUBLE SET
                    </div>
                    <div
                        :class="{ active: cartType === 'unlimited' }"
                        class="cart-status-btn"
                        @click="$store.dispatch('cartSelect', 'unlimited')">OTHER
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
                                    
                                <span class="cart-item-price">
                                    {{ price(displayItems, category) }}
                                </span>
                            </template>
                            <template v-else>
                                <img
                                    :src="`https://s3cdn.backer-founder.com/lp/zuwatch/img/main-mobile/product/${category}/null.png`"
                                    alt="">
                            </template>
                        </div>
                        
                        <div
                            v-if="$store.state.cart.common[displayItems === 'basic' ? 'backCase' : 'doubleSetBackCase']"
                            class="cart-item">
                            {{ displayItems }}
                            <div
                                class="delete-btn"
                                @click="$store.dispatch('deleteElementsFromCart', ['common', displayItems === 'basic' ? 'backCase' : 'doubleSetBackCase'])">
                                <img
                                    src="https://s3cdn.backer-founder.com/lp/zuwatch/img/common/icons/delete.svg"
                                    alt="">
                            </div>
                            <img
                                :src="cartThumbnail('common', displayItems === 'basic' ? 'backCase' : 'doubleSetBackCase')"
                                alt="">
                            <span class="cart-item-price">
                                {{ price('common', displayItems === 'basic' ? 'backCase' : 'doubleSetBackCase') }}
                                <!-- {{ (location === 'tw' ? 'NT ' : 'USD ') + apiData[cart.common.backCase].price }} -->
                            </span>
                        </div>
                    </div>
                </div>
                <div
                    v-if="cartType === 'unlimited'"
                    class="cart-content flex-l4-jfs-afs-">
                    <!-- vue 會自動過濾重複的元素，使用 track-by="$index" 可以讓他重複渲染 -->
                    <div
                        v-for="(i, o) in $store.state.cart.unlimited"
                        :key="o"
                        track-by="$index"
                        class="cart-item">
                        <div
                            class="delete-btn"
                            @click="$store.dispatch('deleteElementsFromCart', ['unlimited', o])">
                            <img
                                src="https://s3cdn.backer-founder.com/lp/zuwatch/img/common/icons/delete.svg"
                                alt="">
                        </div>
                        <img
                            :src="$store.getters.elementsByTag[i].avatar_small"
                            alt="">
                        <span class="cart-item-price">
                            {{ $store.state.currency + $store.getters.elementsByTag[i].price }}
                        </span>
                    </div>
                </div>
                <div class="cart-price-section">
                    <div class="total">
                        Total<b>{{ $store.getters.totalAmount }}</b>({{ $store.state.currency }})
                    </div>
                    <div
                        id="cart-code-btn"
                        :class="{ ok: $store.getters.calcElementsInCart === 'CHECKOUT' }"
                        class="btn"
                        @click="formSubmit">
                        {{ $store.getters.calcElementsInCart }}
                    </div>
                </div>
            </div>
        </div>
        <div id="output-popup">
            <div class="close"/>
            <div class="content">
                <form
                    ref="orderForm"
                    :action="$store.state.locale === 'tw' ? 'https://zuwatch.backme.tw/cashflow/shopping_cart_checkout?locale=zh-TW' : 'https://zuwatch.backme.tw/cashflow/shopping_cart_checkout?locale=en'"
                    method="post">
                    <input
                        style="display: none"
                        type="hidden"
                        name="utf8"
                        value="✓">
                    <input
                        style="display: none"
                        type="hidden"
                        name="flag"
                        value="utmFlag">
                    <template
                        v-for="(element, i) in $store.getters.order">
                        <input
                            v-if="$store.state.locale === 'tw'"
                            :name="'items[' + i + '][project_id]'"
                            type="hidden"
                            value="532">
                        <input
                            v-if="$store.state.locale == 'global'"
                            :name="'items[' + i + '][project_id]'"
                            type="hidden"
                            value="704">
                        <input
                            :name="'items[' + i + '][reward_id]'"
                            :value="element.id"
                            type="hidden">
                        <input
                            :name="'items[' + i + '][quantity]'"
                            type="hidden"
                            value="1">
                        <input
                            v-if="cartType === 'double'"
                            :name="'items[' + i + '][note]'"
                            :value="element.note"
                            style="display: none"
                            type="hidden">
                    </template>
                    <img
                        style="width: 40px; margin-top: 70px;"
                        src="http://gifimage.net/wp-content/uploads/2017/02/Loading-GIF-Image-25.gif"
                        alt="">
                </form>
            </div>
        </div>
    </section>
</template>

<script>
import eventHub from '@/helper/eventHub';
import popup from '@/components/popup';

export default {
    name: 'Right',
    components: {
        popup
    },
    data() {
        return {
            activeTab: 'case',
            doubleWhich: 1,
            selectedElement: null,
            cartActive: false,
            cartBigger: false
        };
    },
    computed: {
        cartDisplay() {
            if(this.cartType === 'basic') {
                return ['basic'];
            } else if (this.cartType === 'double') {
                return ['basic', 'double'];
            }

        },
        cartType() {
            return this.$store.state.cart.selected;
        }
        
    },
    mounted() {
        eventHub.$on('toggleCart', () => this.cartActive = !this.cartActive);
    },
    beforeDestroy() {
        eventHub.$off('toggleCart');
    },
    methods: {
        cartThumbnail(cartType, category) {
            if(Object.keys(this.$store.getters.elementsByTag).length !== 0 && this.$store.state.cart[cartType][category]) {
                return this.$store.getters.elementsByTag[this.$store.state.cart[cartType][category]].avatar_small;
            } else {
                return `https://s3cdn.backer-founder.com/lp/zuwatch/img/main-mobile/product/${category}/null.png`;
            }
        },

        price(cartType, category) {
            let tag = this.$store.state.cart[cartType][category];
            if(this.$store.getters.elementsByTag[tag]) {
                return this.$store.state.currency + this.$store.getters.elementsByTag[tag].price;
            }
        },

        elementAddOtherCartAndChangeStatus(val) {
            if (this.cartType !== 'unlimited') {
                alert('This item will appear in the "OTHER" section of the Cart.');
                this.$store.dispatch('cartSelect', 'unlimited');
                this.$store.dispatch('addToCart', ['others', val]);
            } else {
                this.$store.dispatch('addToCart', ['others', val]);
            }
        },
        
        getDetails(el) {
            this.selectedElement = el;
        },

        // 送出表單
        formSubmit() {
            let canSubmit = true;
            // check if everyone is 'out of stock' or not
            // if the element is 'out of stock',alert its name and set canSumit = false
            this.$store.getters.order.forEach(function(el) {
                if (el.stock <= 1) {
                    alert('Sorry... \'' + el.name + '\' is out of stock.');
                    canSubmit = false;
                }
            });
            if (canSubmit) {
                this.$refs.orderForm.submit();
            }
        },

    },
};
</script>
