# 바람의나라 아이템 도감

_게임 아이템 정보를 쉽게 찾아보고 검색할 수 있는 웹 서비스_

## 🪄 소개

> 바람의나라 게임 아이템, 몬스터, 맵 정보를 손쉽게 검색하고 찾아볼 수 있는 서비스입니다.
> 실시간 검색 기능을 통해 원하는 정보를 빠르게 찾아보세요!

## 📱 주요 기능

- 실시간 통합 검색 (아이템/몬스터/맵)
- 아이템 상세 정보 조회
- 몬스터 정보 조회
- 반응형 디자인

## 🛠 기술 스택

<img src="https://img.shields.io/badge/Nuxt.js-00DC82?style=for-the-badge&logo=Nuxt.js&logoColor=white"/>
<img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white"/>
<img src="https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=Sass&logoColor=white"/>

## 📂 폴더 구조

```
├── components/
│   ├── Header.vue
│   └── Footer.vue
├── layouts/
│   └── default.vue
├── pages/
│   ├── index.vue
│   ├── item/
│   │   └── [id].vue
│   └── monster/
│       └── [id].vue
├── server/
│   └── api/
│       ├── item/
│       ├── monster/
│       └── search/
├── types/
│   ├── item.ts
│   ├── monster.ts
│   └── search.ts
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
- 아이템/몬스터/맵 통합 검색 결과
- 검색어 하이라이팅

### 상세 정보
- 아이템 상세 스펙
- 몬스터 정보
- 이미지 미리보기