// src/constants/index.ts
/**
 * ==========================================
 * 상수 파일 통합 Export
 * ==========================================
 * 모든 상수를 한 곳에서 import할 수 있도록 통합합니다.
 * 
 * @example
 * import { ERROR_CODES, API_ENDPOINTS, HTTP_STATUS } from '@/constants';
 */

// ==========================================
// 에러 코드
// ==========================================
export {
  ERROR_CODES,
  SUCCESS_CODES,
  isErrorCode,
  isSuccessCode,
  getErrorTitle,
  getErrorMessage,
  getErrorInfo,
  isAuthError,
  isValidationError,
  isServerError as isServerErrorCode,
  isNetworkError,
  toErrorDisplay,
  type ErrorCode,
  type SuccessCode,
  type ApiCode,
  type ErrorDisplay,
} from './errorCodes';

// ==========================================
// API 엔드포인트
// ==========================================
export {
  API_ENDPOINTS,
  queryKeys,
  isEndpointFunction,
  buildEndpoint,
  buildQueryString,
  buildUrl,
  type HttpMethod,
  type ApiResponse,
  type PaginatedResponse,
  type PaginationParams,
} from './apiEndpoints';

// ==========================================
// HTTP 상태 코드
// ==========================================
export {
  HTTP_STATUS,
  HTTP_STATUS_MESSAGES,
  isSuccess,
  isRedirect,
  isClientError,
  isServerError,
  isError,
  getStatusMessage,
  getStatusCategory,
  parseHttpStatus,
  type HttpStatusCode,
  type HttpStatusCategory,
  type HttpStatusInfo,
} from './httpStatus';

// ==========================================
// 추가 공통 상수
// ==========================================

/**
 * 로컬 스토리지 키
 */
export const STORAGE_KEYS = {
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
  USER_INFO: 'user_info',
  THEME: 'theme',
  LANGUAGE: 'language',
} as const;

/**
 * 세션 스토리지 키
 */
export const SESSION_KEYS = {
  TEMP_DATA: 'temp_data',
  FORM_STATE: 'form_state',
  REDIRECT_URL: 'redirect_url',
} as const;

/**
 * 페이지네이션 기본값
 */
export const PAGINATION_DEFAULTS = {
  PAGE: 1,
  PAGE_SIZE: 10,
  SIZE_OPTIONS: [10, 20, 50, 100] as const,
  MAX_SIZE: 100,
} as const;

/**
 * 타임아웃 설정 (밀리초)
 */
export const TIMEOUTS = {
  API_DEFAULT: 5000,              // 5초
  API_LONG: 30000,                // 30초
  DEBOUNCE: 300,                  // 0.3초
  TOAST: 3000,                    // 3초
} as const;

/**
 * 정규식 패턴
 */
export const REGEX_PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  PHONE_KR: /^01[0-9]-?[0-9]{3,4}-?[0-9]{4}$/,
  URL: /^https?:\/\/.+/,
  NUMERIC: /^\d+$/,
  ALPHANUMERIC: /^[a-zA-Z0-9]+$/,
  KOREAN: /^[가-힣]+$/,
} as const;

/**
 * 파일 업로드 제한
 */
export const FILE_LIMITS = {
  MAX_SIZE: 10 * 1024 * 1024,     // 10MB
  IMAGE_MAX_SIZE: 5 * 1024 * 1024, // 5MB
  
  ALLOWED_IMAGES: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'] as const,
  ALLOWED_DOCUMENTS: [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ] as const,
  
  IMAGE_EXTENSIONS: ['.jpg', '.jpeg', '.png', '.gif', '.webp'] as const,
  DOCUMENT_EXTENSIONS: ['.pdf', '.doc', '.docx'] as const,
} as const;

/**
 * 날짜 포맷
 */
export const DATE_FORMATS = {
  DATE: 'YYYY-MM-DD',
  DATETIME: 'YYYY-MM-DD HH:mm:ss',
  TIME: 'HH:mm:ss',
  YEAR_MONTH: 'YYYY-MM',
  MONTH_DAY: 'MM-DD',
} as const;

/**
 * 애니메이션 지속 시간 (밀리초)
 */
export const ANIMATION_DURATIONS = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
} as const;

/**
 * Z-Index 레벨
 */
export const Z_INDEX = {
  DROPDOWN: 1000,
  STICKY: 1020,
  FIXED: 1030,
  MODAL_BACKDROP: 1040,
  MODAL: 1050,
  POPOVER: 1060,
  TOOLTIP: 1070,
  TOAST: 1080,
} as const;

/**
 * 디바이스 타입
 */
export const DEVICE_TYPES = {
  MOBILE: 'mobile',
  TABLET: 'tablet',
  DESKTOP: 'desktop',
} as const;

/**
 * 테마
 */
export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
  AUTO: 'auto',
} as const;

/**
 * 언어
 */
export const LANGUAGES = {
  KO: 'ko',
  EN: 'en',
} as const;

/**
 * 환경
 */
export const ENVIRONMENTS = {
  DEVELOPMENT: 'development',
  STAGING: 'staging',
  PRODUCTION: 'production',
} as const;

// ==========================================
// 타입 추출
// ==========================================

export type StorageKey = typeof STORAGE_KEYS[keyof typeof STORAGE_KEYS];
export type SessionKey = typeof SESSION_KEYS[keyof typeof SESSION_KEYS];
export type DeviceType = typeof DEVICE_TYPES[keyof typeof DEVICE_TYPES];
export type Theme = typeof THEMES[keyof typeof THEMES];
export type Language = typeof LANGUAGES[keyof typeof LANGUAGES];
export type Environment = typeof ENVIRONMENTS[keyof typeof ENVIRONMENTS];

// ==========================================
// 유틸리티 타입
// ==========================================

/**
 * 상수 객체의 값을 Union 타입으로 추출
 */
export type ValueOf<T> = T[keyof T];

/**
 * 읽기 전용 재귀 타입
 */
export type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};
