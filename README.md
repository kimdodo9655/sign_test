# sign-front

전자서명 front

<br><br>

## 🚀 Demo

👉 [https://](https://) (가상 링크)

<br><br>

## 🛠️ 기술 스택

| 항목                  | 기술                    |
| --------------------- | ----------------------- |
| 프론트엔드 프레임워크 | Vue 3 (Composition API) |
| 빌드 도구             | Vite                    |
| 상태 관리             | Pinia                   |
| 라우팅                | Vue Router              |
| 타입 시스템           | TypeScript              |
| HTTP 통신             | Axios + Vue-query       |
| 아이콘                | Flaticon, iconoir       |
| Node                  | 22.X.X                  |
| npm                   | 11.X.X                  |

### 📦 Node.js 버전 지원 정책 (2025.07 기준)

| 버전               | Current 출시일 | Active LTS 시작   | Maintenance LTS 시작 | EOL (지원 종료) |
| ------------------ | -------------- | ----------------- | -------------------- | --------------- |
| **22.x (Jod)**     | 2024-04-24     | 2024-10-29        | 2025-10-21           | 2027-04-30      |
| **24.x (Krypton)** | 2025-05-06     | 2025-10-28 (예정) | 2026-10-20           | 2028-04-30      |

> ✅ **현재 기준(2025.07.22) 안정적인 개발 버전은 Node.js 22입니다.**  
> ⚠️ 다만, 약 **3개월 뒤인 2025년 10월 21일**, Active LTS가 종료되고 Maintenance LTS로 전환됩니다.  
> 🛠️ Node.js 22의 공식 지원 종료일(EOL)은 **2027년 4월 30일**로, 약 **1년 9개월의 유지보수 지원**이 남아 있습니다.

### 📌 장기 프로젝트 권장 사항

Node.js 22를 사용 중인 경우, **2027년 이전에 Node.js 24 이상 버전으로의 마이그레이션**을 계획하는 것이 좋습니다.

<br><br>

## Project Tree

```
(추후작성예정)
```

<br><br>

## 📦 설치 및 실행 방법

```
# 1. 저장소 클론
git clone https://github.com/your-id/name.git
cd name

# 2. 패키지 설치
npm install

# 3. 개발 서버 실행
npm run dev

# 4. 프로덕션 빌드
npm run build
```

<br><br>

## 🖼️ 사용 자산(Assets) 라이선스

이 프로젝트는 다음 외부 자산을 포함하고 있으며,  
각 자산은 해당 제작자의 라이선스 조건을 준수하여 사용되고 있습니다.

| 자산명                 | 라이선스 종류                                   | 제작자 / 소유자      | 확인일     | 출처                                                                                 |
| ---------------------- | ----------------------------------------------- | -------------------- | ---------- | ------------------------------------------------------------------------------------ |
| **Iconoir**            | MIT License                                     | Luca Burgio          | 2025-10-22 | [https://github.com/iconoir-icons/iconoir](https://github.com/iconoir-icons/iconoir) |
| **Flaticon (Premium)** | Premium License (무제한 사용, 출처 표기 불필요) | Freepik Company S.L. | 2025-10-22 | [https://www.flaticon.com](https://www.flaticon.com)                                 |

📁 라이선스 관련 증빙 문서는  
[`/docs/licenses/`](./docs/licenses/) 경로에 보관되어 있습니다.

- `iconoir-license-2025-10-22.pdf` — Iconoir 오픈소스 MIT 라이선스 원문
- `license-192294110-8722658.pdf` — Flaticon Premium License 대표 증서 (Licensee: onestep192294110)  
  _(Flaticon 아이콘별 개별 라이선스 문서는 회사 내부에서 별도 보관 중입니다.)_

<br><br>

> ⚠️ **참고 사항**
>
> - **Iconoir** 아이콘은 MIT License(© 2021 Luca Burgio)에 따라 자유롭게 사용됩니다.
> - **Flaticon** 아이콘은 **Premium License (No Attribution)** 조건하에 사용되며,  
>   유료 구독 사용자(onestep192294110)가 상업적으로 무제한 사용할 수 있습니다:contentReference[oaicite:0]{index=0}.
> - Flaticon의 각 아이콘은 개별 Premium 라이선스로 보호되며,  
>   본 저장소에는 대표 증서 한 부만 공개 보관되어 있습니다.
> - Flaticon 콘텐츠는 재판매, 재배포 또는 다운로드 제공 형태로 전송할 수 없으며,  
>   Flaticon의 이용약관([https://www.flaticon.com/terms-of-use](https://www.flaticon.com/terms-of-use))이 최종적으로 우선합니다.

<br><br>

```
sign-front_local
├─ README.md
├─ index.html
├─ package-lock.json
├─ package.json
├─ public
│  ├─ favicon
│  │  ├─ android-icon-144x144.png
│  │  ├─ android-icon-192x192.png
│  │  ├─ android-icon-36x36.png
│  │  ├─ android-icon-48x48.png
│  │  ├─ android-icon-72x72.png
│  │  ├─ android-icon-96x96.png
│  │  ├─ apple-icon-114x114.png
│  │  ├─ apple-icon-120x120.png
│  │  ├─ apple-icon-144x144.png
│  │  ├─ apple-icon-152x152.png
│  │  ├─ apple-icon-180x180.png
│  │  ├─ apple-icon-57x57.png
│  │  ├─ apple-icon-60x60.png
│  │  ├─ apple-icon-72x72.png
│  │  ├─ apple-icon-76x76.png
│  │  ├─ apple-icon-precomposed.png
│  │  ├─ apple-icon.png
│  │  ├─ browserconfig.xml
│  │  ├─ favicon-16x16.png
│  │  ├─ favicon-32x32.png
│  │  ├─ favicon-96x96.png
│  │  ├─ favicon.ico
│  │  ├─ manifest.json
│  │  ├─ ms-icon-144x144.png
│  │  ├─ ms-icon-150x150.png
│  │  ├─ ms-icon-310x310.png
│  │  └─ ms-icon-70x70.png
│  ├─ fonts
│  │  └─ pretendard
│  │     ├─ LICENSE.txt
│  │     ├─ woff
│  │     │  ├─ Pretendard-ExtraBold.woff
│  │     │  ├─ Pretendard-Light.woff
│  │     │  ├─ Pretendard-Regular.woff
│  │     │  └─ Pretendard-SemiBold.woff
│  │     └─ woff2
│  │        ├─ Pretendard-ExtraBold.woff2
│  │        ├─ Pretendard-Light.woff2
│  │        ├─ Pretendard-Regular.woff2
│  │        └─ Pretendard-SemiBold.woff2
│  └─ pdf
│     └─ pdf.pdf
├─ src
│  ├─ App.vue
│  ├─ api
│  │  ├─ client.ts
│  │  ├─ index.ts
│  │  ├─ services.ts
│  │  └─ types.ts
│  ├─ assets
│  │  ├─ font
│  │  │  ├─ NotoSansKR-Regular.ttf
│  │  │  ├─ NotoSansKR-SemiBold.ttf
│  │  │  └─ OneMobileTitle.ttf
│  │  ├─ images
│  │  │  ├─ icons
│  │  │  └─ logo
│  │  │     ├─ bankclear_logo.png
│  │  │     ├─ bankclear_logo_bk.png
│  │  │     ├─ bankclear_logo_gray.png
│  │  │     └─ test_bank_logo.png
│  │  └─ styles
│  │     ├─ _device.scss
│  │     ├─ _mixins.scss
│  │     ├─ _reset.scss
│  │     ├─ _typography.scss
│  │     ├─ _variables.scss
│  │     └─ global.scss
│  ├─ components
│  │  ├─ TokenCountdown.vue
│  │  ├─ dev
│  │  │  ├─ ApiTester.vue
│  │  │  └─ DeviceTestController.vue
│  │  ├─ layout
│  │  │  ├─ AccountPopover.vue
│  │  │  ├─ AppBreadcrumbs.vue
│  │  │  ├─ AppFooter.vue
│  │  │  ├─ AppHeader.vue
│  │  │  ├─ DevBanner.vue
│  │  │  ├─ NotificationsPopover.vue
│  │  │  └─ OverlayScrollbar.vue
│  │  ├─ pre-auth
│  │  │  ├─ SecCertification.vue
│  │  │  ├─ SecGuide.vue
│  │  │  ├─ SecHelp.vue
│  │  │  ├─ SecInstall.vue
│  │  │  ├─ SecSupport.vue
│  │  │  └─ SecVerification.vue
│  │  ├─ signature-list
│  │  └─ ui
│  │     ├─ AlertModal.vue
│  │     ├─ ConfirmModal.vue
│  │     ├─ LoadingOverlay.vue
│  │     └─ ToastList.vue
│  ├─ composables
│  │  ├─ useAuth.ts
│  │  ├─ useDeviceDetection.ts
│  │  ├─ useNavigation.ts
│  │  ├─ usePerformance.ts
│  │  ├─ useScrollNavigation.ts
│  │  └─ useUI.ts
│  ├─ config
│  │  └─ environment.ts
│  ├─ main.ts
│  ├─ router
│  │  └─ index.ts
│  ├─ stores
│  │  ├─ auth.ts
│  │  └─ ui.ts
│  ├─ types
│  │  ├─ components.ts
│  │  ├─ env.d.ts
│  │  ├─ pdf-vue3.d.ts
│  │  └─ utils.ts
│  ├─ utils
│  │  ├─ apiHelpers.ts
│  │  ├─ env.ts
│  │  └─ performance.ts
│  ├─ views
│  │  ├─ AboutView.vue
│  │  ├─ HomeView.vue
│  │  ├─ NotFoundView.vue
│  │  └─ PreAuthView.vue
│  └─ vite-env.d.ts
├─ tsconfig.app.json
├─ tsconfig.json
├─ tsconfig.node.json
└─ vite.config.ts

```