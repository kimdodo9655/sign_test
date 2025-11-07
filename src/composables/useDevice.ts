// src/composables/useDevice.ts
import { inject } from "vue";
import type { useDeviceDetection } from "./useDeviceDetection";

/**
 * 디바이스 타입을 쉽게 사용하기 위한 헬퍼 composable
 *
 * @example
 * ```ts
 * // 컴포넌트에서 사용
 * const { deviceType, isMobile, isDesktop, isMac } = useDevice();
 *
 * if (isMobile()) {
 *   console.log('모바일 환경입니다');
 * }
 *
 * if (isDesktop() && isMac()) {
 *   console.log('Mac 데스크톱입니다');
 * }
 * ```
 */
export function useDevice() {
  const deviceDetection = inject<ReturnType<typeof useDeviceDetection>>("deviceDetection");

  if (!deviceDetection) {
    throw new Error("useDevice must be used within a component that has deviceDetection provided");
  }

  return deviceDetection;
}
