<template>
  <div>
    <h1>{{ profile.value.displayName }}</h1>
    <img :src="profile.value.pictureUrl" width="50" height="50" alt="User Picture" />
    <p>{{ profile.value.userId }}</p>
  </div>
  <div class="body">
    <TurntableComponent :AwardsValue="Awards"/>
    <OptionComponent :AwardsValue="Awards" @processText="processText"></OptionComponent>
  </div>
  
</template>

<script setup>
import TurntableComponent from './components/TurntableComponent.vue';
import OptionComponent from './components/OptionComponent.vue';
import { ref , onMounted}from 'vue'
import liff from '@line/liff';

const Awards = ref("");

const processText = (newValue)=>{
  Awards.value = newValue;
}

const profile = ref(null);

onMounted(async ()=>{
    await liff.getProfile().then((value)=>{
    console.log(value.displayName)
    profile.value = value
  });
});

console.log(profile.value)
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
