import Vuex from 'vuex';
import axios from 'axios';
import Vue from 'vue';

Vue.use(Vuex, axios);

export default new Vuex.Store({
    state: {    // = data
        preview: {
            case: 'ca-01',   // 錶框
            dial: 'zu-01-w',   // 錶面⌚️
            strap: 'lc-01'   // 錶帶
        },
        saveItems: [],
        elements: {
            case: [],
            dial: [],
            strap: [],
            backCase: [],
            others: [],
            collection: []
        },
        elementsAll: [],
        locale: 'tw',
        currency: 'NT',
        cart: {
            basic: { case: 'ca-01', dial: 'zu-01-w', strap: 'lc-01' },
            /// double 會保留 basic，額外再多一組 SET
            double: { case: null, dial: null, strap: null },
            /// it's named as 'other' in this website.
            unlimited: [],
            /// 這個 common 是給台灣地區，有 backCase & others 配件
            common: {
                backCase: 'backcase-01',
                doubleSetBackCase: 'backcase-01',
                others: ['', '', '', '']
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
                } else if (el.category == 'others') {
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

        }
        
    },
    actions: {  // methods
        fetchData(context) {
            let url = 'https://zuwatch.backme.tw/api/projects/532.json?token=a788fa70032f09bdfd3fe5af2b3ae6f3';

            axios.get(url)
                .then((response) => {
                    // console.log(response.data);
                    let publishEl = response.data.rewards.filter((el) => el.status === 'publish');
                    context.commit('setElements', publishEl);
                })
                .catch((error) => Promise.reject(error));
        },
        changePreview(context, element) {
            context.commit('updatePreview', element);
            context.commit('pushToCart', element);
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
        }
    },
    mutations: {
        setElements(state, elements) {
            state.elementsAll = elements;
            elements.forEach((el) => {
            // 將 api 回饋物件們分類到 vue 裡，方便後續取得
                if (el.category === 'case') {
                    state.elements.case.push(el);
                } else if (el.category == 'dial') {
                    state.elements.dial.push(el);
                } else if (el.category == 'strap') {
                    state.elements.strap.push(el);
                } else if (el.category == 'craft') {
                // hotfixed to hide the backcase-01
                // 為了防止 production 受影響
                    if (el.tags[0] !== 'backcase-01') {
                        state.elements.backCase.push(el);
                    }
                } else if (el.category == 'others') {
                // hotfixed to hide the buckle
                // 為了防止 production 受影響
                    if (el.tags[0] !== 'customize-buckle') {
                        state.elements.others.push(el);
                    } else {
                        state.elements.backCase.push(el);
                    }
                } else if (el.category == 'collection') {
                    state.elements.collection.push(el);
                }
            });
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
            state.cart[cartType][category] = '';
        },
        pushToCart(state, elements) {
            // state.cart.basic = elements;
            Object.keys(elements).forEach((key) => {
                state.cart.basic[key] = elements[key];
            });
        }

    }
});