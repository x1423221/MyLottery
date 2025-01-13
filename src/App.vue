<template>
  <div v-if="profile">
    <h1>{{ profile.displayName }}</h1>
    <img :src="profile.pictureUrl" width="50" height="50" alt="User Picture" />
    <p>{{ profile.statusMessage }}</p>
  </div>
  <div v-else>
    <p>Loading profile...</p>
  </div>
  <div class="body">
    <TurntableComponent :AwardsValue="Awards"/>
    <OptionComponent :AwardsValue="Awards" @processText="processText"></OptionComponent>
  </div>
  
</template>

<script setup>
import TurntableComponent from './components/TurntableComponent.vue';
import OptionComponent from './components/OptionComponent.vue';
import { ref}from 'vue'
import liff from '@line/liff';

const Awards = ref("");

const processText = (newValue)=>{
  Awards.value = newValue;
}

const profile = ref(null);
profile.value = liff.getProfile();

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
