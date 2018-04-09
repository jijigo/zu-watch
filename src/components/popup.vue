<template>
    <div
        v-if="element"
        id="details-popup"
        :style="{'display': element ? 'block' : 'none'}">
        <div
            class="close"
            @click="$emit('clearElement')"/>
        <div class="content">
            <h2>{{ element.title }}</h2>
            <img
                :src="element.avatar.url"
                alt="">
            <p>
                Price：{{ element.price }} {{ $store.state.locale === 'tw' ? '(NT)' : '(USD)' }}｜
                <b :class="element | in_stock">{{ element | in_stock }} </b>
            </p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Popup',
    props: {
        element: {
            type: Object,
            default: null
        }
    },
};
</script>

