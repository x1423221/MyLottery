<template>
  <div class="body">
    <TurntableComponent :AwardsValue="Awards"/>
    <OptionComponent :AwardsValue="Awards" @processText="processText"></OptionComponent>
  </div>
</template>

<script setup>
import TurntableComponent from './components/TurntableComponent.vue';
import OptionComponent from './components/OptionComponent.vue';
import { ref }from 'vue'


const Awards = ref("");

const processText = (newValue)=>{
  Awards.value = newValue;
}
</script>

<style scoped>
  .body{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    gap: 100px;
  }

@media screen and  (max-width: 700px) {
  .body{
    display: block;
    height: 100vh;
  }
}
</style>
