import { ref, onMounted, onUnmounted, type Ref } from "vue";

// ============================================================================
// 상수 정의
// ============================================================================

/** 네비게이션 대상 섹션 ID 목록 */
const SECTION_IDS = ["section1", "section2", "section3", "section4", "section5", "section6"] as const;

/** 섹션 전환 기준: 이전 섹션이 헤더 높이의 60% 이상 가려지면 다음 섹션으로 전환 */
const SECTION_TRANSITION_THRESHOLD = 0.6;

/** 페이지 하단 도달 판정을 위한 허용 오차(px) */
const SCROLL_BOTTOM_TOLERANCE = 2;

/** 클릭 후 스크롤 감지를 일시 중지할 시간(ms) */
const CLICK_OVERRIDE_DURATION = 800;

// ============================================================================
// 타입 정의
// ============================================================================

interface UseScrollNavigationReturn {
  activeIndex: Ref<number>;
  scrollToSection: (index: number) => void;
}

// ============================================================================

// ============================================================================
// 스크롤 네비게이션 Composable
// ============================================================================

/**
 * 스크롤 위치에 따라 활성 섹션을 추적하고 섹션 이동 기능을 제공하는 composable
 *
 * @returns {Object} activeIndex - 현재 활성화된 섹션 인덱스, scrollToSection - 섹션 이동 함수
 */
export function useScrollNavigation(): UseScrollNavigationReturn {
  /** 현재 활성화된 섹션의 인덱스 (0부터 시작) */
  const activeIndex = ref<number>(0);

  /** 클릭으로 인한 스크롤 중인지 여부 */
  let isClickScrolling = false;

  /** 클릭 override 타이머 */
  let clickOverrideTimer: ReturnType<typeof setTimeout> | null = null;

  // --------------------------------------------------------------------------
  // 헤더 높이 계산 (fluid typography 로직)
  // --------------------------------------------------------------------------

  /**
   * 뷰포트 너비에 따라 유동적으로 변하는 헤더 높이 계산
   * fluid-size(160px, 1024px, 1400px) CSS 함수와 동일한 로직
   *
   * @returns 계산된 헤더 높이(px)
   */
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

  /** 창 크기 변경 시 헤더 높이 재계산 */
  const handleResize = () => {
    headerHeight = computeHeaderHeight();
  };

  // --------------------------------------------------------------------------
  // 섹션 이동 (스크롤)
  // --------------------------------------------------------------------------

  /**
   * 지정된 인덱스의 섹션으로 부드럽게 스크롤 이동
   * 헤더 높이를 고려하여 정확한 위치로 이동하며, 접근성 설정을 존중
   *
   * @param index - 이동할 섹션의 인덱스 (0부터 시작)
   */
  const scrollToSection = (index: number): void => {
    const id = SECTION_IDS[index];
    const el = document.getElementById(id);
    if (!el) return;

    // 즉시 activeIndex 업데이트 (클릭한 네비 즉시 활성화)
    activeIndex.value = index;

    // 클릭 스크롤 플래그 설정
    isClickScrolling = true;

    // 기존 타이머가 있다면 취소
    if (clickOverrideTimer) {
      clearTimeout(clickOverrideTimer);
    }

    // 일정 시간 후 자동 감지 재개
    clickOverrideTimer = setTimeout(() => {
      isClickScrolling = false;
    }, CLICK_OVERRIDE_DURATION);

    // 헤더 높이만큼 오프셋을 적용하여 타겟 위치 계산
    const elementTop = el.getBoundingClientRect().top + window.scrollY;
    const offsetPosition = elementTop - headerHeight;

    // 접근성: 사용자가 애니메이션 감소를 선호하는 경우 즉시 이동
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    window.scrollTo({
      top: offsetPosition,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  };

  // --------------------------------------------------------------------------
  // 가시 영역 섹션 감지
  // --------------------------------------------------------------------------

  /**
   * 현재 뷰포트에 일부라도 보이는 모든 섹션을 찾아 반환
   *
   * @returns 가시 영역에 있는 섹션들의 정보 배열 (top 위치 기준 정렬)
   */
  const findVisibleSections = (): { id: string; top: number; bottom: number }[] => {
    const visibleSections: { id: string; top: number; bottom: number }[] = [];

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const rect = el.getBoundingClientRect();
      // 뷰포트 내에서 실제로 보이는 높이 계산
      const visibleHeight = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);

      if (visibleHeight > 0) {
        visibleSections.push({ id, top: rect.top, bottom: rect.bottom });
      }
    });

    // 화면 상단에 가까운 순서로 정렬
    return visibleSections.sort((a, b) => a.top - b.top);
  };

  // --------------------------------------------------------------------------
  // 마지막 섹션 활성화 조건
  // --------------------------------------------------------------------------

  /**
   * 마지막 섹션을 강제로 활성화해야 하는지 판단
   * 페이지 끝에 도달했거나 마지막 섹션 전체가 뷰포트에 보이는 경우 true 반환
   *
   * @returns 마지막 섹션 활성화 여부
   */
  const shouldActivateLastSection = (): boolean => {
    const lastSection = SECTION_IDS[SECTION_IDS.length - 1];
    const lastEl = document.getElementById(lastSection);
    if (!lastEl) return false;

    const lastRect = lastEl.getBoundingClientRect();
    const docHeight = document.documentElement.scrollHeight;
    const scrollBottom = window.scrollY + window.innerHeight;

    // 조건 1: 화면 하단이 문서 끝에 거의 도달
    if (scrollBottom >= docHeight - SCROLL_BOTTOM_TOLERANCE) {
      return true;
    }

    // 조건 2: 마지막 섹션 전체가 뷰포트 안에 완전히 들어옴
    if (lastRect.bottom <= window.innerHeight && lastRect.top < window.innerHeight) {
      return true;
    }

    return false;
  };

  // --------------------------------------------------------------------------
  // 활성 섹션 결정 로직
  // --------------------------------------------------------------------------

  /**
   * 가시 영역 섹션들 중 어느 것을 활성화할지 결정하는 핵심 로직
   *
   * 우선순위:
   * 1. 마지막 섹션 도달 시 강제 활성화
   * 2. 기본적으로 가장 위쪽 섹션 활성화
   * 3. 위쪽 섹션이 임계값 이상 가려진 경우 다음 섹션으로 전환
   *
   * @param visibleSections - 현재 보이는 섹션 목록
   * @returns 활성화할 섹션 ID (또는 null)
   */
  const determineActiveSection = (visibleSections: { id: string; top: number; bottom: number }[]): string | null => {
    if (visibleSections.length === 0) return null;

    // 우선순위 1: 마지막 섹션 강제 활성화
    if (shouldActivateLastSection()) {
      return SECTION_IDS[SECTION_IDS.length - 1];
    }

    // 우선순위 2: 기본적으로 가장 위쪽 섹션 선택
    let targetId = visibleSections[0].id;

    // 우선순위 3: 섹션 전환 조건 체크
    // - 첫 번째 섹션이 헤더 높이의 60% 이상 위로 스크롤됨
    // - 두 번째 섹션의 상단이 화면에 보임
    if (visibleSections.length > 1 && visibleSections[0].top < headerHeight * -SECTION_TRANSITION_THRESHOLD && visibleSections[1].top > 0) {
      targetId = visibleSections[1].id;
    }

    return targetId;
  };

  // --------------------------------------------------------------------------
  // IntersectionObserver 설정
  // --------------------------------------------------------------------------

  let observer: IntersectionObserver | null = null;

  /**
   * IntersectionObserver 콜백 함수
   * 섹션의 가시성 변화 시 활성 섹션을 재계산하고 업데이트
   * 클릭 스크롤 중에는 업데이트하지 않음
   */
  const handleIntersection = () => {
    // 클릭으로 인한 스크롤 중에는 자동 감지 무시
    if (isClickScrolling) return;

    const visibleSections = findVisibleSections();
    const targetId = determineActiveSection(visibleSections);

    if (targetId) {
      const newIndex = SECTION_IDS.indexOf(targetId as (typeof SECTION_IDS)[number]);
      if (newIndex !== -1) {
        activeIndex.value = newIndex;
      }
    }
  };

  /**
   * IntersectionObserver 초기화 및 모든 섹션 관찰 시작
   * rootMargin을 사용하여 헤더 높이만큼 오프셋 적용
   */
  const initObserver = () => {
    const options = {
      root: null, // 뷰포트 기준
      rootMargin: `-${headerHeight}px 0px 0px 0px`, // 헤더 높이만큼 상단 마진 적용
      threshold: [0, 0.25, 0.5, 0.75, 1], // 다양한 가시성 비율에서 콜백 호출
    };

    observer = new IntersectionObserver(handleIntersection, options);

    // 모든 섹션 요소 관찰 시작
    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer?.observe(el);
    });
  };

  // --------------------------------------------------------------------------
  // 라이프사이클 훅
  // --------------------------------------------------------------------------

  onMounted(() => {
    headerHeight = computeHeaderHeight();
    window.addEventListener("resize", handleResize);
    initObserver();
  });

  onUnmounted(() => {
    if (observer) observer.disconnect();
    window.removeEventListener("resize", handleResize);
    if (clickOverrideTimer) {
      clearTimeout(clickOverrideTimer);
    }
  });

  // --------------------------------------------------------------------------
  // 반환값
  // --------------------------------------------------------------------------

  return {
    activeIndex, // 현재 활성 섹션 인덱스 (반응형)
    scrollToSection, // 섹션 이동 함수
  };
}
