<template>
  <template
      v-if="props.ldata && props.mdata"
      v-for="(item, index) in props.ldata"
      :key="index"
  >
    <div class="king-card">
      <div class="title">{{ titleFormat(item[0].job) }} 왕퀘스트 횟수</div>
      <div class="king-table">
        <table>
          <thead>
            <tr>
              <th class="ct">레벨</th>
              <th class="ct">필요경험치</th>
              <th v-for="(value, key) in mdata" :key="key" class="ct head-monster">
                <NuxtLink :to="`/monster/${value.mob_id}`">
                  <div class="left">
                    <NuxtImg
                        :src="`https://evfuckbgifbr27188584.gcdn.ntruss.com/monster/${value.images}`"
                    ></NuxtImg>
                  </div>
                  <div class="right">
                    <p>{{ key }}</p>
                    <p>({{ formatNumber(value.exp * 10) }})</p>
                  </div>
                </NuxtLink>
              </th>
            </tr>
          </thead>
          <tbody>
          <tr
              v-for="(lvl, index) in levelFormat(item)"
              :key="index"
          >
            <td class="ct">{{ lvl.level }}</td>
            <td class="rt">{{ formatNumber(lvl.exp) }}</td>
            <td
                v-for="(value, key) in mdata"
                :key="key"
                class="ct"
            >
              {{ expFormat(lvl.exp, value.exp) }} 회
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps({
  ldata: {
    type: Array,
    required: true
  },
  mdata : {
    type: Array,
    required: true
  },
  activeId: {
    type: String,
    required: true,
  }
})

const formatNumber = (num: number) => {
  return new Intl.NumberFormat().format(num);
};

const titleFormat = (vals) => {
  if (vals == "w") return "전사";
  else if (vals == "n") return "도적";
  else if (vals == "p") return "주술사";
  else return "도사";
};

const expFormat = (exp, mobExp) => {
  if (!mobExp || mobExp === 0) return "N/A";
  return Math.ceil(exp / (mobExp * 10));
};

const levelFormat = (data) => {
  if (props.activeId == '1') {
      return data.slice(0, 14)
  } else if (props.activeId == '2') {
      return data.slice(14, 34)
  } else if (props.activeId == '3') {
      return data.slice(34, 43)
  }
}

</script>

<style scoped lang="scss">
.king-card {
  font-size: 12px;
  background-color: var(--panel-bg);
  border: 2px solid var(--border-color);
  border-radius: 12px;
  padding: 15px 20px;
  .title {
    font-size: 18px;
    margin-bottom: 40px;
    font-weight: bold;
    color: var(--highlight);
  }
  .king-table {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 25px;
    justify-content: center;
    overflow-x: auto;
    .highlight {
      background-color: rgba(44, 34, 25, 0.6);
    }
  }
  table {
    thead {
      tr {
        .ct {
          text-align: center;
        }
        th {
          vertical-align: middle;
          border: 1px solid var(--border-color);
          padding: 10px 13px;
          background-color: var(--main-bg);
        }
        .head-monster {
          box-sizing: border-box;
          .left {
              img {
                width: 40px;
                height: 40px;
                object-fit: contain;
              }
          }
          .right {
            color: var(--text-color) !important;
          }
        }
      }
    }
    tbody {
      tr {
        .ct {
          text-align: center;
        }
        .rt {
          text-align: right;
        }
        td {
          border: 1px solid var(--border-color);
          padding: 10px 13px;
        }
        td:first-child {
          background-color: var(--hover-highlight);
        }
      }
      tr:hover {
        background-color: var(--hover-highlight);
      }
    }
  }
}
</style>