<script>
export default {
    data() {
        return {
            message: 'Github'

        }
    }
}
</script>


<template>
    <p>{{ aya_presentation }}</p>
    <button class="test-btn">{{ message }}</button>
</template>

<style>
.test-btn {
    border: 2px solid #00bfa8;
    background: #f2fbfa;
    border-radius: 20px;
    padding: 10px 20px;
    cursor: pointer;
    color: #00bfa8;
}
</style>
