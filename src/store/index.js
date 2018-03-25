import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {    // = data
        preview: {
            case: 'ca-01',   // 錶框
            dial: 'zu-01-w',   // 錶面⌚️
            strap: 'lc-01'   // 錶帶
        },
        saveItems: [],
        locale: 'tw'
    },

    getters: {  // computed
        // 現在展示的手錶
        nowPreviewImage(state) {
            return Object.keys(state.preview).map((key) => {
                return`https://s3cdn.backer-founder.com/lp/zuwatch/img/main/product/pv-${key}/${state.preview[key]}.png`;
            });
        }
    },

    actions: {  // methods
        changePreview(context, element) {
            context.commit('updatePreview', element);
        },
        // 儲存預覽商品
        saveElements(context, preview) {
            context.commit('saveItemsToPreview', preview);
        },

        deleteElementsFromSave(context, pos) {
            context.commit('deleteSaveItems', pos);
        }

    },

    mutations: {
        updatePreview(state, element) {
            state.preview = element;
        },

        saveItemsToPreview(state) {
            state.saveItems.push(state.preview);
        },

        deleteSaveItems(state, pos) {
            state.saveItems.splice(pos, 1);  // 刪除一個
        }

    }
});