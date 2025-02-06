# 📎 PROJECT :: BARMIN

![thumbnail](https://res.cloudinary.com/dab5xf29a/image/upload/v1738451253/barmin_x3r626.png)

## 👀 서비스 소개

- 서비스명: BARMIN
- 서비스 설명: 주변 철봉 탐색 및 사용자 평가 기능을 통해 최적의 운동 환경을 제공
  <br>

## 📅 프로젝트 기간

2024.09.14 ~ 2024.10.26 (6주)
<br>

## ⭐ 주요 기능

- **랜딩 페이지**

  - 사용자 접속 시 서비스에 대한 전반적인 기능 소개 및 안내 제공
  - 직관적인 UI와 UX로 사용자가 빠르게 기능을 이해할 수 있도록 설계

- **회원가입**

  - 아이디와 이메일 실시간 중복 체크
  - 중복된 아이디나 이메일 사용을 방지하여 사용자 관리 효율성 증가
  - 사용자가 중복 여부를 바로 확인하고 가입을 진행할 수 있도록 함

- **로그인 / 로그아웃**

  - 정보를 입력하고 수정 및 삭제하기 위해 로그인을 강제함
  - 안전한 사용자 `local` 인증 절차를 제공하며, `JWT`를 사용하여 보안 강화
  - 로그인 상태 유지 및 로그아웃 기능 제공, 사용자 경험 향상

- **현재 위치 탐색**

  - `Geolocation API`를 통해 사용자 위치를 실시간으로 파악하고 주변 철봉 위치를 지도에 표시
  - 빠르게 근처의 철봉을 찾을 수 있도록 도와주는 기능

- **지도 및 리스트 필터링**

  - 지도에서 범위를 설정하여 그 안에 있는 철봉만 표시
  - 원하는 지역을 입력하면 자동으로 해당 지역의 철봉만 리스트로 필터링

- **상세 페이지 접근**

  - 철봉 위치를 클릭하여 상세 페이지로 이동
  - 철봉에 대한 자세한 정보를 제공하며, 사진, 설명 및 사용자의 피드백을 함께 확인 가능

- **장소 관리**

  - 사용자 편의를 위한 직관적인 장소 추가 기능
  - 이미 등록된 장소에 대해 수정을 요청하거나 삭제할 수 있는 관리 기능

- **장소 소개 및 사용자 평가**

  - 장소마다 다양한 사진을 슬라이드로 제공하여 시각적 정보 제공
  - 사용자들이 장소에 대한 평가와 피드백을 별점 시스템으로 남길 수 있도록 함

- **사용자 프로필**
  - 사용자가 본인의 철봉 위치 기록을 확인하고, 수정하거나 삭제할 수 있는 기능 제공
  - 회원 정보를 언제든지 수정하고, 개인정보 관리 기능을 제공

## 🔨 기술 스택

<table>
    <tr>
        <th>구분</th>
        <th>내용</th>
    </tr>
    <tr>
        <td>사용 언어</td>
        <td>
            <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=white"/>
        </td>
    </tr>
    <tr>
        <td>클라이언트</td>
        <td>
            <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white"/>
            <img src="https://img.shields.io/badge/ReactRouter-CA4245?style=for-the-badge&logo=ReactRouter&logoColor=white"/>
            <img src="https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=TailwindCSS&logoColor=white"/>
            <img src="https://img.shields.io/badge/Zustand-000000?style=for-the-badge&logo=Zustand&logoColor=white"/>
            <img src="https://img.shields.io/badge/Animate.css-00C4CC?style=for-the-badge&logo=CSS&logoColor=white"/>
            <img src="https://img.shields.io/badge/Swiper-6332B1?style=for-the-badge&logo=Swiper&logoColor=white"/>
            <img src="https://img.shields.io/badge/Axios-5A29E3?style=for-the-badge&logo=Axios&logoColor=white"/>
        </td>
    </tr>
    <tr>
        <td>서버</td>
        <td>
            <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=Express&logoColor=white"/>
            <img src="https://img.shields.io/badge/Passport.js-34E27A?style=for-the-badge&logo=passport&logoColor=white"/>
            <img src="https://img.shields.io/badge/Multer-FFCA28?style=for-the-badge&logo=Multer&logoColor=white"/>
            <img src="https://img.shields.io/badge/Joi-4A3B8C?style=for-the-badge&logo=Joi&logoColor=white"/>
        </td>
    </tr>
    <tr>
        <td>데이터베이스</td>
        <td>
            <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=MongoDB&logoColor=white"/>
            <img src="https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=Cloudinary&logoColor=white"/>
        </td>
    </tr>
        <td>API</td>
        <td>
            <img src="https://img.shields.io/badge/KakaoMap-FFCD00?style=for-the-badge&logo=Kakao&logoColor=white"/>
        </td>
    </tr>
    <tr>
        <td>빌드 도구</td>
        <td>
            <img src="https://img.shields.io/badge/Vite-4FC08D?style=for-the-badge&logo=Vite&logoColor=white"/>
        </td>
    </tr>
    <tr>
        <td>호스팅</td>
        <td>
            <img src="https://img.shields.io/badge/Render-00B3E3?style=for-the-badge&logo=Render&logoColor=white"/>
        </td>
    </tr>
    <tr>
        <td>버전 관리</td>
        <td>
            <img src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=Git&logoColor=white"/>
            <img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=GitHub&logoColor=white"/>
        </td>
    </tr>
</table>

<br>

## ⚙ 소프트웨어 아키텍처

![소프트웨어 아키텍처](https://res.cloudinary.com/dab5xf29a/image/upload/v1738839558/barmin-architecture_qjultt.png)
<br>

## 🖥 주요 화면 구성

### 메인

![image](https://res.cloudinary.com/dab5xf29a/image/upload/v1738453123/1_kavutk.png)
<br>

### 로그인

![image](https://res.cloudinary.com/dab5xf29a/image/upload/v1738453139/2_awg0mf.png)
<br>

### 회원가입

![image](https://res.cloudinary.com/dab5xf29a/image/upload/v1738453146/3_mxgun6.png)
<br>

### 위치 정보

![image](https://res.cloudinary.com/dab5xf29a/image/upload/v1738453154/4_cxitqf.png)
<br>

### 새 정보 등록

![image](https://res.cloudinary.com/dab5xf29a/image/upload/v1738453162/5_rxofju.png)
<br>

### 프로필

![image](https://res.cloudinary.com/dab5xf29a/image/upload/v1738453168/6_cwnnxj.png)
<br>

## 📂 프로젝트 구조

```
barmin/
├── client/                  # React (Vite) 클라이언트
│   ├── public/              # 정적 파일
│   ├── src/                 # React 소스 코드
│   │   ├── components/      # 재사용 가능한 컴포넌트
│   │   ├── config/          # 환경 설정
│   │   ├── layouts/         # 공통 레이아웃
│   │   ├── reducer/         # Reducer 로직
│   │   ├── routes/          # React Router 설정
│   │   ├── styles/          # 스타일 파일 (CSS)
│   │   ├── views/           # 페이지 컴포넌트
│   │   ├── zustand/         # Zustand 상태 관리
│   │   ├── App.jsx          # 메인 앱 컴포넌트
│   │   └── main.jsx         # 진입점 파일
│   ├── package.json         # 클라이언트 의존성 및 스크립트
│   └── .env                 # 클라이언트 환경 변수
│
├── config/                  # 서버 설정 파일
├── controllers/             # Express 컨트롤러
├── models/                  # 데이터베이스 모델 (Mongoose)
├── routes/                  # Express 라우터 (API 엔드포인트)
├── utils/                   # 유틸리티 함수
│
├── .env                     # 서버 환경 변수 파일
├── .gitignore               # Git 무시 파일
├── package.json             # 서버 의존성 및 스크립트
├── server.js                # Express 서버 진입점
├── middlewares.js           # 커스텀 미들웨어
└── README.md                # 프로젝트 설명 파일
```

<br>

## ⚙️ **프로젝트 설정**

```bash
# 빌드
npm run build

# 서버 실행
npm run server
```
