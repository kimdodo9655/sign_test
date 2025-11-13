import { ref, onMounted, onUnmounted, type Ref } from "vue";

// ============================================================================
// 상수 정의
// ============================================================================

const SECTION_IDS = ["section1", "section2", "section3", "section4", "section5", "section6"] as const;
const SCROLL_BOTTOM_TOLERANCE = 10;
const CLICK_OVERRIDE_DURATION = 1000; // 800 → 1000ms로 증가

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
  const activeIndex = ref<number>(0);
  let isClickScrolling = false;
  let clickOverrideTimer: ReturnType<typeof setTimeout> | null = null;
  let lastScrollTime = 0;
  let lastActiveIndex = 0; // ✅ 추가: 이전 인덱스 추적

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
    headerHeight = computeHeaderHeight();
  };

  // --------------------------------------------------------------------------
  // 섹션 이동
  // --------------------------------------------------------------------------

  const scrollToSection = (index: number): void => {
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
  // 라이프사이클
  // --------------------------------------------------------------------------

  onMounted(() => {
    headerHeight = computeHeaderHeight();

    // ✅ 섹션 존재 여부 확인 (디버깅용)
    let allSectionsExist = true;
    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) {
        console.error(`❌ ${id} 섹션을 찾을 수 없습니다!`);
        allSectionsExist = false;
      }
    });

    if (allSectionsExist) {
      // ✅ 초기 위치 확인 (새로고침 시에도 정확한 위치)
      setTimeout(() => {
        handleScroll();
      }, 100);
    }

    window.addEventListener("scroll", throttledScroll, { passive: true });
    window.addEventListener("resize", handleResize);
  });

  onUnmounted(() => {
    window.removeEventListener("scroll", throttledScroll);
    window.removeEventListener("resize", handleResize);
    if (clickOverrideTimer) {
      clearTimeout(clickOverrideTimer);
    }
  });

  return {
    activeIndex,
    scrollToSection,
  };
}
