// src/constants/apiEndpoints.ts
/**
 * ==========================================
 * API 엔드포인트 상수 정의
 * ==========================================
 * 백엔드 API URL을 중앙에서 관리합니다.
 * 
 * @example
 * // 정적 엔드포인트 사용
 * await api.post(API_ENDPOINTS.AUTH.LOGIN, { username, password });
 * 
 * // 동적 엔드포인트 사용
 * await api.get(API_ENDPOINTS.USER.DETAIL(userId));
 */

export const API_ENDPOINTS = {
  // ==========================================
  // 인증 관련
  // ==========================================
  AUTH: {
    LOGIN: '/auth/login',                           // POST - 로그인
    LOGOUT: '/auth/logout',                         // POST - 로그아웃
    REFRESH: '/auth/refresh',                       // POST - 토큰 갱신
    REGISTER: '/auth/register',                     // POST - 회원가입
    VERIFY_EMAIL: '/auth/verify-email',             // POST - 이메일 인증
    FORGOT_PASSWORD: '/auth/forgot-password',       // POST - 비밀번호 찾기
    RESET_PASSWORD: '/auth/reset-password',         // POST - 비밀번호 재설정
    CHANGE_PASSWORD: '/auth/change-password',       // PUT - 비밀번호 변경
  },

  // ==========================================
  // 사용자 관련
  // ==========================================
  USER: {
    LIST: '/users',                                 // GET - 사용자 목록
    DETAIL: (id: string | number) => `/users/${id}`, // GET - 사용자 상세
    CREATE: '/users',                               // POST - 사용자 생성
    UPDATE: (id: string | number) => `/users/${id}`, // PUT/PATCH - 사용자 수정
    DELETE: (id: string | number) => `/users/${id}`, // DELETE - 사용자 삭제
    PROFILE: '/users/profile',                      // GET - 내 프로필
    UPDATE_PROFILE: '/users/profile',               // PUT - 프로필 수정
  },

  // ==========================================
  // 파일 관련
  // ==========================================
  FILE: {
    UPLOAD: '/files/upload',                        // POST - 파일 업로드
    DOWNLOAD: (id: string) => `/files/${id}/download`, // GET - 파일 다운로드
    DELETE: (id: string) => `/files/${id}`,         // DELETE - 파일 삭제
    LIST: '/files',                                 // GET - 파일 목록
  },

  // ==========================================
  // 공통 API
  // ==========================================
  COMMON: {
    HEALTH: '/health',                              // GET - 헬스체크
    VERSION: '/version',                            // GET - API 버전
    CONFIG: '/config',                              // GET - 클라이언트 설정
  },
} as const;

/**
 * ==========================================
 * API 메서드 타입
 * ==========================================
 */
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

/**
 * ==========================================
 * 엔드포인트 빌더 헬퍼
 * ==========================================
 */

/**
 * 엔드포인트가 함수인지 확인
 */
export const isEndpointFunction = (endpoint: any): endpoint is Function => {
  return typeof endpoint === 'function';
};

/**
 * 엔드포인트 URL 생성
 */
export const buildEndpoint = (
  endpoint: string | Function,
  params?: string | number | Record<string, any>
): string => {
  if (typeof endpoint === 'function') {
    return endpoint(params);
  }
  return endpoint;
};

/**
 * 쿼리 스트링 생성
 */
export const buildQueryString = (params: Record<string, any>): string => {
  const searchParams = new URLSearchParams();
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== null && value !== undefined && value !== '') {
      searchParams.append(key, String(value));
    }
  });
  
  const queryString = searchParams.toString();
  return queryString ? `?${queryString}` : '';
};

/**
 * 전체 URL 생성 (엔드포인트 + 쿼리스트링)
 */
export const buildUrl = (
  endpoint: string | Function,
  pathParams?: string | number | Record<string, any>,
  queryParams?: Record<string, any>
): string => {
  const url = buildEndpoint(endpoint, pathParams);
  const query = queryParams ? buildQueryString(queryParams) : '';
  return url + query;
};

/**
 * ==========================================
 * 타입 정의
 * ==========================================
 */

/**
 * API 응답 타입
 */
export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message: string;
  code: string;
}

/**
 * 페이지네이션 응답 타입
 */
export interface PaginatedResponse<T = any> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    pageSize: number;
    totalPages: number;
    totalItems: number;
    hasNext: boolean;
    hasPrevious: boolean;
  };
  message: string;
  code: string;
}

/**
 * 페이지네이션 요청 파라미터
 */
export interface PaginationParams {
  page?: number;
  pageSize?: number;
  sort?: string;
  order?: 'asc' | 'desc';
}

/**
 * ==========================================
 * Vue Query용 키 팩토리
 * ==========================================
 * Vue Query (TanStack Query)에서 사용할 쿼리 키를 생성합니다.
 */

export const queryKeys = {
  /**
   * 인증 관련 쿼리 키
   */
  auth: {
    all: ['auth'] as const,
    profile: () => [...queryKeys.auth.all, 'profile'] as const,
  },

  /**
   * 사용자 관련 쿼리 키
   */
  user: {
    all: ['user'] as const,
    lists: () => [...queryKeys.user.all, 'list'] as const,
    list: (filters?: Record<string, any>) => 
      [...queryKeys.user.lists(), filters] as const,
    details: () => [...queryKeys.user.all, 'detail'] as const,
    detail: (id: string | number) => 
      [...queryKeys.user.details(), id] as const,
  },

  /**
   * 파일 관련 쿼리 키
   */
  file: {
    all: ['file'] as const,
    lists: () => [...queryKeys.file.all, 'list'] as const,
    list: (filters?: Record<string, any>) => 
      [...queryKeys.file.lists(), filters] as const,
    detail: (id: string) => 
      [...queryKeys.file.all, 'detail', id] as const,
  },
} as const;

/**
 * ==========================================
 * 백엔드 개발자 작성 가이드
 * ==========================================
 * 
 * 1. 새로운 API 엔드포인트 추가하기:
 * 
 *    export const API_ENDPOINTS = {
 *      // 새로운 카테고리 추가
 *      PRODUCT: {
 *        LIST: '/products',                              // 정적 URL
 *        DETAIL: (id: number) => `/products/${id}`,      // 동적 URL
 *      }
 *    }
 * 
 * 2. Query Keys 추가하기:
 * 
 *    export const queryKeys = {
 *      product: {
 *        all: ['product'] as const,
 *        lists: () => [...queryKeys.product.all, 'list'] as const,
 *        detail: (id: number) => [...queryKeys.product.all, 'detail', id] as const,
 *      }
 *    }
 * 
 * 3. 사용 예시:
 * 
 *    // Vue 컴포넌트에서
 *    import { API_ENDPOINTS, buildUrl, queryKeys } from '@/constants/apiEndpoints';
 *    import { useQuery } from '@tanstack/vue-query';
 *    
 *    // 정적 엔드포인트
 *    const login = () => api.post(API_ENDPOINTS.AUTH.LOGIN, data);
 *    
 *    // 동적 엔드포인트
 *    const getUser = (id: number) => api.get(API_ENDPOINTS.USER.DETAIL(id));
 *    
 *    // 쿼리 스트링 포함
 *    const url = buildUrl(
 *      API_ENDPOINTS.USER.LIST,
 *      undefined,
 *      { page: 1, pageSize: 10 }
 *    );
 *    
 *    // Vue Query 사용
 *    const { data } = useQuery({
 *      queryKey: queryKeys.user.detail(userId.value),
 *      queryFn: () => api.get(API_ENDPOINTS.USER.DETAIL(userId.value))
 *    });
 */
