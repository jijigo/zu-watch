<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
import store from '@/store/index';
export default {
    name: 'App',
    store
};
</script>

<style>

#app {

}

</style>
