<template>
  <div class="mobile-form-container">
    <div class="form-wrapper">
      <h2>입력 폼</h2>

      <div v-for="i in 20" :key="i" class="form-group">
        <label :for="`input-${i}`" :ref="(el) => setLabelRef(i, el as HTMLLabelElement)">입력 {{ i }}</label>
        <input :id="`input-${i}`" v-model="formData[i]" type="text" :placeholder="`입력 ${i}을(를) 입력하세요`" @focus="handleInputFocus(i)" @blur="handleInputBlur" />
      </div>

      <button type="submit" class="submit-btn" @click="handleSubmit">제출하기</button>

      <!-- 키보드 공간 확보용 여백 -->
      <div class="keyboard-spacer"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted } from "vue";

const formData = reactive<Record<number, string>>({});
const labelRefs = ref<Record<number, HTMLLabelElement>>({});
const isScrolling = ref(false);
const lastFocusedIndex = ref<number | null>(null);
let scrollTimeout: number | null = null;

const setLabelRef = (index: number, el: HTMLLabelElement | null) => {
  if (el) {
    labelRefs.value[index] = el;
  }
};

const handleScroll = () => {
  isScrolling.value = true;

  if (scrollTimeout) {
    clearTimeout(scrollTimeout);
  }

  scrollTimeout = window.setTimeout(() => {
    isScrolling.value = false;
  }, 150);
};

const handleInputBlur = () => {
  // blur 시 lastFocusedIndex 초기화
  lastFocusedIndex.value = null;
};

const handleInputFocus = (index: number) => {
  // 사용자가 스크롤 중이면 자동 스크롤하지 않음
  if (isScrolling.value) {
    lastFocusedIndex.value = index;
    return;
  }

  // 뷰포트 강제 갱신 후 스크롤
  requestAnimationFrame(() => {
    // 한 프레임 대기하여 레이아웃 재계산
    requestAnimationFrame(() => {
      const label = labelRefs.value[index];
      if (label && !isScrolling.value) {
        // 라벨을 화면 최상단으로 스크롤
        label.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest",
        });

        // 상단 여백 10px 추가
        setTimeout(() => {
          if (!isScrolling.value) {
            window.scrollBy({
              top: -10,
              behavior: "smooth",
            });
          }
        }, 100);
      }
    });
  });

  lastFocusedIndex.value = index;
};

const handleSubmit = () => {
  console.log("Form data:", formData);
  // 제출 로직
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll, { passive: true });
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
  if (scrollTimeout) {
    clearTimeout(scrollTimeout);
  }
});
</script>

<style scoped>
.mobile-form-container {
  min-height: 100vh;
  padding: 20px;
}

.form-wrapper {
  max-width: 600px;
  margin: 0 auto;
}

h2 {
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  padding-top: 10px;
  margin-bottom: 8px;
  font-weight: 500;
}

input {
  width: 100%;
  padding: 12px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
}

input:focus {
  outline: none;
  border-color: #4caf50;
}

.submit-btn {
  width: 100%;
  padding: 14px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 20px;
}

.submit-btn:hover {
  background-color: #45a049;
}

.keyboard-spacer {
  height: 300px;
}
</style>
