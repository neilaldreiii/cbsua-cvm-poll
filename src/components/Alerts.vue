<template>
    <div class="container">
        <div class="alerts" v-if="alerts.length">
            <p v-for="alert in alerts" :key="alert.index">
                {{ alert }}
            </p>
        </div>
    </div>
</template>

<script>
export default {
    name: "alerts",
    props: ['alerts'],
}
</script>

<style scoped>
.container {
    position: fixed;
    top: 30px;
    left: 30px;
}
</style>
