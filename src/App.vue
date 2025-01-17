<template>
  <div v-if="isLoading" class="overlay">
    <div class="spinner"></div>
  </div>

  <div v-if="profile" class="profile">
    <span>Hi,{{ profile.displayName }}</span>
    <img :src="profile.pictureUrl" width="50" height="50" alt="User Picture" />
  </div>
  <div v-else>
    <p>Loading profile...</p>
  </div>
  <div class="body">
    <TurntableComponent :AwardsValue="Awards" />
    <OptionComponent
      :AwardsValue="Awards"
      :ProfileValue="profile"
      @processText="processText"
    ></OptionComponent>
  </div>
</template>

<script setup>
import TurntableComponent from "./components/TurntableComponent.vue";
import OptionComponent from "./components/OptionComponent.vue";
import { ref, onMounted, provide } from "vue";
import liff from "@line/liff";

const Awards = ref("");
const isLoading = ref(false); // 全局加载状态

provide("isLoading", isLoading); // 提供加载状态给子组件

const processText = (newValue) => {
  Awards.value = newValue;
};

const profile = ref(null);

onMounted(async () => {
  await liff.getProfile().then((value) => {
    console.log(value.displayName);
    profile.value = value;
  });
});
</script>

<style scoped>
.body {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  gap: 100px;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

/* 加载指示器样式 */
.spinner {
  border: 5px solid rgba(255, 255, 255, 0.3); /* 背景的半透明边框 */
  border-top: 5px solid white; /* 主色调 */
  border-radius: 50%; /* 圆形 */
  width: 50px; /* 指示器的宽度 */
  height: 50px; /* 指示器的高度 */
  animation: spin 1s linear infinite; /* 动画：1秒旋转一次，线性动画，无限循环 */
}

/* 定义旋转动画 */
@keyframes spin {
  0% {
    transform: rotate(0deg); /* 初始位置 */
  }
  100% {
    transform: rotate(360deg); /* 完成一整圈 */
  }
}

@media screen and (max-width: 700px) {
  .body {
    display: block;
    height: 100vh;
  }
}
</style>
