// src/constants/errorCodes.ts
/**
 *
 *
 * 비즈니스 로직이나 내가 프론트에서 분기 태워야 하는 경우 여기에 상수로 등록.
 *
 *
 * ==========================================
 * 에러 코드 상수 정의
 * ==========================================
 * 백엔드 API에서 반환하는 에러 코드를 관리합니다.
 *
 * @example
 * // 사용 예시
 * if (response.code === ERROR_CODES.AUTH.INVALID_CREDENTIALS) {
 *   showError('아이디 또는 비밀번호가 올바르지 않습니다.');
 * }
 */

export const ERROR_CODES = {
  // ==========================================
  // 인증/인가 관련 에러
  // ==========================================
  AUTH: {
    UNAUTHORIZED: "AUTH_001", // 인증되지 않음
    INVALID_TOKEN: "AUTH_002", // 유효하지 않은 토큰
    TOKEN_EXPIRED: "AUTH_003", // 토큰 만료
    INVALID_CREDENTIALS: "AUTH_004", // 잘못된 인증 정보
    ACCOUNT_LOCKED: "AUTH_005", // 계정 잠김
    ACCOUNT_DISABLED: "AUTH_006", // 계정 비활성화
    PERMISSION_DENIED: "AUTH_007", // 권한 없음
  },

  // ==========================================
  // 사용자 관련 에러
  // ==========================================
  USER: {
    NOT_FOUND: "USER_001", // 사용자를 찾을 수 없음
    ALREADY_EXISTS: "USER_002", // 이미 존재하는 사용자
    INVALID_EMAIL: "USER_003", // 유효하지 않은 이메일
    INVALID_PASSWORD: "USER_004", // 유효하지 않은 비밀번호
    EMAIL_NOT_VERIFIED: "USER_005", // 이메일 인증 안됨
  },

  // ==========================================
  // 검증 에러
  // ==========================================
  VALIDATION: {
    REQUIRED_FIELD: "VAL_001", // 필수 필드 누락
    INVALID_FORMAT: "VAL_002", // 잘못된 형식
    OUT_OF_RANGE: "VAL_003", // 범위 초과
    TOO_SHORT: "VAL_004", // 너무 짧음
    TOO_LONG: "VAL_005", // 너무 김
    INVALID_TYPE: "VAL_006", // 잘못된 타입
  },

  // ==========================================
  // 리소스 관련 에러
  // ==========================================
  RESOURCE: {
    NOT_FOUND: "RES_001", // 리소스를 찾을 수 없음
    ALREADY_EXISTS: "RES_002", // 이미 존재하는 리소스
    CONFLICT: "RES_003", // 충돌 발생
    GONE: "RES_004", // 삭제된 리소스
  },

  // ==========================================
  // 서버 에러
  // ==========================================
  SERVER: {
    INTERNAL_ERROR: "SRV_001", // 내부 서버 오류
    DATABASE_ERROR: "SRV_002", // 데이터베이스 오류
    SERVICE_UNAVAILABLE: "SRV_003", // 서비스 이용 불가
    TIMEOUT: "SRV_004", // 타임아웃
    MAINTENANCE: "SRV_005", // 점검 중
  },

  // ==========================================
  // 네트워크 에러
  // ==========================================
  NETWORK: {
    CONNECTION_FAILED: "NET_001", // 연결 실패
    REQUEST_TIMEOUT: "NET_002", // 요청 시간 초과
    NO_INTERNET: "NET_003", // 인터넷 연결 없음
  },

  // ==========================================
  // 파일 업로드 에러
  // ==========================================
  FILE: {
    TOO_LARGE: "FILE_001", // 파일이 너무 큼
    INVALID_TYPE: "FILE_002", // 지원하지 않는 파일 형식
    UPLOAD_FAILED: "FILE_003", // 업로드 실패
  },

  // ==========================================
  // 비즈니스 로직 에러
  // ==========================================
  BUSINESS: {
    OPERATION_FAILED: "BIZ_001", // 작업 실패
    INVALID_STATE: "BIZ_002", // 잘못된 상태
    CONSTRAINT_VIOLATION: "BIZ_003", // 제약 조건 위반
  },
} as const;

/**
 * ==========================================
 * 에러 타이틀 매핑
 * ==========================================
 */
const ERROR_TITLES: Partial<Record<ErrorCode, string>> = {
  // Auth
  [ERROR_CODES.AUTH.UNAUTHORIZED]: "인증 필요",
  [ERROR_CODES.AUTH.INVALID_TOKEN]: "인증 오류",
  [ERROR_CODES.AUTH.TOKEN_EXPIRED]: "인증 만료",
  [ERROR_CODES.AUTH.INVALID_CREDENTIALS]: "로그인 실패",
  [ERROR_CODES.AUTH.ACCOUNT_LOCKED]: "계정 잠김",
  [ERROR_CODES.AUTH.ACCOUNT_DISABLED]: "계정 비활성화",
  [ERROR_CODES.AUTH.PERMISSION_DENIED]: "권한 없음",

  // User
  [ERROR_CODES.USER.NOT_FOUND]: "사용자 없음",
  [ERROR_CODES.USER.ALREADY_EXISTS]: "사용자 중복",
  [ERROR_CODES.USER.INVALID_EMAIL]: "이메일 오류",
  [ERROR_CODES.USER.INVALID_PASSWORD]: "비밀번호 오류",
  [ERROR_CODES.USER.EMAIL_NOT_VERIFIED]: "이메일 미인증",

  // Validation
  [ERROR_CODES.VALIDATION.REQUIRED_FIELD]: "필수 항목 누락",
  [ERROR_CODES.VALIDATION.INVALID_FORMAT]: "형식 오류",
  [ERROR_CODES.VALIDATION.OUT_OF_RANGE]: "범위 초과",
  [ERROR_CODES.VALIDATION.TOO_SHORT]: "입력 부족",
  [ERROR_CODES.VALIDATION.TOO_LONG]: "입력 초과",
  [ERROR_CODES.VALIDATION.INVALID_TYPE]: "타입 오류",

  // Resource
  [ERROR_CODES.RESOURCE.NOT_FOUND]: "데이터 없음",
  [ERROR_CODES.RESOURCE.ALREADY_EXISTS]: "데이터 중복",
  [ERROR_CODES.RESOURCE.CONFLICT]: "데이터 충돌",
  [ERROR_CODES.RESOURCE.GONE]: "삭제된 데이터",

  // Server
  [ERROR_CODES.SERVER.INTERNAL_ERROR]: "서버 오류",
  [ERROR_CODES.SERVER.DATABASE_ERROR]: "데이터베이스 오류",
  [ERROR_CODES.SERVER.SERVICE_UNAVAILABLE]: "서비스 이용 불가",
  [ERROR_CODES.SERVER.TIMEOUT]: "시간 초과",
  [ERROR_CODES.SERVER.MAINTENANCE]: "점검 중",

  // Network
  [ERROR_CODES.NETWORK.CONNECTION_FAILED]: "연결 실패",
  [ERROR_CODES.NETWORK.REQUEST_TIMEOUT]: "요청 시간 초과",
  [ERROR_CODES.NETWORK.NO_INTERNET]: "네트워크 오류",

  // File
  [ERROR_CODES.FILE.TOO_LARGE]: "파일 크기 초과",
  [ERROR_CODES.FILE.INVALID_TYPE]: "파일 형식 오류",
  [ERROR_CODES.FILE.UPLOAD_FAILED]: "업로드 실패",

  // Business
  [ERROR_CODES.BUSINESS.OPERATION_FAILED]: "작업 실패",
  [ERROR_CODES.BUSINESS.INVALID_STATE]: "상태 오류",
  [ERROR_CODES.BUSINESS.CONSTRAINT_VIOLATION]: "제약조건 위반",
};

/**
 * ==========================================
 * 성공 코드 상수
 * ==========================================
 */
export const SUCCESS_CODES = {
  // 일반 성공
  OK: "SUCCESS_001", // 성공
  CREATED: "SUCCESS_002", // 생성 완료
  UPDATED: "SUCCESS_003", // 수정 완료
  DELETED: "SUCCESS_004", // 삭제 완료

  // 인증 관련 성공
  AUTH: {
    LOGIN_SUCCESS: "AUTH_SUCCESS_001", // 로그인 성공
    LOGOUT_SUCCESS: "AUTH_SUCCESS_002", // 로그아웃 성공
    REGISTERED: "AUTH_SUCCESS_003", // 회원가입 완료
  },
} as const;

/**
 * ==========================================
 * 타입 정의
 * ==========================================
 */

// 모든 에러 코드를 Union 타입으로 추출
type ExtractCodes<T> = T extends Record<string, infer U> ? (U extends string ? U : U extends Record<string, infer V> ? (V extends string ? V : never) : never) : never;

export type ErrorCode = ExtractCodes<typeof ERROR_CODES>;
export type SuccessCode = ExtractCodes<typeof SUCCESS_CODES>;
export type ApiCode = ErrorCode | SuccessCode;

/**
 * ==========================================
 * 유틸리티 함수
 * ==========================================
 */

/**
 * 코드가 에러 코드인지 확인
 */
export const isErrorCode = (code: string): code is ErrorCode => {
  const allErrorCodes = Object.values(ERROR_CODES).flatMap((category) => (typeof category === "string" ? [category] : Object.values(category)));
  return allErrorCodes.includes(code);
};

/**
 * 코드가 성공 코드인지 확인
 */
export const isSuccessCode = (code: string): code is SuccessCode => {
  const allSuccessCodes = Object.values(SUCCESS_CODES).flatMap((category) => (typeof category === "string" ? [category] : Object.values(category)));
  return allSuccessCodes.includes(code);
};

/**
 * 에러 메시지 맵핑 (기본 메시지)
 */
const ERROR_MESSAGES: Partial<Record<ErrorCode, string>> = {
  // Auth
  [ERROR_CODES.AUTH.UNAUTHORIZED]: "로그인이 필요합니다.",
  [ERROR_CODES.AUTH.INVALID_TOKEN]: "유효하지 않은 인증 토큰입니다.",
  [ERROR_CODES.AUTH.TOKEN_EXPIRED]: "인증이 만료되었습니다. 다시 로그인해주세요.",
  [ERROR_CODES.AUTH.INVALID_CREDENTIALS]: "아이디 또는 비밀번호가 올바르지 않습니다.",
  [ERROR_CODES.AUTH.ACCOUNT_LOCKED]: "계정이 잠겨있습니다. 관리자에게 문의하세요.",
  [ERROR_CODES.AUTH.PERMISSION_DENIED]: "권한이 없습니다.",

  // User
  [ERROR_CODES.USER.NOT_FOUND]: "사용자를 찾을 수 없습니다.",
  [ERROR_CODES.USER.ALREADY_EXISTS]: "이미 존재하는 사용자입니다.",
  [ERROR_CODES.USER.INVALID_EMAIL]: "유효하지 않은 이메일 형식입니다.",
  [ERROR_CODES.USER.EMAIL_NOT_VERIFIED]: "이메일 인증이 필요합니다.",

  // Validation
  [ERROR_CODES.VALIDATION.REQUIRED_FIELD]: "필수 항목을 입력해주세요.",
  [ERROR_CODES.VALIDATION.INVALID_FORMAT]: "형식이 올바르지 않습니다.",
  [ERROR_CODES.VALIDATION.TOO_SHORT]: "입력값이 너무 짧습니다.",
  [ERROR_CODES.VALIDATION.TOO_LONG]: "입력값이 너무 깁니다.",

  // Resource
  [ERROR_CODES.RESOURCE.NOT_FOUND]: "요청하신 데이터를 찾을 수 없습니다.",
  [ERROR_CODES.RESOURCE.ALREADY_EXISTS]: "이미 존재하는 데이터입니다.",

  // Server
  [ERROR_CODES.SERVER.INTERNAL_ERROR]: "서버 오류가 발생했습니다.",
  [ERROR_CODES.SERVER.SERVICE_UNAVAILABLE]: "서비스를 일시적으로 사용할 수 없습니다.",
  [ERROR_CODES.SERVER.TIMEOUT]: "요청 시간이 초과되었습니다.",

  // Network
  [ERROR_CODES.NETWORK.CONNECTION_FAILED]: "서버에 연결할 수 없습니다.",
  [ERROR_CODES.NETWORK.NO_INTERNET]: "인터넷 연결을 확인해주세요.",

  // File
  [ERROR_CODES.FILE.TOO_LARGE]: "파일 크기가 너무 큽니다.",
  [ERROR_CODES.FILE.INVALID_TYPE]: "지원하지 않는 파일 형식입니다.",
  [ERROR_CODES.FILE.UPLOAD_FAILED]: "파일 업로드에 실패했습니다.",
};

/**
 * 에러 코드에 해당하는 타이틀 반환
 */
export const getErrorTitle = (code: string): string => {
  return ERROR_TITLES[code as ErrorCode] || "오류";
};

/**
 * 에러 코드에 해당하는 메시지 반환
 */
export const getErrorMessage = (code: string): string => {
  return ERROR_MESSAGES[code as ErrorCode] || "오류가 발생했습니다.";
};

/**
 * 에러 코드에 해당하는 타이틀과 메시지를 함께 반환
 */
export const getErrorInfo = (code: string): { title: string; message: string } => {
  return {
    title: getErrorTitle(code),
    message: getErrorMessage(code),
  };
};

/**
 * 에러 코드가 특정 카테고리에 속하는지 확인
 */
export const isAuthError = (code: string): boolean => {
  return Object.values(ERROR_CODES.AUTH).includes(code as any);
};

export const isValidationError = (code: string): boolean => {
  return Object.values(ERROR_CODES.VALIDATION).includes(code as any);
};

export const isServerError = (code: string): boolean => {
  return Object.values(ERROR_CODES.SERVER).includes(code as any);
};

export const isNetworkError = (code: string): boolean => {
  return Object.values(ERROR_CODES.NETWORK).includes(code as any);
};

/**
 * ==========================================
 * Vue 3 Composable용 헬퍼
 * ==========================================
 */

/**
 * 에러 코드를 UI에 표시할 수 있는 형태로 변환
 */
export interface ErrorDisplay {
  code: string;
  title: string;
  message: string;
  type: "error" | "warning" | "info";
}

export const toErrorDisplay = (code: string, customTitle?: string, customMessage?: string): ErrorDisplay => {
  return {
    code,
    title: customTitle || getErrorTitle(code),
    message: customMessage || getErrorMessage(code),
    type: isServerError(code) || isNetworkError(code) ? "error" : "warning",
  };
};
