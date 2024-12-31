<template>
    <div class="start">
    </div>
</template>

<script setup>
import {defineProps , reactive,watch}  from 'vue'

const props = defineProps({
    AwardsValue:Object
})

const AwardsData = reactive({

});

watch(
    () =>props.AwardsValue,
    (newValue) =>{
        AwardsData.value = newValue;
    }
);

</script>

<style scoped>
</style>