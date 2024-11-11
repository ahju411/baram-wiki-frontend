<template>
  <div class="exp-container">
    <div class="exp-warrior exp-box">
      <exp-card :data="lvlData.w" />
    </div>
    <div class="exp-rogue exp-box">
      <exp-card :data="lvlData.n" />
    </div>
    <div class="exp-shaman exp-box">
      <exp-card :data="lvlData.p" />
    </div>
    <div class="exp-sage exp-box">
      <exp-card :data="lvlData.t" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import ExpCard from "@/components/level/ExpCard.vue";

const lvlData = ref({
  w: [],
  n: [],
  p: [],
  t: [],
});

const getLevelData = async () => {
  try {
    const data = await $fetch(`/api/level`);
    lvlData.value = data || {};
  } catch (err) {
    console.error("레벨 데이터 조회 중 오류 발생", err);
    lvlData.value = {
      w: [],
      n: [],
      p: [],
      t: [],
    };
  }
};

onMounted(async () => {
  await getLevelData();
});
</script>

<style scoped lang="scss">
.exp-container {
  padding: 24px;
  width: 1400px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  .exp-box {
    width: 100%;
    height: 1000px;
    background-color: var(--panel-bg);
    border: 2px solid var(--border-color);
    border-radius: 12px;
    padding: 15px;
    //overflow-y: auto; /* 내용이 500px 넘으면 스크롤 */
  }
}
</style>
