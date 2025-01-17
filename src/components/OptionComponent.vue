<template>
  <div>
    <textarea v-model="Awards" @keyup.enter="processText"></textarea>
    <button class="btn btn-success" @click="readData">讀取上次資料</button>
    <button class="btn btn-success" @click="updateData">紀錄本次資料</button>
    <button class="btn btn-success" @click="ClearAll">全部清除</button>
  </div>
</template>

<script setup>
import { ref, defineEmits, defineProps, watch, inject } from "vue";
import db from "../firebase/config";
import { doc, setDoc, getDoc } from "firebase/firestore";

const Awards = ref("");
const emit = defineEmits(["processText"]);
let docRef;

const props = defineProps({
  ProfileValue: Object, // 定義接收的 props
});

const isLoading = inject("isLoading");

const ClearAll = () => {
  const textarea = document.getElementsByTagName("textarea");
  textarea[0].value = "";
  Awards.value = null;
  emit("processText", Awards.value);
};

const processText = () => {
  const tmp = Awards.value.split(/\r?\n/).filter((item) => item != "");
  emit("processText", tmp);
};

const updateData = () => {
  setDoc(docRef, {
    LotteryData: Awards.value.split(/\r?\n/).filter((item) => item != ""),
  })
    .then(() => alert("紀錄成功"))
    .catch((err) => console.error("Error saving data:", err));
};

const readData = async () => {
  isLoading.value = true;
  try {
    const tmpData = await getDoc(docRef);
    Awards.value = tmpData.data().LotteryData.join("\r\n");
    const tmp = Awards.value.split(/\r?\n/).filter((item) => item != "");
    emit("processText", tmp);
  } catch (err) {
    console.error("Error fetching document:", err);
  } finally {
    isLoading.value = false;
  }
};

watch(
  () => props.ProfileValue,
  (newProfile) => {
    if (newProfile) {
      // 使用 Firebase 的資料庫
      docRef = doc(db, "LotteryData", newProfile.userId);
    }
  }
);
</script>

<style scoped>
textarea {
  width: 100%;
  height: 500px;
  padding: 0;
}

button {
  margin-right: 5px;
}
</style>
