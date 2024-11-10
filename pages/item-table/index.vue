<template>
  <div class="screener-container">
    <div class="screener-option-section">

      <!-- Item Section -->
      <div class="item-type-pos">
        <div class="screener-title">아이템</div>
        <div class="screener-option-box">
          <div
              class="weapon"
              :class="{ on: selectedItem === '0' }"
              @click="selectOption('item', '0')"
          >무기</div>
          <div
              class="armor"
              :class="{ on: selectedItem === '1' }"
              @click="selectOption('item', '1')"
          >갑옷</div>
          <div
              class="shield"
              :class="{ on: selectedItem === '2' }"
              @click="selectOption('item', '2')"
          >방패</div>
          <div
              class="helmet"
              :class="{ on: selectedItem === '3' }"
              @click="selectOption('item', '3')"
          >투구</div>
          <div
              class="ring"
              :class="{ on: selectedItem === '4' }"
              @click="selectOption('item', '4')"
          >반지</div>
          <div
              class="necklace"
              :class="{ on: selectedItem === '5' }"
              @click="selectOption('item', '5')"
          >목걸이</div>
        </div>
      </div>

      <!-- Sex Section -->
      <div class="sex-type-pos">
        <div class="screener-title">성별</div>
        <div class="screener-option-box">
          <div
              class="sex-all"
              :class="{ on: selectedSex === '0' }"
              @click="selectOption('sex', '0')"
          >공통</div>
          <div
              class="man"
              :class="{ on: selectedSex === '1', hide: sexButtonController == '1' }"
              @click="selectOption('sex', '1')"
          >남자</div>
          <div
              class="woman"
              :class="{ on: selectedSex === '2', hide: sexButtonController == '1' }"
              @click="selectOption('sex', '2')"
          >여자</div>
        </div>
      </div>

      <!-- Job Section -->
      <div class="job-type-pos">
        <div class="screener-title">직업</div>
        <div class="screener-option-box">
          <div
              class="job-all"
              :class="{ on: selectedJob === '0' }"
              @click="selectOption('job', '0')"
          >공통</div>
          <div
              class="warrior"
              :class="{ on: selectedJob === '1' }"
              @click="selectOption('job', '1')"
          >전사</div>
          <div
              class="rogue"
              :class="{ on: selectedJob === '2' }"
              @click="selectOption('job', '2')"
          >도적</div>
          <div
              class="shaman"
              :class="{ on: selectedJob === '3' }"
              @click="selectOption('job', '3')"
          >주술사</div>
          <div
              class="sage"
              :class="{ on: selectedJob === '4' }"
              @click="selectOption('job', '4')"
          >도사</div>
        </div>
      </div>

      <div class="level-type-pos">
        <div class="screener-title">레벨</div>
        <div class="screener-option-box">
          <n-slider
              class="level-slider"
              v-model:value="sliderValue"
              :step="10"
              :min="0"
              :max="99"
              :range="true"
              :marks="marks"
          />
        </div>
      </div>
      <!-- Search Button -->
      <div
          class="search-button"
          @click="searchItemList"
      >
        검색
      </div>
    </div>

    <!-- Table Section -->
    <div class="screener-table-section">
      <div v-if="dataLoading"><p>데이터 로딩중 ...</p></div>
      <div v-else-if="itemtable && itemtable.length > 0">
        <table class="allitem-table">
          <thead>
            <tr>
              <th>이미지</th>
              <th>이름</th>
              <th>레벨</th>
              <th v-if="tableFormat == '0'">위력</th>
              <th v-else>무장</th>
              <th>직업</th>
              <th>체력</th>
              <th>마력</th>
              <th>힘</th>
              <th>민첩</th>
              <th>지능</th>
              <th>명중률</th>
              <th>파괴력</th>
              <th v-if="tableFormat !== '0'">체력리젠</th>
              <th v-if="tableFormat !== '0'">마법방어</th>
              <th>드랍</th>
            </tr>
          </thead>
          <tbody>
            <tr
                v-for="(item, index) in itemtable"
                :key="index"
            >
              <td>
                <NuxtLink :to="`/item/${item.id}`">
                  <NuxtImg
                      :src="`/remote/item/${item.images}`"
                  ></NuxtImg>
                </NuxtLink>
              </td>
              <td class="lt">{{ item.name }}</td>
              <td>{{ item.reqlevel }}</td>
              <td v-if="tableFormat == 0">{{ item.smin }} ~ {{ item.lmin }}</td>
              <td v-else>AC {{ item.ac }}</td>
              <td>{{ jobFormatter(item.reqjob) }}</td>
              <td>{{ item.MHP }}</td>
              <td>{{ item.MMP }}</td>
              <td>{{ item.M }}</td>
              <td>{{ item.W }}</td>
              <td>{{ item.G }}</td>
              <td>{{ item.hit }}</td>
              <td>{{ item.dam }}</td>
              <td v-if="tableFormat !== '0'">{{ item.hr }}</td>
              <td v-if="tableFormat !== '0'">{{ item.md }}</td>
              <td v-if="item.MobDrops.length !== 0" class="monster-box">
                <template
                    v-for="(drop, index) in item.MobDrops"
                    :key="index"
                >
                  <div class="monster-card">
                    <div class="monster-detail">
                      <NuxtLink
                        :to="`/monster/${drop.mob_id}`"
                      >
                        <NuxtImg
                            :src="`/remote/monster/${drop.MobMaster.images}`"
                        />
                      </NuxtLink>
                    </div>
                    <div class="info">
                      <p>{{ drop.MobMaster.name }}</p>
                    </div>
                  </div>
                </template>
              </td>
              <td v-else>-</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else>
        <p>아이템이 없습니다.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeMount } from 'vue';
import { useAsyncData } from "#app";
import type { AllItem } from "~/types/allitem";

/** 정의 **/
const selectedItem = ref('0');
const selectedSex = ref('0');
const selectedJob = ref('0');
const tableFormat = ref('0');
const sexButtonController = ref('1');
const itemtable = ref<AllItem[]>([]);
const sliderValue = ref([0, 99]);
const dataLoading = ref(true)
const marks = {
  0: '0',
  10: '10',
  20: '20',
  30: '30',
  40: '40',
  50: '50',
  60: '60',
  70: '70',
  80: '80',
  90: '90',
  99: '99'
};
const selectOption = (group: 'item' | 'sex' | 'job', value: string) => {
  if (group === 'item') {
    selectedItem.value = value;
    if (selectedItem.value == '1' || selectedItem.value == '3') {
      sexButtonController.value = '0'
    } else {
      sexButtonController.value = '1'
      selectedSex.value = '0'
    }
  } else if (group === 'sex') {
    selectedSex.value = value;
  } else if (group === 'job') {
    selectedJob.value = value;
  }
};

/** 검색 함수 */
const searchItemList = async () => {

  const params = {
    'item': selectedItem.value,
    'sex': selectedSex.value,
    'job': selectedJob.value,
    'lmin': sliderValue.value[0],
    'lmax': sliderValue.value[1]
  };

  const queryString = new URLSearchParams(params).toString();

  try {
    const { data, error } = await useAsyncData('itemTableData', () =>
        $fetch(`/api/allitem?${queryString}`)
    );

    itemtable.value = data.value || [];

    if (selectedItem.value == '0') {
      tableFormat.value = '0'
    } else {
      tableFormat.value = '1'
    }
  } catch (err) {
    console.error('검색 중 오류 발생:', err);
    itemtable.value = [];
  }
};

/** 직업 함수 **/
const jobFormatter = (vals) => {
  if (vals == 0) {
    return '공통'
  } else if (vals == 1) {
    return '전사'
  } else if (vals == 2) {
    return '도적'
  } else if (vals == 3) {
    return '주술사'
  } else if (vals == 4) {
    return '도사'
  }
}

useSeoMeta({
  title: '바람위키 | 아이템 테이블 ',
  description: '바람의 나라 아이템 테이블 정보 ',
});

onMounted( () => {
  setTimeout(async () => {
    await searchItemList();
    dataLoading.value = false
  }, 100)
});

</script>

<style scoped lang="scss">
.screener-container {
  padding: 24px;
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 50px;
}

.screener-option-section, .screener-table-section {
  background-color: var(--panel-bg);
  border: 2px solid var(--border-color);
  border-radius: 12px;
  padding: 20px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  position: relative;
  overflow: hidden;
}

.screener-option-section {
  display: flex;
  flex-direction: column;
  gap: 20px;
  & > div:not(.search-button) {
    display: flex;
    width: 1200px;
    .screener-title {
      width: 100px;
      //height: 40px;
      padding: 10px 15px;
      color: var(--highlight);
      font-weight: bold;
    }
    .screener-option-box {
      display: flex;
      & > div:not(.level-slider) {
        border: 1px solid;
        display: flex;
        padding: 13px 20px;
        cursor: pointer;
      }
      & > div:hover {
        background-color: var(--secondary-bg);
      }
      .on {
        background-color: var(--secondary-bg);
      }
      .hide {
        pointer-events: none;
        opacity: 0.5;
      }
    }
  }
  .search-button:hover {
    color: var(--secondary-text);
    background-color: var(--secondary-bg);
    border-radius: 5px;
  }
  .search-button {
    display: flex;
    justify-content: center;
    //width: 100px;
    //height: 50px;
    margin: 0 auto;
    align-items: center;
    position: relative;
    cursor:pointer;
    padding: 15px 30px;
    color: var(--text-color);
    text-decoration: none;
    font-weight: bold;
    min-width: 80px;
    text-align: center;
    box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.2), 0 2px 5px rgba(0, 0, 0, 0.1);
  }
  .search-button::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, transparent 48%, var(--border-color) 48%, var(--border-color) 52%, transparent 52%);
    background-size: 5px 5px;
    clip-path: polygon(0% 15%, 15% 0%, 85% 0%, 100% 15%, 100% 85%, 85% 100%, 15% 100%, 0% 85%);
    opacity: 0.1;
    z-index: -1;
  }
  .search-button::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: var(--secondary-bg);
    clip-path: polygon(0% 15%, 15% 0%, 85% 0%, 100% 15%, 100% 85%, 85% 100%, 15% 100%, 0% 85%);
    border: 1px solid var(--border-color);
    transform: scale(1.02);
    z-index: -2;
  }
}

.screener-table-section {
  font-size: 12px;
  .allitem-table {
    width: 100%;
    thead {
      th {
        padding: 13px 10px;
        border: 1px solid var(--border-color);
        background-color: var(--secondary-bg);
      }
    }
    tbody {
      td {
        padding: 13px 10px;
        border: 1px solid var(--border-color);
        text-align: center;
        vertical-align: middle;
        img {
          width: 33px;
          height: 33px;
          object-fit: contain;
        }
      }
      td.lt {
        text-align: left !important;
      }
      td.monster-box {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 5px;
        .monster-card {
          position: relative;
          display: flex;
          justify-content: center;
          .monster-detail {
            img {
              width: 33px;
              height: 33px;
              cursor: pointer;
              object-fit: contain;
            }
          }
          .info {
            color: #fff;
            position: absolute; left: 0; top: -30px;
            background: rgba(0,0,0,0.5);
            box-sizing: border-box;
            width: auto;
            padding: 5px;
            opacity: 0;
            transition: opacity 0.35s ease-in-out;
            p {
              text-overflow: ellipsis;
              white-space: nowrap;
              text-transform: uppercase;
            }
          }
        }
        .monster-card:hover {
          .info {
            opacity: 1;
          }
        }
      }
    }
  }
}
.level-type-pos {
  .screener-option-box {
    width: 400px;
    .level-slider {
      display: flex;
      padding: 13px 20px;
      cursor: pointer;
    }
  }
}
</style>