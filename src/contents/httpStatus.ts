// src/constants/httpStatus.ts
/**
 * ==========================================
 * HTTP 상태 코드 상수
 * ==========================================
 * 표준 HTTP 상태 코드와 유틸리티 함수를 제공합니다.
 * 
 * @example
 * import { HTTP_STATUS, isSuccess, getStatusMessage } from '@/constants/httpStatus';
 * 
 * if (response.status === HTTP_STATUS.OK) {
 *   console.log('성공!');
 * }
 * 
 * if (isClientError(response.status)) {
 *   console.error('클라이언트 에러:', getStatusMessage(response.status));
 * }
 */

/**
 * HTTP 상태 코드 상수
 */
export const HTTP_STATUS = {
  // ==========================================
  // 2xx: 성공
  // ==========================================
  OK: 200,                          // 요청 성공
  CREATED: 201,                     // 리소스 생성 성공
  ACCEPTED: 202,                    // 요청 접수됨 (처리 중)
  NO_CONTENT: 204,                  // 성공했지만 응답 본문 없음

  // ==========================================
  // 3xx: 리다이렉션
  // ==========================================
  MOVED_PERMANENTLY: 301,           // 영구 이동
  FOUND: 302,                       // 임시 이동
  NOT_MODIFIED: 304,                // 수정되지 않음 (캐시 사용)
  TEMPORARY_REDIRECT: 307,          // 임시 리다이렉션

  // ==========================================
  // 4xx: 클라이언트 에러
  // ==========================================
  BAD_REQUEST: 400,                 // 잘못된 요청
  UNAUTHORIZED: 401,                // 인증 필요
  PAYMENT_REQUIRED: 402,            // 결제 필요
  FORBIDDEN: 403,                   // 접근 권한 없음
  NOT_FOUND: 404,                   // 리소스를 찾을 수 없음
  METHOD_NOT_ALLOWED: 405,          // 허용되지 않는 메서드
  NOT_ACCEPTABLE: 406,              // 요청한 형식 지원 안됨
  REQUEST_TIMEOUT: 408,             // 요청 시간 초과
  CONFLICT: 409,                    // 충돌 발생
  GONE: 410,                        // 리소스 영구 삭제됨
  UNPROCESSABLE_ENTITY: 422,        // 처리할 수 없는 엔티티
  TOO_MANY_REQUESTS: 429,           // 너무 많은 요청

  // ==========================================
  // 5xx: 서버 에러
  // ==========================================
  INTERNAL_SERVER_ERROR: 500,       // 내부 서버 오류
  NOT_IMPLEMENTED: 501,             // 구현되지 않음
  BAD_GATEWAY: 502,                 // 게이트웨이 오류
  SERVICE_UNAVAILABLE: 503,         // 서비스 이용 불가
  GATEWAY_TIMEOUT: 504,             // 게이트웨이 시간 초과
} as const;

/**
 * HTTP 상태 코드 메시지 매핑
 */
export const HTTP_STATUS_MESSAGES: Record<number, string> = {
  // 2xx
  [HTTP_STATUS.OK]: '요청이 성공했습니다.',
  [HTTP_STATUS.CREATED]: '리소스가 생성되었습니다.',
  [HTTP_STATUS.ACCEPTED]: '요청이 접수되었습니다.',
  [HTTP_STATUS.NO_CONTENT]: '요청이 성공했습니다.',

  // 3xx
  [HTTP_STATUS.MOVED_PERMANENTLY]: '리소스가 영구적으로 이동했습니다.',
  [HTTP_STATUS.FOUND]: '리소스가 임시로 이동했습니다.',
  [HTTP_STATUS.NOT_MODIFIED]: '리소스가 수정되지 않았습니다.',

  // 4xx
  [HTTP_STATUS.BAD_REQUEST]: '잘못된 요청입니다.',
  [HTTP_STATUS.UNAUTHORIZED]: '로그인이 필요합니다.',
  [HTTP_STATUS.FORBIDDEN]: '접근 권한이 없습니다.',
  [HTTP_STATUS.NOT_FOUND]: '요청하신 페이지를 찾을 수 없습니다.',
  [HTTP_STATUS.METHOD_NOT_ALLOWED]: '허용되지 않는 메서드입니다.',
  [HTTP_STATUS.REQUEST_TIMEOUT]: '요청 시간이 초과되었습니다.',
  [HTTP_STATUS.CONFLICT]: '요청이 충돌했습니다.',
  [HTTP_STATUS.UNPROCESSABLE_ENTITY]: '요청을 처리할 수 없습니다.',
  [HTTP_STATUS.TOO_MANY_REQUESTS]: '너무 많은 요청을 보냈습니다. 잠시 후 다시 시도해주세요.',

  // 5xx
  [HTTP_STATUS.INTERNAL_SERVER_ERROR]: '서버에 오류가 발생했습니다.',
  [HTTP_STATUS.NOT_IMPLEMENTED]: '지원하지 않는 기능입니다.',
  [HTTP_STATUS.BAD_GATEWAY]: '게이트웨이 오류가 발생했습니다.',
  [HTTP_STATUS.SERVICE_UNAVAILABLE]: '서비스를 일시적으로 사용할 수 없습니다.',
  [HTTP_STATUS.GATEWAY_TIMEOUT]: '게이트웨이 시간이 초과되었습니다.',
};

/**
 * ==========================================
 * 유틸리티 함수
 * ==========================================
 */

/**
 * 성공 상태 코드인지 확인 (2xx)
 */
export const isSuccess = (status: number): boolean => {
  return status >= 200 && status < 300;
};

/**
 * 리다이렉션 상태 코드인지 확인 (3xx)
 */
export const isRedirect = (status: number): boolean => {
  return status >= 300 && status < 400;
};

/**
 * 클라이언트 에러인지 확인 (4xx)
 */
export const isClientError = (status: number): boolean => {
  return status >= 400 && status < 500;
};

/**
 * 서버 에러인지 확인 (5xx)
 */
export const isServerError = (status: number): boolean => {
  return status >= 500 && status < 600;
};

/**
 * 에러 상태 코드인지 확인 (4xx or 5xx)
 */
export const isError = (status: number): boolean => {
  return isClientError(status) || isServerError(status);
};

/**
 * 상태 코드에 해당하는 메시지 반환
 */
export const getStatusMessage = (status: number): string => {
  return HTTP_STATUS_MESSAGES[status] || '알 수 없는 오류가 발생했습니다.';
};

/**
 * 상태 코드를 카테고리로 분류
 */
export const getStatusCategory = (status: number): 'success' | 'redirect' | 'client-error' | 'server-error' | 'unknown' => {
  if (isSuccess(status)) return 'success';
  if (isRedirect(status)) return 'redirect';
  if (isClientError(status)) return 'client-error';
  if (isServerError(status)) return 'server-error';
  return 'unknown';
};

/**
 * ==========================================
 * Vue 3 Composable용 헬퍼
 * ==========================================
 */

/**
 * HTTP 상태 정보 인터페이스
 */
export interface HttpStatusInfo {
  code: number;
  message: string;
  category: ReturnType<typeof getStatusCategory>;
  isSuccess: boolean;
  isError: boolean;
}

/**
 * HTTP 상태 코드를 구조화된 정보로 변환
 */
export const parseHttpStatus = (status: number): HttpStatusInfo => {
  return {
    code: status,
    message: getStatusMessage(status),
    category: getStatusCategory(status),
    isSuccess: isSuccess(status),
    isError: isError(status),
  };
};

/**
 * ==========================================
 * 타입 정의
 * ==========================================
 */

export type HttpStatusCode = typeof HTTP_STATUS[keyof typeof HTTP_STATUS];
export type HttpStatusCategory = ReturnType<typeof getStatusCategory>;
