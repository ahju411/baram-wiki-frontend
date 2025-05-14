
![screencapture-baramwiki-2025-05-14-09_41_22](https://github.com/user-attachments/assets/f625dcd3-0312-4d3d-92f1-753cb8f8b173)

# 바람의나라 아이템 도감

_바람의나라 게임 정보를 쉽게 찾아보고 검색할 수 있는 웹 서비스_

https://www.baramwiki.com

## 🪄 소개

> 바람의나라 게임 아이템, 몬스터, 맵, 스킬 정보를 손쉽게 검색하고 찾아볼 수 있는 서비스입니다.
> 실시간 검색 기능과 상세 필터링을 통해 원하는 정보를 빠르게 찾아보세요!

## 📱 주요 기능

- 실시간 통합 검색 (아이템/몬스터/맵/스킬)
- 아이템 상세 정보 및 필터링 검색
- 직업별 스킬 정보
- 레벨별 사냥터 가이드
- 경험치 계산기
- 반응형 디자인

## 🛠 기술 스택

<img src="https://img.shields.io/badge/Nuxt.js-00DC82?style=for-the-badge&logo=Nuxt.js&logoColor=white"/>
<img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white"/>
<img src="https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=Sass&logoColor=white"/>

## 📂 폴더 구조

```

├── assets/
│ └── main.scss
├── components/
│ ├── Header.vue
│ ├── Footer.vue
│ └── level/
│ └── ExpCard.vue
├── layouts/
│ └── default.vue
├── pages/
│ ├── index.vue
│ ├── item/
│ │ └── [id].vue
│ ├── item-table/
│ │ └── index.vue
│ ├── monster/
│ │ └── [id].vue
│ ├── map/
│ │ └── level.vue
│ ├── skill/
│ │ └── [id].vue
│ └── level/
│ ├── exp.vue
│ └── calc.vue
├── server/
│ └── api/
│ ├── item/
│ ├── monster/
│ ├── map/
│ ├── skill/
│ └── search/
├── types/
│ ├── item.ts
│ ├── monster.ts
│ ├── map.ts
│ ├── skill.ts
│ ├── allitem.ts
│ └── search.ts
├── scripts/
│ └── generate-sitemap.js
└── public/

```

## 🚀 시작하기

1. 의존성 설치

```bash
npm install
# or
yarn install
```

2. 개발 서버 실행

```bash
npm run dev
# or
yarn dev
```

3. 빌드

```bash
npm run build
# or
yarn build
```

## 📌 주요 기능 설명

### 통합 검색

- 실시간 검색 기능 제공
- 아이템/몬스터/맵/스킬 통합 검색 결과
- 검색어 하이라이팅
- 모바일 최적화된 검색 인터페이스

### 아이템 테이블

- 상세 필터링 (직업/성별/레벨)
- 아이템 비교 기능
- 정렬 기능

### 레벨별 사냥터

- 레벨 범위별 사냥터 정보
- 몬스터 정보 및 드롭 아이템
- 지역별 구분

### 직업별 스킬

- 직업별 스킬 트리
- 스킬 상세 정보
- 필요 아이템 정보

### 경험치 시스템

- 레벨별 필요 경험치 정보
- 경험치 계산기
- 직업별 경험치 테이블

## 🖼 스크린샷

### 메인화면
![screencapture-baramwiki-2025-05-14-09_41_22](https://github.com/user-attachments/assets/1687b619-6a78-4e47-8cf2-7e0638cb02f4)

### 아이템 정보
![screencapture-baramwiki-item-I208572-2025-05-14-09_46_00](https://github.com/user-attachments/assets/0e137e5a-ca1a-47ef-8dcb-0faed57b3795)

### 몬스터 정보
![screencapture-baramwiki-monster-MO041612-2025-05-14-09_46_53](https://github.com/user-attachments/assets/245eb2e5-892a-40f2-97c7-9d5ca901e8fb)

### 아이템 테이블 (스크리너)
![screencapture-baramwiki-item-table-2025-05-14-09_41_55](https://github.com/user-attachments/assets/b4ca7886-461a-4605-82c7-e6a3dd124666)

### 지도
![screencapture-baramwiki-map-all-000860-2025-05-14-09_42_41](https://github.com/user-attachments/assets/5a1634fe-ab92-4ca0-8ed2-f2e86a2c52bb)

### 길찾기
![screencapture-baramwiki-map-findmap-2025-05-14-09_43_40](https://github.com/user-attachments/assets/05c4de3c-f407-48ae-b7f6-6822298aee57)

