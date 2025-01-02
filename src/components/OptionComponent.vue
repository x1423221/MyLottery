<template>
    <div>
        <textarea v-model="Awards" @keyup.enter="processText"></textarea>
        <button class="btn btn-success" @click="ClearAll">全部清除</button>
    </div>
</template>

<script setup>
import {ref , defineEmits}  from 'vue'
    const ClearAll = ()=>{
        const textarea = document.getElementsByTagName("textarea");
        textarea[0].value = "";
        Awards.value = null
        emit('processText' ,  Awards.value)
    };

  
    const Awards = ref('');

    const emit = defineEmits(['processText']);

    const processText = ()=>{
       const tmp = Awards.value.split(/\r?\n/).filter(item => item != "");
       emit('processText' , tmp)
    }
</script>

<style scoped>
    textarea{
        width: 100%;
        height: 500px;
        padding: 0;
    }
</style>