<template>
  <div class="king-container">
    <h2 class="king-title">레벨별 왕퀘스트 횟수</h2>
    <div class="king-tabs">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        :class="['tab-button', { active: activeTab == tab.id }]"
        @click="dataHandler(tab)"
      >
        {{ tab.name }}
      </button>
      <span class="info">* 다음 레벨업을 하기 위한 몬스터별 왕퀘스트 횟수 입니다.</span>
    </div>
    <div class="king-box">
      <KingCard
        :ldata="lvlkingData.levels"
        :mdata="mdata"
        :activeId="activeTab"
      ></KingCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import KingCard from "@/components/level/KingCard.vue";
/** 정의 **/
const lvlkingData = ref({ levels: {}, monsters: {} })
const activeTab = ref(1);
const mdata = ref(null);
const tabs = [
  { id: 1, name: 'Lv. 56~69', value: '56' },
  { id: 2, name: 'Lv. 70~89', value: '70' },
  { id: 3, name: 'Lv. 90~98', value: '90' },
  // { id: 4, name: 'Lv. 99', value: '99' },
  // { id: 5, name: '1차승급', value: '1차승급' },
  // { id: 6, name: '3차승급', value: '3차승급' }
]

const dataHandler = (tab) => {
  activeTab.value = tab.id;
  mdata.value = lvlkingData.value.monsters[tab.value];
}

const getKingLevelData = async () => {
  try {
    const data = await $fetch(`/api/level/king`);
    lvlkingData.value = data || { levels: {}, monsters: {} }
    console.log(lvlkingData.value)
    mdata.value = lvlkingData.value.monsters['56'] || []
  } catch (err) {
    console.error("레벨 데이터 조회 중 오류 발생", err);
  }
}

useSeoMeta({
    title: '바람위키 | 레벨별 왕 퀘스트 경험치표',
    description: '바람의 나라 레벨별 왕 퀘스트 경험치표',
});

onMounted(async () => {
  await getKingLevelData();
});
</script>


<style scoped lang="scss">
.king-container {
  margin-top: 24px;
  width: 1200px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  .king-title {
    color: var(--highlight);
    font-size: 2rem;
    margin-bottom: 2rem;
    text-align: center;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  }
  .king-tabs {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
    justify-content: space-between;

    .tab-button {
      padding: 10px 20px;
      border: 1px solid var(--border-color);
      border-radius: 4px;
      background: var(--panel-bg);
      cursor: pointer;
      transition: all 0.2s ease;
      color: var(--secondary-text);

      &.active {
        background: var(--button-gradient);
        color: var(--text-color);
      }
    }
    .info {
      margin-left: auto; /* span을 오른쪽 끝으로 정렬 */
      align-self: center; /* 세로 정렬을 가운데로 */
      font-size: 11px;
      color: gray;
    }
  }
  .king-box {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
}
</style>
