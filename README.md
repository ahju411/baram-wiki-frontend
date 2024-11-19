# 바람의나라 아이템 도감

_바람의나라 게임 정보를 쉽게 찾아보고 검색할 수 있는 웹 서비스_

https://www.baramwiki.com

## 🪄 소개

> 바람의나라 게임 아이템, 몬스터, 맵, 스킬 정보를 손쉽게 검색하고 찾아볼 수 있는 서비스입니다.
> 실시간 검색 기능과 상세 필터링을 통해 원하는 정보를 빠르게 찾아보세요!

## 🖼 스크린샷

### 메인 페이지

[스크린샷 추가 예정]

### 아이템 검색

[스크린샷 추가 예정]

### 레벨별 사냥터

[스크린샷 추가 예정]

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
