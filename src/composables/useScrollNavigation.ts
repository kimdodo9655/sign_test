import { ref, onMounted, onUnmounted, watch, nextTick, type Ref } from "vue";
import { useRoute } from "vue-router";

// ============================================================================
// 상수 정의
// ============================================================================

const SECTION_IDS = ["section1", "section2", "section3", "section4", "section5", "section6"] as const;
const SCROLL_BOTTOM_TOLERANCE = 10;
const CLICK_OVERRIDE_DURATION = 1000;

// ============================================================================
// 타입 정의
// ============================================================================

interface UseScrollNavigationReturn {
  activeIndex: Ref<number>;
  scrollToSection: (index: number) => void;
}

// ============================================================================
// 스크롤 네비게이션 Composable (개선 버전)
// ============================================================================

export function useScrollNavigation(): UseScrollNavigationReturn {
  const route = useRoute();
  const activeIndex = ref<number>(0);
  let isClickScrolling = false;
  let clickOverrideTimer: ReturnType<typeof setTimeout> | null = null;
  let lastScrollTime = 0;
  let lastActiveIndex = 0;
  let isListenersActive = false; // ✅ 추가: 리스너 활성화 상태 추적

  // --------------------------------------------------------------------------
  // 헤더 높이 계산
  // --------------------------------------------------------------------------

  const computeHeaderHeight = (): number => {
    const vw = window.innerWidth;
    const minViewport = 1024;
    const maxViewport = 1400;
    const maxSize = 160;
    const minSize = (maxSize * minViewport) / maxViewport;
    const vwValue = (maxSize / maxViewport) * vw;
    return Math.min(Math.max(minSize, vwValue), maxSize);
  };

  let headerHeight = computeHeaderHeight();

  const handleResize = () => {
    if (route.path !== "/") return;
    headerHeight = computeHeaderHeight();
  };

  // --------------------------------------------------------------------------
  // 섹션 이동
  // --------------------------------------------------------------------------

  const scrollToSection = (index: number): void => {
    if (route.path !== "/") return;

    const id = SECTION_IDS[index];
    const el = document.getElementById(id);
    if (!el) {
      console.warn(`⚠️ ${id} 요소를 찾을 수 없습니다!`);
      return;
    }

    // ✅ 즉시 업데이트
    activeIndex.value = index;
    lastActiveIndex = index;

    isClickScrolling = true;
    lastScrollTime = Date.now();

    if (clickOverrideTimer) {
      clearTimeout(clickOverrideTimer);
    }

    clickOverrideTimer = setTimeout(() => {
      isClickScrolling = false;
      // ✅ 타이머 종료 후 현재 위치 재확인
      setTimeout(() => handleScroll(), 100);
    }, CLICK_OVERRIDE_DURATION);

    const elementTop = el.getBoundingClientRect().top + window.scrollY;
    const offsetPosition = elementTop - headerHeight;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    window.scrollTo({
      top: offsetPosition,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  };

  // --------------------------------------------------------------------------
  // 스크롤 감지 및 활성 섹션 업데이트 (개선)
  // --------------------------------------------------------------------------

  const handleScroll = (): void => {
    if (route.path !== "/") return;

    // 클릭 후 일정 시간 동안은 자동 감지 무시
    const timeSinceClick = Date.now() - lastScrollTime;
    if (isClickScrolling && timeSinceClick < CLICK_OVERRIDE_DURATION) {
      return;
    }

    // 클릭 플래그 해제
    if (isClickScrolling && timeSinceClick >= CLICK_OVERRIDE_DURATION) {
      isClickScrolling = false;
    }

    // ✅ 개선: 뷰포트 중앙을 기준으로 계산 (더 안정적)
    const viewportCenter = window.scrollY + window.innerHeight / 2;

    // 하단 도달 확인
    const docHeight = document.documentElement.scrollHeight;
    const scrollBottom = window.scrollY + window.innerHeight;

    if (scrollBottom >= docHeight - SCROLL_BOTTOM_TOLERANCE) {
      const lastIndex = SECTION_IDS.length - 1;
      if (activeIndex.value !== lastIndex) {
        activeIndex.value = lastIndex;
        lastActiveIndex = lastIndex;
      }
      return;
    }

    // ✅ 개선: 각 섹션의 중앙점을 기준으로 가장 가까운 섹션 찾기
    let newIndex = 0;
    let minDistance = Infinity;

    SECTION_IDS.forEach((id, index) => {
      const el = document.getElementById(id);
      if (!el) return;

      const sectionTop = el.offsetTop;
      const sectionHeight = el.offsetHeight;
      const sectionCenter = sectionTop + sectionHeight / 2;

      // 뷰포트 중앙과 섹션 중앙 사이의 거리
      const distance = Math.abs(viewportCenter - sectionCenter);

      if (distance < minDistance) {
        minDistance = distance;
        newIndex = index;
      }
    });

    // ✅ 개선: 변경이 있을 때만 업데이트 (불필요한 리렌더링 방지)
    if (activeIndex.value !== newIndex && lastActiveIndex !== newIndex) {
      activeIndex.value = newIndex;
      lastActiveIndex = newIndex;
    }
  };

  // --------------------------------------------------------------------------
  // throttle을 사용한 스크롤 최적화
  // --------------------------------------------------------------------------

  let ticking = false;

  const throttledScroll = (): void => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        handleScroll();
        ticking = false;
      });
      ticking = true;
    }
  };

  // --------------------------------------------------------------------------
  // 이벤트 리스너 설정 및 제거 함수
  // --------------------------------------------------------------------------

  const waitForSections = async (maxAttempts = 20, interval = 100): Promise<boolean> => {
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      let allExist = true;

      for (const id of SECTION_IDS) {
        if (!document.getElementById(id)) {
          allExist = false;
          break;
        }
      }

      if (allExist) {
        console.log(`✅ 모든 섹션 로드 완료 (시도 ${attempt + 1}/${maxAttempts})`);
        return true;
      }

      // 다음 시도 전 대기
      await new Promise((resolve) => setTimeout(resolve, interval));
    }

    console.error(`❌ 섹션 로드 실패 (${maxAttempts}회 시도)`);
    return false;
  };

  const setupListeners = async (): Promise<void> => {
    if (isListenersActive) return;

    // ✅ 1단계: Vue의 DOM 렌더링 완료 대기
    await nextTick();

    // ✅ 2단계: 실제 섹션 요소들이 DOM에 추가될 때까지 대기
    const sectionsReady = await waitForSections();

    if (!sectionsReady) {
      console.error("❌ 섹션을 찾을 수 없어 이벤트 리스너 등록을 중단합니다.");
      return;
    }

    console.log("✅ 이벤트 리스너 등록");
    headerHeight = computeHeaderHeight();

    // 초기 위치 확인
    setTimeout(() => {
      handleScroll();
    }, 100);

    window.addEventListener("scroll", throttledScroll, { passive: true });
    window.addEventListener("resize", handleResize);
    isListenersActive = true;
  };

  const removeListeners = (): void => {
    if (!isListenersActive) return;

    console.log("🧹 이벤트 리스너 제거");
    window.removeEventListener("scroll", throttledScroll);
    window.removeEventListener("resize", handleResize);
    isListenersActive = false;

    // 상태 초기화
    activeIndex.value = 0;
    lastActiveIndex = 0;
    isClickScrolling = false;

    if (clickOverrideTimer) {
      clearTimeout(clickOverrideTimer);
      clickOverrideTimer = null;
    }
  };

  // --------------------------------------------------------------------------
  // 라이프사이클
  // --------------------------------------------------------------------------

  onMounted(() => {
    console.log("🔍 onMounted - 현재 경로:", route.path);
  });

  // ✅ 핵심: route.path 변경 감지 (DOM 렌더링 완료 후 실행) (DOM 렌더링 완료 후 실행)
  watch(
    () => route.path,
    async (newPath, oldPath) => {
      console.log(`🔄 라우트 변경: ${oldPath} → ${newPath}`);

      if (newPath === "/") {
        // ✅ 홈페이지 진입 시 DOM 렌더링 대기 후 이벤트 리스너 등록
        await setupListeners();
      } else {
        // 다른 페이지로 이동 시 이벤트 리스너 제거
        removeListeners();
      }
    },
    { immediate: true } // ✅ 중요: 초기 마운트 시에도 실행
  );

  onUnmounted(() => {
    console.log("🗑️ onUnmounted");
    removeListeners();
  });

  return {
    activeIndex,
    scrollToSection,
  };
}
