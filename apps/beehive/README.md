# Beehive Frontend

소규모 창업자를 위한 고객 및 재고 관리 시스템의 프론트엔드 애플리케이션입니다.

## 🏗️ 프로젝트 구조

```
src/
├── api/                    # API 요청 함수들
│   ├── client.ts          # API 클라이언트 설정
│   ├── auth.ts            # 인증 관련 API
│   └── inventory.ts       # 재고 관리 API
├── components/
│   ├── common/            # 재사용 가능한 공통 컴포넌트
│   │   ├── Layout.tsx     # 메인 레이아웃
│   │   ├── Header.tsx     # 헤더 컴포넌트
│   │   ├── Sidebar.tsx    # 사이드바 네비게이션
│   │   └── LoadingSpinner.tsx
│   └── features/          # 기능별 컴포넌트
│       ├── auth/          # 인증 관련 UI 컴포넌트
│       ├── dashboard/     # 대시보드 관련 UI 컴포넌트
│       ├── inventory/     # 재고 관리 관련 UI 컴포넌트
│       └── customers/     # 고객 관리 관련 UI 컴포넌트
├── hooks/                 # 커스텀 훅
│   ├── useAuth.ts         # 인증 상태 관리
│   └── useInventory.ts    # 재고 관련 상태 관리
├── routes/                # TanStack Router 라우트 파일
│   ├── login.tsx          # 로그인 페이지
│   ├── dashboard.tsx      # 대시보드 페이지
│   ├── inventory.tsx      # 재고 관리 페이지
│   └── customers.tsx      # 고객 관리 페이지
├── types/                 # TypeScript 타입 정의
├── utils/                 # 유틸리티 함수들
│   ├── constants.ts       # 상수 정의
│   └── formatters.ts      # 포매터 함수들
└── assets/                # 정적 파일 (이미지, 폰트 등)
```

## 🚀 주요 기능

### 📊 대시보드

- 실시간 재고 현황
- 매출 통계
- 최근 활동 내역
- 재고 부족 알림

### 📦 재고 관리

- 상품 등록/수정/삭제
- 입출고 관리
- 재고 이력 추적
- 카테고리별 분류
- 재고 부족 알림

### 👥 고객 관리

- 고객 정보 등록/관리
- 구매 이력 조회
- 고객 등급 관리

### 🏢 거래처 관리

- 공급업체/고객 정보 관리
- 거래 내역 추적

## 🛠️ 기술 스택

- **프레임워크**: React 19 + Vite
- **라우팅**: TanStack Router
- **상태 관리**: React Hooks + Custom Hooks
- **UI 컴포넌트**: Shadcn/ui + Tailwind CSS
- **차트**: ECharts
- **타입스크립트**: 완전한 타입 안전성
- **빌드 도구**: Vite
- **패키지 매니저**: pnpm

## 📋 개발 명령어

```bash
# 개발 서버 시작
pnpm dev

# 프로덕션 빌드
pnpm build

# 린트 검사
pnpm lint

# 타입 체크
pnpm type-check
```

## 🔧 환경 설정

`.env.example`을 복사하여 `.env` 파일을 생성하고 환경 변수를 설정하세요.

```bash
cp .env.example .env
```

### 환경 변수

- `VITE_API_URL`: 백엔드 API 서버 URL
- `VITE_APP_NAME`: 애플리케이션 이름
- `VITE_APP_VERSION`: 애플리케이션 버전

## 🎨 디자인 시스템

### 색상 팔레트

- **Primary**: `#FFD54F` (Yellow)
- **Primary Dark**: `#1A237E` (Indigo)
- **Secondary**: `#2C3E50` (Dark Blue)
- **Background**: `#ECF0F1` (Light Gray)
- **Success**: `#4CAF50` (Green)
- **Error**: `#E57373` (Red)

### 컴포넌트 스타일링

- Tailwind CSS 기반 유틸리티 클래스
- 일관된 디자인 시스템
- 반응형 디자인 지원

## 📱 반응형 디자인

모바일, 태블릿, 데스크톱 환경에 최적화된 반응형 UI를 제공합니다.

## 🔒 인증

JWT 기반 인증 시스템을 사용하며, 로그인 상태는 전역적으로 관리됩니다.

## 🚦 라우팅

TanStack Router를 사용하여 타입 안전한 라우팅을 구현했습니다.

## 📈 상태 관리

복잡한 상태 관리 라이브러리 대신 React의 내장 훅과 커스텀 훅을 활용합니다.

## 🧪 개발 가이드라인

1. **컴포넌트 분리**: 기능별로 컴포넌트를 분리하여 재사용성을 높입니다.
2. **타입 안전성**: 모든 컴포넌트와 함수에 적절한 TypeScript 타입을 적용합니다.
3. **커스텀 훅**: 비즈니스 로직은 커스텀 훅으로 분리합니다.
4. **API 레이어**: API 호출은 전용 레이어에서 관리합니다.
5. **일관된 스타일링**: 디자인 시스템을 준수하여 일관된 UI를 유지합니다.
