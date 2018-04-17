<template>
    <div id="app">
        <div
            id="zu-watch"
            :class="location">
            <loading v-if="$store.state.isLoading"/>
            <router-view/>
        </div>
    </div>
</template>

<script>
import store from '@/store/index';
import loading from '@/components/loading';

export default {
    name: 'App',
    components: {
        loading
    },
    store,
    computed: {
        location() {
            return `location_${store.state.locale}`;
        }
    },
    created() {
        this.$store.dispatch('onLoading', true);
    },
    mounted() {
    }
};
</script>

<style>

#app {

}

</style>
