<template>
    <div id="app">
        <div
            id="zu-watch"
            :class="location">
            <router-view/>
        </div>
    </div>
</template>

<script>
import store from '@/store/index';

export default {
    name: 'App',
    store,
    computed: {
        location() {
            return `location_${store.state.locale}`;
        }
    }
};
</script>

<style>

#app {

}

</style>
