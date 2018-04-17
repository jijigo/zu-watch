import Vuex from 'vuex';
import axios from 'axios';
import Vue from 'vue';

/* global _ */

Vue.use(Vuex, axios);

export default new Vuex.Store({
    state: {    // = data
        isLoading: true,
        preview: {
            case: 'ca-01',   // 錶框
            dial: 'zu-01-w',   // 錶面⌚️
            strap: 'lc-01'   // 錶帶
        },
        saveItems: [],
        elementsAll: [],
        locale: 'tw',
        currency: 'NT',
        cart: {
            selected: 'basic',
            basic: { case: 'ca-01', dial: 'zu-01-w', strap: 'lc-01' },
            /// double 會保留 basic，額外再多一組 SET
            double: { case: null, dial: null, strap: null },
            /// it's named as 'other' in this website.
            unlimited: [],
            /// 這個 common 是給台灣地區，有 backCase & others 配件
            common: {
                backCase: '',
                doubleSetBackCase: '',
                others: []
            },
            /// 這個欄位是當 double set 的時候，選取配件是第一組手錶還是第二組
            doubleWhich: 1
        },
    },
    getters: {  // computed
        // 現在展示的手錶
        nowPreviewImage(state) {
            return Object.keys(state.preview).map((key) => {
                return`https://s3cdn.backer-founder.com/lp/zuwatch/img/main/product/pv-${key}/${state.preview[key]}.png`;
            });
        },
        elementsByCategories(state) {
            let obj = {
                case: [],
                dial: [],
                strap: [],
                backCase: [],
                others: [],
                collection: []
            };
           
            state.elementsAll.forEach((el) => {
      
                if (el.category === 'case') {
                    obj.case.push(el);
                } else if (el.category == 'dial') {
                    obj.dial.push(el);
                } else if (el.category == 'strap') {
                    obj.strap.push(el);
                } else if (el.category == 'craft') {
                // hotfixed to hide the backcase-01
                // 為了防止 production 受影響
                    if (el.tags[0] !== 'backcase-01') {
                        obj.backCase.push(el);
                    }
                } else if (el.category === 'others') {
                // hotfixed to hide the buckle
                // 為了防止 production 受影響
                    if (el.tags[0] !== 'customize-buckle') {
                        obj.others.push(el);
                    } else {
                        obj.backCase.push(el);
                    }
                } else if (el.category == 'collection') {
                    obj.collection.push(el);
                }
            });

            return obj;
        },

        elementsByTag(state, getters) {
            let newApiObject = {};
            Object.keys(getters.elementsByCategories).forEach((category) => {
                getters.elementsByCategories[category].forEach((c) => {
                    newApiObject[c.tags[0]] = {
                        id: c.id,
                        price: c.price,
                        name: c.title,
                        avatar_small: c.avatar.small.url,
                        covers: c.covers,
                        stock:
                              c.quantity_limit === 0
                                  ? 10
                                  : c.quantity_limit -
                                  (c.pledged_count + c.wait_pledged_count)
                    };
                });
                
            });
            return newApiObject;

        },

        totalAmount(state, getters) {
            if(Object.keys(getters.elementsByTag).length === 0) return;
            if(state.cart.selected === 'basic') {
                let basicSet = [
                    ...Object.values(state.cart.basic),
                    state.cart.common.backCase,
                ];
                
                return _.reduce(_.compact(basicSet), (init, current) => {
                    return init + getters.elementsByTag[current].price;
                }, 0);
            }
            else if(state.cart.selected === 'double') {
                let doubleSet = [
                    ...Object.values(state.cart.basic),
                    ...Object.values(state.cart.double),
                    state.cart.common.backCase,
                    state.cart.common.doubleSetBackCase,
                ];
                return _.reduce(_.compact(doubleSet), (init, current) => {
                    return init + getters.elementsByTag[current].price;
                }, 0);
            }
            if(state.cart.selected === 'unlimited') {
                return _.reduce(_.compact(Object.values(state.cart.unlimited)), (init, current) => {
                    return init + getters.elementsByTag[current].price;
                }, 0);
            }
        },
        // 訂單整理
        order(state, getters) {
            if(Object.keys(getters.elementsByTag).length === 0) return;
            if (state.locale !== 'tw' && state.locale !== 'global') return;
            let valueArray = [];
            let cartStuff = state.cart[state.cart.selected];   // basic, double, unlimited

            Object.values(cartStuff).forEach(function(item) {
                if (item) {
                    valueArray.push({
                        id: getters.elementsByTag[item].id,
                        code: item,
                        name: getters.elementsByTag[item].name,
                        price: getters.elementsByTag[item].price,
                        stock: getters.elementsByTag[item].stock,
                        note: 'THE FIRST SET'
                    });
                }
            });
            // 處理 CRAFT, 過去稱 BACKCASE(因為欄位變動)
            if (state.cart.selected !== 'unlimited') {
                let backCase = state.cart.common.backCase; // 背殼
                if (backCase) {
                    valueArray.push({
                        id: getters.elementsByTag[backCase].id,
                        code: backCase,
                        name: getters.elementsByTag[backCase].name,
                        price: getters.elementsByTag[backCase].price,
                        stock: getters.elementsByTag[backCase].stock,
                        note: 'THE FIRST SET'
                    });
                }
            }

            /// DOUBLE SET 要把 BASIC SET 也算進去
            if (state.cart.selected === 'double') {
                var basicCartStuff = state.cart['basic'];
                Object.values(basicCartStuff).forEach(function(item) {
                    if (item) {
                        valueArray.push({
                            id: getters.elementsByTag[item].id,
                            code: item,
                            name: getters.elementsByTag[item].name,
                            price: getters.elementsByTag[item].price,
                            stock: getters.elementsByTag[item].stock,
                            note: 'THE SECOND SET'
                        });
                    }
                });
                // 處理 CRAFT, 過去稱 BACKCASE(因為欄位變動)
                let doubleSetBackCase = state.cart.common.doubleSetBackCase; // 背殼
                if(doubleSetBackCase) {
                    valueArray.push({
                        id: getters.elementsByTag[doubleSetBackCase].id,
                        code: doubleSetBackCase,
                        name: getters.elementsByTag[doubleSetBackCase].name,
                        price: getters.elementsByTag[doubleSetBackCase].price,
                        stock: getters.elementsByTag[doubleSetBackCase].stock,
                        note: 'THE SECOND SET'
                    });
                }
            }
            
            return valueArray;
        },

        calcElementsInCart(state) {
            let volumeOfCart = _.compact(Object.values(state.cart[state.cart.selected])).length;

            if(state.cart.selected === 'basic') {
                let volumeOfCart = _.compact(Object.values(state.cart.basic)).length;
                return volumeOfCart >= 3 ? 'CHECKOUT' : `${volumeOfCart} / 3`;
            } else if(state.cart.selected === 'double') {
                let volumeOfCart = _.compact([...Object.values(state.cart.basic), ...Object.values(state.cart.double)]).length;
                return volumeOfCart >= 6 ? 'CHECKOUT' : `${volumeOfCart} / 6`;
            } else {
                return volumeOfCart >= 1 ? 'CHECKOUT' : `${volumeOfCart} / 1`;
            }
        }

        
    },
    actions: {  // methods
        onLoading(context, status) {
            context.commit('onLoading', status);
        },
        fetchData(context) {
            let url = 'https://zuwatch.backme.tw/api/projects/532.json?token=a788fa70032f09bdfd3fe5af2b3ae6f3';

            axios.get(url)
                .then((response) => {
                    let publishEl = response.data.rewards.filter((el) => el.status === 'publish');
                    context.commit('setElements', publishEl);
                })
                .catch((error) => Promise.reject(error));
        },
        changePreview(context, elements) {
            context.commit('updatePreview', elements);
            //
            context.commit('pushToCart', {
                style: 'basicOrDouble',
                value: elements
            });
        },
        // 儲存預覽商品
        saveElements(context, preview) {
            context.commit('saveItemsToPreview', preview);
        },
        // 刪除儲存商品
        deleteElementsFromSave(context, pos) {
            context.commit('deleteSaveItems', pos);
        },
        deleteElementsFromCart(context, [cartType, category]) {
            context.commit('deleteCartItems', [cartType, category]);
        },
        // 取得隨機組合
        getRandomElements({commit, getters}) {
            commit('setRandomElements', getters);
        },

        changeDoubleWhich({commit}, index) {
            commit('changeDoubleWhich', index);
        },

        addToCart({commit}, [style, value]) {
            commit('pushToCart', {
                style: style,
                value: value
            });
        },

        cartSelect({commit}, type) {
            commit('changeCartSelected', type);
        }
    },
    mutations: {
        onLoading(state, status) {
            state.isLoading = status;
        },
        setElements(state, elements) {
            state.elementsAll = elements;
        },
        setRandomElements(state, getters) {
            ['case', 'dial', 'strap'].forEach((category) => {
                let el = getters.elementsByCategories[category];
                state.preview[category] = el[Math.floor(Math.random() * el.length)].tags[0];
            });
        },
        updatePreview(state, element) {
            Object.keys(element).forEach((key) => {
                state.preview[key] = element[key];
            });
        },
        saveItemsToPreview(state, p) {
            state.saveItems.push(Object.assign({}, p)); // 淺拷貝
        },
        deleteSaveItems(state, pos) {
            state.saveItems.splice(pos, 1);  // 刪除一個
        },
        deleteCartItems(state, [cartType, category]) {
            if(cartType === 'unlimited') {
                state.cart.unlimited.splice(category, 1);
            } else {
                state.cart[cartType][category] = '';
            }
        },
        deleteOtherCartElement(index) {
            this.cart.unlimited.splice(index, 1);
        },
        pushToCart(state, payload) {
            if(payload.style === 'basicOrDouble') {
                let cartType = state.cart.doubleWhich === 1 ? 'basic' : 'double';
                Object.keys(payload.value).forEach((key) => {
                    state.cart[cartType][key] = payload.value[key];
                });
            }
            if(payload.style === 'common') {
                let doubleWhich = state.cart.doubleWhich === 1 ? 'backCase' : 'doubleSetBackCase';
                state.cart.common[doubleWhich] = payload.value;
            }
            if(payload.style === 'others') {
                state.cart.unlimited.push(payload.value);
            }
        },
        changeDoubleWhich (state, index) {
            state.cart.doubleWhich = index;
        },
        // 變更選擇的購物車
        changeCartSelected(state, type) {
            state.cart.selected = type;
        },
    }
});