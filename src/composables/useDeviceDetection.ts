// src/composables/useDeviceDetection.ts
import { ref, computed } from "vue";

export type DeviceType = "mobile" | "desktop";

const STORAGE_KEY = "dev-device-override";
const DEFAULT_DEVICE_TYPE: DeviceType = "desktop";

// 🔥 전역 ref로 변경 (함수 외부에 선언)
const deviceType = ref<DeviceType>(DEFAULT_DEVICE_TYPE);
const isDevMode = ref<boolean>(false);

// Mac 여부 감지
const isMacOS = (): boolean => {
  if (typeof window === "undefined" || typeof navigator === "undefined") {
    return false;
  }

  try {
    const platform = navigator.platform.toLowerCase();
    const userAgent = navigator.userAgent.toLowerCase();

    return /mac/.test(platform) || /macintosh/.test(userAgent);
  } catch (error) {
    console.warn("Mac detection failed:", error);
    return false;
  }
};

// 실제 기기 감지
const detectRealDevice = (): DeviceType => {
  if (typeof window === "undefined" || typeof navigator === "undefined") {
    return DEFAULT_DEVICE_TYPE;
  }

  try {
    const userAgent = navigator.userAgent.toLowerCase();
    const mobileKeywords = ["android", "iphone", "ipad", "ipod", "blackberry", "windows phone", "mobile"];

    // console.log("test ---", userAgent);

    return mobileKeywords.some((keyword) => userAgent.includes(keyword)) ? "mobile" : "desktop";
  } catch (error) {
    console.warn("Device detection failed, defaulting to desktop:", error);
    return DEFAULT_DEVICE_TYPE;
  }
};

// 저장된 테스트 설정 확인
const getStoredDeviceOverride = (): DeviceType | null => {
  if (typeof window === "undefined" || typeof localStorage === "undefined") {
    return null;
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored === "mobile" || stored === "desktop" ? stored : null;
  } catch (error) {
    console.warn("Failed to read localStorage:", error);
    return null;
  }
};

// 초기 디바이스 결정
const initDeviceType = (): DeviceType => {
  const override = getStoredDeviceOverride();
  return override ?? detectRealDevice();
};

// 🔥 초기화 한 번만 실행
let isInitialized = false;

const initialize = () => {
  if (!isInitialized) {
    deviceType.value = initDeviceType();
    isDevMode.value = !!getStoredDeviceOverride();
    isInitialized = true;

    // 개발 환경에서 로그 출력
    if (import.meta.env.DEV) {
      console.log("🔍 Device initialized:", {
        deviceType: deviceType.value,
        isMac: isMacOS(),
        isDevMode: isDevMode.value,
        realDevice: detectRealDevice(),
      });
    }
  }
};

export function useDeviceDetection() {
  // 초기화
  initialize();

  const realDeviceType = computed(() => detectRealDevice());

  // 테스트용 디바이스 전환
  const toggleDevice = () => {
    try {
      const newDevice: DeviceType = deviceType.value === "mobile" ? "desktop" : "mobile";
      localStorage.setItem(STORAGE_KEY, newDevice);
      deviceType.value = newDevice;
      isDevMode.value = true;

      // 개발 환경에서 로그 출력
      if (import.meta.env.DEV) {
        console.log("🔄 Device toggled to:", newDevice);
      }
    } catch (error) {
      console.error("Failed to toggle device:", error);
    }
  };

  // 테스트 설정 리셋
  const resetToRealDevice = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      isDevMode.value = false;
      deviceType.value = detectRealDevice();

      // 개발 환경에서 로그 출력
      if (import.meta.env.DEV) {
        console.log("↺ Device reset to:", deviceType.value);
      }
    } catch (error) {
      console.error("Failed to reset device:", error);
      deviceType.value = DEFAULT_DEVICE_TYPE;
    }
  };

  return {
    deviceType,
    isDevMode,
    realDeviceType,
    isMobile: () => deviceType.value === "mobile",
    isDesktop: () => deviceType.value === "desktop",
    isMac: isMacOS,
    toggleDevice,
    resetToRealDevice,
  };
}
