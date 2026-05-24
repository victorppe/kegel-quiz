<script setup lang="ts">
import { QUIZ_STEPS, getStep } from '~/composables/quizSteps'
import { useQuiz } from '~/composables/useQuiz'

const route = useRoute()
const router = useRouter()
const { answers, setAnswer, getAnswer, healthConsent, age, goal, setGoal } = useQuiz()

const compatibilityScores: Record<string, number> = {
  '25-35': 87.1, '35-45': 87.8, '45-55': 96.7, '55+': 93.0,
}
const compatibilityScore = computed(() => compatibilityScores[age.value ?? '25-35'] ?? 87.1)
const ageGroup = computed(() => age.value ?? '25-35')

const targetDate = computed(() => {
  const d = new Date()
  d.setDate(d.getDate() + 28)
  return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })
})

const stepId = computed(() => route.params.step as string)
const step = computed(() => getStep(stepId.value))

watchEffect(() => {
  if (!step.value) router.replace('/')
})

const currentAnswer = ref<string | number | null>(
  step.value?.questionId ? (getAnswer(String(step.value.questionId)) ?? null) : null
)

watch(stepId, (id) => {
  const s = getStep(id)
  currentAnswer.value = s?.questionId ? (getAnswer(String(s.questionId)) ?? null) : null
  if (id === 'kegel-eff-2') runEff2Processing()
  if (s?.type === 'final-adjustment') {
    finalContentVisible.value = false
    setTimeout(() => { finalContentVisible.value = true }, 800)
  }
})

const canNext = computed(() => {
  const s = step.value
  if (!s) return false
  if (s.type === 'single-select' || s.type === 'rating') {
    return currentAnswer.value !== null
  }
  if (s.type === 'consent') return healthConsent.value
  return true
})

function goNext() {
  const s = step.value
  if (!s) return
  if (s.questionId && currentAnswer.value !== null) {
    setAnswer(String(s.questionId), currentAnswer.value)
  }
  if (s.next === 'results') {
    router.push('/results')
  } else if (s.next) {
    router.push('/quiz/' + s.next)
  }
}

function goPrev() {
  const s = step.value
  if (!s) return
  if (s.prev === '/') router.push('/')
  else if (s.prev) router.push('/quiz/' + s.prev)
}

// Dynamic goal label
const goalLabel = computed(() => goal.value)

// Dynamic subtitle for info-goal, info-goal-2, final-adjustment
const goalSubtitle = computed(() => `Improve **${goalLabel.value}**`)

// Help improve areas based on goal
const helpImproveAreas = computed(() => {
  const g = goalLabel.value
  if (g === 'Ejaculation Control') {
    return [
      { text: 'Ejaculation control', iconIdx: 1 },
      { text: 'Prostate health', iconIdx: 2 },
      { text: 'Confidence', iconIdx: 3 },
      { text: 'Relationship happiness', iconIdx: 4 },
    ]
  }
  if (g === 'Sexual Wellness') {
    return [
      { text: 'Erectile function', iconIdx: 0 },
      { text: 'Ejaculation control', iconIdx: 1 },
      { text: 'Prostate health', iconIdx: 2 },
      { text: 'Confidence', iconIdx: 3 },
      { text: 'Relationship happiness', iconIdx: 4 },
    ]
  }
  // Erectile Function (default)
  return [
    { text: 'Erectile function', iconIdx: 0 },
    { text: 'Prostate health', iconIdx: 2 },
    { text: 'Confidence', iconIdx: 3 },
    { text: 'Relationship happiness', iconIdx: 4 },
  ]
})

// For creating-plan animation
const loaderPercents = ref([0, 0, 0, 0])
const loaderLabels = ['Intimate health indicators', 'Sexual behaviours', 'Lifestyle', 'Creating your plan']
const planReady = ref(false)
const shownReviews = ref(1)

// For final-adjustment content reveal
const finalContentVisible = ref(false)

// For kegel-eff-2 processing animation
const eff2ProcessingPct = ref(0)
const eff2ProcessingDone = ref(false)

function runEff2Processing() {
  eff2ProcessingPct.value = 0
  eff2ProcessingDone.value = false
  let pct = 0
  const interval = setInterval(() => {
    pct += Math.random() * 8 + 3
    if (pct >= 100) {
      pct = 100
      eff2ProcessingPct.value = 100
      clearInterval(interval)
      eff2ProcessingDone.value = true
    } else {
      eff2ProcessingPct.value = Math.round(pct)
    }
  }, 80)
}

onMounted(() => {
  if (step.value?.type === 'creating-plan') runCreatingPlan()
  if (step.value?.type === 'loading') {
    setTimeout(() => goNext(), 2500)
  }
  if (step.value?.id === 'kegel-eff-2') runEff2Processing()
  if (step.value?.type === 'final-adjustment') {
    finalContentVisible.value = false
    setTimeout(() => { finalContentVisible.value = true }, 800)
  }
})

function runCreatingPlan() {
  shownReviews.value = 1
  function animateLoader(idx: number) {
    if (idx >= 4) {
      planReady.value = true
      return
    }
    let pct = 0
    const interval = setInterval(() => {
      pct += Math.random() * 3 + 1.5
      if (pct >= 100) {
        pct = 100
        loaderPercents.value[idx] = 100
        clearInterval(interval)
        if (idx < 3) shownReviews.value = idx + 2
        setTimeout(() => animateLoader(idx + 1), 400)
      } else {
        loaderPercents.value[idx] = Math.round(pct)
      }
    }, 80)
  }
  animateLoader(0)
}

function renderBold(text: string) {
  return text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
}

const goalMap: Record<string, string> = {
  'Improve Erectile Function': 'Erectile Function',
  'Improve Ejaculation Control': 'Ejaculation Control',
  'Maximize Sexual Wellness': 'Sexual Wellness',
}

function selectOption(val: string) {
  currentAnswer.value = val
  if (step.value?.id === 'q0') {
    setGoal(goalMap[val] ?? 'Sexual Wellness')
  }
}
</script>

<template>
  <div v-if="step" :class="step.theme === 'dark' ? 'quiz-dark-wrapper' : 'quiz-white-wrapper'">
    <QuizHeader :dark="step.theme === 'dark'" />
    <ProgressBar
      v-if="step.type !== 'loading' && step.type !== 'consent' && step.type !== 'creating-plan' && step.type !== 'trusted' && step.type !== 'help-improve' && step.type !== 'best-thing' && step.type !== 'final-adjustment' && step.type !== 'info-goal-2' && step.type !== 'info-goal'"
      :progress="step.progress"
      :active-checkmarks="step.activeCheckmarks"
      :dark="step.theme === 'dark'"
    />

    <!-- ===== SINGLE SELECT ===== -->
    <div v-if="step.type === 'single-select'" class="page-wrapper quiz-question">
      <QuestionSingleSelect
        :question="step.question!"
        :options="step.options!"
        :option-subtexts="step.optionSubtexts"
        :modelValue="currentAnswer as string"
        @update:modelValue="selectOption($event)"
      />
      <NavControls
        :prev-id="step.prev"
        :next-id="step.next"
        :can-next="canNext"
        :dark="false"
        @next="goNext"
        @prev="goPrev"
      />
    </div>

    <!-- ===== RATING ===== -->
    <div v-else-if="step.type === 'rating'" class="page-wrapper quiz-question">
      <QuestionRating
        :question="step.question!"
        :rate-labels="step.rateLabels!"
        :modelValue="currentAnswer as number"
        @update:modelValue="currentAnswer = $event"
      />
      <NavControls
        :prev-id="step.prev"
        :next-id="step.next"
        :can-next="canNext"
        :dark="false"
        @next="goNext"
        @prev="goPrev"
      />
    </div>

    <!-- ===== INFO VIDEO (ed-s1) ===== -->
    <div v-else-if="step.type === 'info-video'" class="page-wrapper s1-screen">
      <h2 class="s1-screen__title h2_title text-center">
        <span class="underline">Quality of Erection</span>
        depends on the strength of the
        <span class="green">Pelvic Floor (PF) muscles</span>
      </h2>
      <div v-if="step.videoSrc" class="s1-screen__video">
        <video autoplay loop playsinline :poster="step.videoPoster" preload="auto">
          <source :src="step.videoSrc" type="video/mp4" />
        </video>
      </div>
      <p v-if="step.body" class="s1-screen__text" v-html="step.body" />
      <NavControls
        :prev-id="step.prev"
        :next-id="step.next"
        :can-next="true"
        :dark="true"
        :next-label="step.ctaText ?? 'Continue'"
        @next="goNext"
        @prev="goPrev"
      />
    </div>

    <!-- ===== EFFECTIVE-EXERCISES INFO IMAGE ===== -->
    <div v-else-if="step.type === 'info-image' && step.id === 'effective-exercises'" class="page-wrapper effective-exercises">
      <div class="effective-exercises__fact">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="19" viewBox="0 0 20 19" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M11.2032 1.69499C10.8137 1.31 10.1869 1.31 9.79736 1.69499L8.4388 3.03765C8.25306 3.22121 8.00289 3.32483 7.74176 3.32637L5.83171 3.33762C5.28403 3.34084 4.84084 3.78403 4.83762 4.33171L4.82637 6.24176C4.82483 6.50289 4.72121 6.75306 4.53765 6.9388L3.19499 8.29736C2.81 8.68691 2.81 9.31367 3.19499 9.70322L4.53765 11.0618C4.72121 11.2475 4.82483 11.4977 4.82637 11.7588L4.83762 13.6689C4.84084 14.2165 5.28403 14.6597 5.83171 14.663L7.74176 14.6742C8.00289 14.6757 8.25306 14.7794 8.4388 14.9629L9.79736 16.3056C10.1869 16.6906 10.8137 16.6906 11.2032 16.3056L12.5618 14.9629C12.7475 14.7794 12.9977 14.6757 13.2588 14.6742L15.1689 14.663C15.7165 14.6597 16.1597 14.2165 16.163 13.6689L16.1742 11.7588C16.1757 11.4977 16.2794 11.2475 16.4629 11.0618L17.8056 9.70322C18.1906 9.31367 18.1906 8.68691 17.8056 8.29736L16.4629 6.9388C16.2794 6.75306 16.1757 6.50289 16.1742 6.24176L16.163 4.33171C16.1597 3.78403 15.7165 3.34084 15.1689 3.33762L13.2588 3.32637C12.9977 3.32483 12.7475 3.22121 12.5618 3.03765L11.2032 1.69499Z" fill="#5773D6"/></svg>
        <span>Study fact</span>
      </div>
      <h2 class="h2_title text-center">
        <span style="text-decoration-line: underline">Kegel Exercises</span>
        strengthen PF muscles, which effectively
        <span style="color: #53cc58">enhances Erection</span>
      </h2>
      <img v-if="step.imageSrc" :src="step.imageSrc" alt="kegel erection" class="effective-exercises__image" />
      <div v-if="step.sourceText" class="effective-exercises__hospital">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 37 37" fill="none"><circle opacity=".07" cx="18.5" cy="18.5" r="18.5" fill="white"/><path fill-rule="evenodd" clip-rule="evenodd" d="M17.617 5.19C14.413 5.7 11.736 6.82 11.044 7.94C10.244 9.234 11.232 10.517 14.143 11.96C15.68 12.72 16.079 12.823 14.893 12.151C13.89 11.582 12.708 10.52 12.488 9.99C12.168 9.218 12.643 8.587 13.915 8.094C14.597 7.83 17.275 7.356 18.08 7.356C19.045 7.356 19.064 7.331 19.064 6.092C19.064 5.289 19.019 4.99 18.9 5L17.617 5.19Z" fill="white"/></svg>
        <span class="text-sm" style="color:rgba(255,255,255,0.7)">{{ step.sourceText }}</span>
      </div>
      <NavControls
        :prev-id="step.prev"
        :next-id="step.next"
        :can-next="true"
        :dark="true"
        :next-label="step.ctaText ?? 'I got it'"
        @next="goNext"
        @prev="goPrev"
      />
    </div>

    <!-- ===== KEGEL-EFF-2 INFO IMAGE (84% erection) ===== -->
    <div v-else-if="step.type === 'info-image' && step.id === 'kegel-eff-2'" class="page-wrapper kegel-effectiveness">
      <div class="kegel-effectiveness__fact">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2.75 14.125C2.75 11.2255 5.10051 8.875 8 8.875C10.8995 8.875 13.25 11.2255 13.25 14.125V15H2.75V14.125Z" fill="white"/><rect x="4.5" y="1" width="7" height="7" rx="3.5" fill="white"/></svg>
        <span>User survey</span>
      </div>
      <h2 class="h2_title text-center kegel-effectiveness__title">
        <span class="green">84% of men</span>
        significantly improved erection by following
        <span class="underline">the Kegel Plan</span>
      </h2>
      <img v-if="step.imageSrc" :src="step.imageSrc" alt="kegel erection" class="kegel-effectiveness__image" />
      <div class="review dark">
        <div class="review__top-block">
          <div class="review__rating">
            <svg v-for="n in 5" :key="n" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><g fill="none"><rect width="16" height="16" fill="#1DB87F"/><path d="M7.99779 2.17969L9.30404 6.19995H13.5311L10.1113 8.68461L11.4176 12.7049L7.99779 10.2202L4.578 12.7049L5.88424 8.68461L2.46445 6.19995H6.69155L7.99779 2.17969Z" fill="white"/></g></svg>
          </div>
          <span class="review-name paragraph-12-500">Chauchooo</span>
        </div>
        <h3 class="review__title paragraph_14-700">The effect is great</h3>
        <p class="review__text paragraph-12-500">After 4 weeks of kegels, I have no trouble getting and maintaining erection. If you're struggling as I did, try these exercises</p>
      </div>
      <div class="processing kegel-effectiveness__processing" data-testid="s4-progress">
        <div class="processing__title">Connecting to the database</div>
        <div class="processing__body">
          <span class="processing__body-percent">{{ eff2ProcessingPct }}%</span>
          <span class="processing__body-progress" :style="{ width: eff2ProcessingPct + '%' }"></span>
        </div>
      </div>
      <Transition name="fade">
        <NavControls
          v-if="eff2ProcessingDone"
          :prev-id="step.prev"
          :next-id="step.next"
          :can-next="true"
          :dark="true"
          :next-label="step.ctaText ?? 'I got it'"
          @next="goNext"
          @prev="goPrev"
        />
      </Transition>
    </div>

    <!-- ===== KEGEL-PLAN-BENEFITS INFO IMAGE ===== -->
    <div v-else-if="step.type === 'info-image' && step.id === 'kegel-benefits'" class="page-wrapper kegel-plan-benefits">
      <h2 class="h2_title text-center" v-html="renderBold(step.title ?? '')" />
      <img v-if="step.imageSrc" :src="step.imageSrc" alt="kegel erection" class="kegel-plan-benefits__image" />
      <div v-if="step.sourceText" class="kegel-plan-benefits__hospital">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 37 37" fill="none"><circle opacity=".07" cx="18.5" cy="18.5" r="18.5" fill="white"/><path fill-rule="evenodd" clip-rule="evenodd" d="M17.617 5.19C14.413 5.7 11.736 6.82 11.044 7.94C10.244 9.234 11.232 10.517 14.143 11.96C15.68 12.72 16.079 12.823 14.893 12.151C13.89 11.582 12.708 10.52 12.488 9.99C12.168 9.218 12.643 8.587 13.915 8.094C14.597 7.83 17.275 7.356 18.08 7.356C19.045 7.356 19.064 7.331 19.064 6.092C19.064 5.289 19.019 4.99 18.9 5L17.617 5.19Z" fill="white"/></svg>
        <div class="kegel-plan-benefits__hospital-text-wrapper">
          <span class="hospital-text source-text">{{ step.sourceText }}</span>
        </div>
      </div>
      <NavControls
        :prev-id="step.prev"
        :next-id="step.next"
        :can-next="true"
        :dark="true"
        :next-label="step.ctaText ?? 'I got it'"
        @next="goNext"
        @prev="goPrev"
      />
    </div>

    <!-- ===== GOAL PAGE (dark) ===== -->
    <div v-else-if="step.type === 'info-goal'" class="page-wrapper goal-page">
      <h2 class="goal-page__title">{{ step.title }}</h2>
      <p class="goal-page__subtitle" v-html="renderBold(goalSubtitle)" />
      <p class="goal-page__by">by {{ targetDate }}</p>
      <div class="goal-page__video">
        <video autoplay loop playsinline :poster="step.videoPoster" preload="auto">
          <source :src="step.videoSrc" type="video/mp4" />
        </video>
        <p>*for illustration purposes only</p>
      </div>
      <div class="reviews-wrapper goal-page__reviews">
        <h2 class="title-24-800 text-center">Customer reviews</h2>
        <div class="reviews">
          <div class="review light">
            <div class="review__tob-block">
              <div class="review__top">
                <h3 class="review__title paragraph_14-700">Awesome!</h3>
                <span class="review-name paragraph-12-500">Brown</span>
              </div>
              <div class="review__rating">
                <svg v-for="n in 5" :key="n" xmlns="http://www.w3.org/2000/svg" width="1.08em" height="1em" viewBox="0 0 14 13"><g fill="none"><path d="M6.68143 0.700154C6.80582 0.426757 7.19418 0.426757 7.31857 0.700154L8.87638 4.12386C8.92732 4.23583 9.03331 4.31283 9.15554 4.32669L12.8931 4.75026C13.1915 4.78408 13.3115 5.15343 13.09 5.35622L10.3152 7.89576C10.2245 7.97882 10.184 8.10341 10.2086 8.22394L10.9607 11.9094C11.0207 12.2037 10.7066 12.432 10.4452 12.2839L7.17253 10.4297C7.0655 10.3691 6.9345 10.3691 6.82747 10.4297L3.55477 12.2839C3.29344 12.432 2.97925 12.2037 3.03931 11.9094L3.79143 8.22394C3.81603 8.10341 3.77554 7.97882 3.6848 7.89576L0.910046 5.35622C0.688471 5.15343 0.808478 4.78408 1.10693 4.75026L4.84446 4.32669C4.96669 4.31283 5.07268 4.23583 5.12362 4.12386L6.68143 0.700154Z" fill="#FE9B1A"/></g></svg>
              </div>
            </div>
            <p class="review__text paragraph-12-500">2 weeks and I can already feel improvements 💪</p>
          </div>
          <div class="review light">
            <div class="review__tob-block">
              <div class="review__top">
                <h3 class="review__title paragraph_14-700">Guys, you must try it</h3>
                <span class="review-name paragraph-12-500">Amteleronnnnn</span>
              </div>
              <div class="review__rating">
                <svg v-for="n in 5" :key="n" xmlns="http://www.w3.org/2000/svg" width="1.08em" height="1em" viewBox="0 0 14 13"><g fill="none"><path d="M6.68143 0.700154C6.80582 0.426757 7.19418 0.426757 7.31857 0.700154L8.87638 4.12386C8.92732 4.23583 9.03331 4.31283 9.15554 4.32669L12.8931 4.75026C13.1915 4.78408 13.3115 5.15343 13.09 5.35622L10.3152 7.89576C10.2245 7.97882 10.184 8.10341 10.2086 8.22394L10.9607 11.9094C11.0207 12.2037 10.7066 12.432 10.4452 12.2839L7.17253 10.4297C7.0655 10.3691 6.9345 10.3691 6.82747 10.4297L3.55477 12.2839C3.29344 12.432 2.97925 12.2037 3.03931 11.9094L3.79143 8.22394C3.81603 8.10341 3.77554 7.97882 3.6848 7.89576L0.910046 5.35622C0.688471 5.15343 0.808478 4.78408 1.10693 4.75026L4.84446 4.32669C4.96669 4.31283 5.07268 4.23583 5.12362 4.12386L6.68143 0.700154Z" fill="#FE9B1A"/></g></svg>
              </div>
            </div>
            <p class="review__text paragraph-12-500">I followed this kegel plan and now my performance is at its peak! Guys, this is a real game-changer - don't sleep on it</p>
          </div>
          <div class="review light">
            <div class="review__tob-block">
              <div class="review__top">
                <h3 class="review__title paragraph_14-700">Fantastic</h3>
                <span class="review-name paragraph-12-500">Brodaу56</span>
              </div>
              <div class="review__rating">
                <svg v-for="n in 5" :key="n" xmlns="http://www.w3.org/2000/svg" width="1.08em" height="1em" viewBox="0 0 14 13"><g fill="none"><path d="M6.68143 0.700154C6.80582 0.426757 7.19418 0.426757 7.31857 0.700154L8.87638 4.12386C8.92732 4.23583 9.03331 4.31283 9.15554 4.32669L12.8931 4.75026C13.1915 4.78408 13.3115 5.15343 13.09 5.35622L10.3152 7.89576C10.2245 7.97882 10.184 8.10341 10.2086 8.22394L10.9607 11.9094C11.0207 12.2037 10.7066 12.432 10.4452 12.2839L7.17253 10.4297C7.0655 10.3691 6.9345 10.3691 6.82747 10.4297L3.55477 12.2839C3.29344 12.432 2.97925 12.2037 3.03931 11.9094L3.79143 8.22394C3.81603 8.10341 3.77554 7.97882 3.6848 7.89576L0.910046 5.35622C0.688471 5.15343 0.808478 4.78408 1.10693 4.75026L4.84446 4.32669C4.96669 4.31283 5.07268 4.23583 5.12362 4.12386L6.68143 0.700154Z" fill="#FE9B1A"/></g></svg>
              </div>
            </div>
            <p class="review__text paragraph-12-500">The results are amazing</p>
          </div>
        </div>
        <button type="button" class="base-button base-button--text base-button--rounded-half base-button__bold reviews__button blue" style="width:100%">
          <div class="base-button__content"><span class="reviews__button-text">Show more</span></div>
        </button>
      </div>
      <button type="button" class="base-button base-button--red base-button--rounded-half shadow base-button__bold goal-page__cta" style="width:100%" @click="goNext">
        <div class="base-button__content"><span class="goal-page__button-text">Continue</span></div>
      </button>
    </div>

    <!-- ===== GOAL PAGE 2 (white) ===== -->
    <div v-else-if="step.type === 'info-goal-2'" class="page-wrapper goal-page">
      <h2 class="goal-page__title">{{ step.title }}</h2>
      <p class="goal-page__subtitle"><span>Improve <b>{{ goalLabel }}</b></span></p>
      <div class="goal-page__dates">
        <p class="goal-page__by">
          <span style="display:none">by {{ targetDate }}</span>
          <span class="dots-container goal-page__dots-text">
            <span class="dots-container__text goal-page__dots">by </span><span class="goal-page__dots dots-container__dots" style="min-width:1px;max-width:1px">..</span>
          </span>
        </p>
        <video autoplay loop playsinline poster="https://quiz.kegel-plan.com/video/en/EN_video_19_faster_zaglushka.webp" preload="auto" class="goal-page__label" style="display:none">
          <source src="https://quiz.kegel-plan.com/video/en/EN_video_19_faster.mp4" type="video/mp4" />
        </video>
      </div>
      <div class="goal-page__video">
        <video autoplay playsinline :poster="step.videoPoster" preload="auto">
          <source :src="step.videoSrc" type="video/mp4" />
        </video>
        <p>*for illustration purposes only</p>
      </div>
      <div class="goal-page__content show">
        <div class="goal-page__info">
          <div class="goal-page__info-item">
            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" viewBox="0 0 24 24" fill="none"><g fill="none"><path d="M12.972 3.03906H10.4045C10.065 3.03906 9.78909 3.31493 9.78909 3.65443C9.78909 3.99394 10.065 4.2698 10.4045 4.2698H12.972C13.3115 4.2698 13.5874 3.99394 13.5874 3.65443C13.5874 3.31493 13.3115 3.03906 12.972 3.03906ZM11.6776 5.60663C7.4337 5.60663 3.99609 9.04424 3.99609 13.2882C3.99609 17.5321 7.4337 20.9697 11.6776 20.9697C15.9216 20.9697 19.3592 17.5321 19.3592 13.2882C19.3592 9.04424 15.9216 5.60663 11.6776 5.60663ZM14.8606 14.1157H11.6776C11.3381 14.1157 11.0623 13.8399 11.0623 13.5004V9.51108C11.0623 9.17157 11.3381 8.89571 11.6776 8.89571C12.0172 8.89571 12.293 9.17157 12.293 9.51108V12.9062H14.8606C15.2001 12.9062 15.476 13.1821 15.476 13.5216C15.476 13.8399 15.2001 14.1157 14.8606 14.1157Z" fill="#111113"/></g></svg>
            <p>Duration: <b>5 min/day</b></p>
          </div>
          <div class="goal-page__info-item">
            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" viewBox="0 0 24 24" fill="none"><g fill="none"><path d="M12.0821 16.6411C12.5841 17.1437 12.581 17.9523 12.0821 18.4512L10.9532 19.5801C10.4585 20.0761 9.64528 20.0824 9.14303 19.5801L4.41974 14.8568C3.92089 14.3577 3.92089 13.5456 4.41974 13.0467L5.54865 11.9178C6.04753 11.4189 6.85617 11.4158 7.3588 11.9178L12.0821 16.6411ZM14.8567 4.41992C14.3575 3.92106 13.5454 3.92074 13.0465 4.41992L11.9176 5.54882C11.4187 6.04768 11.4156 6.85631 11.9176 7.35897L16.6409 12.0823C17.144 12.5847 17.9527 12.5806 18.4511 12.0823L19.58 10.9534C20.0788 10.4545 20.0788 9.64238 19.58 9.14321L14.8567 4.41992Z" fill="#111113"/></g></svg>
            <p>Equipment: <b>not needed</b></p>
          </div>
        </div>
        <div class="goal-page__note">
          <p><span class="bold">Note:</span> All exercises from the Kegel Plan are discreet to other people. Therefore, you can do them anywhere and at any time</p>
        </div>
        <button type="button" class="base-button base-button--red base-button--rounded-half shadow base-button__bold goal-page__cta" style="width:100%" @click="goNext">
          <div class="base-button__content"><span class="goal-page__button-text">Continue</span></div>
        </button>
      </div>
    </div>

    <!-- ===== HEALTH LOADING ===== -->
    <div v-else-if="step.type === 'loading'" class="health-onboarding">
      <div class="dots-container health-onboarding__title-wrapper">
        <h1 class="dots-container__text health-onboarding__title h2_title">Creating your plan</h1>
        <h1 class="health-onboarding__title h2_title dots-container__dots" style="min-width:1px;max-width:1px">..</h1>
      </div>
      <div class="health-onboarding__loader-wrapper">
        <div class="health-onboarding__loader"></div>
      </div>
    </div>

    <!-- ===== HEALTH CONSENT ===== -->
    <div v-else-if="step.type === 'consent'" class="health-onboarding__popup-wrapper">
      <div class="health-onboarding__popup">
        <div class="health-onboarding__content">
          <div class="health-onboarding__checkbox" @click="healthConsent = !healthConsent">
            <div v-if="!healthConsent" class="health-onboarding__checkbox-empty" />
            <div v-else class="health-onboarding__checkbox-checked">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6L5 9L10 3" stroke="white" stroke-width="2" stroke-linecap="round"/></svg>
            </div>
          </div>
          <span class="health-onboarding__text paragraph-12-400">
            I consent to Dr. Kegel processing my health onboarding data to provide services and enhance my user experience.
            <a href="#" style="color:#5773D6">Privacy Policy</a>.
          </span>
        </div>
        <div class="health-onboarding__button-wrapper">
          <button
            :class="['base-button base-button--red base-button--rounded-half base-button__bold health-onboarding__continue-button', !healthConsent && 'base-button__disabled']"
            style="width:100%"
            :disabled="!healthConsent"
            @click="healthConsent && goNext()"
          >
            <div class="base-button__content">
              <span class="health-onboarding__button-text">Continue</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M13.4654 6.05071C13.0748 5.66018 12.4417 5.66018 12.0512 6.05071C11.6606 6.44123 11.6606 7.07439 12.0512 7.46492L14.5867 10.0005H5.01562C4.46334 10.0005 4.01562 10.4482 4.01562 11.0005C4.01562 11.5527 4.46334 12.0005 5.01562 12.0005H14.5867L12.0512 14.536C11.6606 14.9265 11.6606 15.5597 12.0512 15.9502C12.4417 16.3407 13.0748 16.3407 13.4654 15.9502L17.708 11.7076C18.0985 11.317 18.0985 10.6839 17.708 10.2933L13.4654 6.05071Z" fill="white"/></svg>
            </div>
          </button>
        </div>
      </div>
    </div>

    <!-- ===== CREATING PLAN ===== -->
    <div v-else-if="step.type === 'creating-plan'" class="creating-plan container">
      <div class="dots-container creating-plan__title-wrapper">
        <h1 class="dots-container__text creating-plan__title h2_title">Analyzing your answers</h1>
        <h1 class="creating-plan__title h2_title dots-container__dots" style="min-width:1px;max-width:1px">...</h1>
      </div>
      <div class="creating-plan__wrapper">
        <div v-for="(label, idx) in loaderLabels" :key="idx" class="answer-loader">
          <div class="answer-loader__top-block">
            <h2 :class="['answer-loader__title', loaderPercents[idx] > 0 ? 'answer-loader__title-active' : 'answer-loader__title-inactive']">
              {{ label }}
            </h2>
            <div class="answer-loader__bottom-block">
              <span v-if="loaderPercents[idx] > 0 && loaderPercents[idx] < 100" class="answer-loader__spinner" />
              <p :class="['answer-loader__percent', loaderPercents[idx] > 0 && 'answer-loader__percent-active']">
                {{ loaderPercents[idx] > 0 ? loaderPercents[idx] + '%' : '0%' }}
              </p>
            </div>
          </div>
          <div class="answer-loader__progress-wrapper">
            <div class="answer-loader__progress" :style="{ width: loaderPercents[idx] + '%' }" />
          </div>
        </div>
      </div>
      <div class="creating-plan__reviews">
        <Transition name="fade">
          <div class="review light" style="margin-bottom:12px">
            <div class="review__top-block">
              <div class="review__rating"><svg v-for="n in 5" :key="n" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><g fill="none"><rect width="16" height="16" fill="#1DB87F"/><path d="M7.99779 2.17969L9.30404 6.19995H13.5311L10.1113 8.68461L11.4176 12.7049L7.99779 10.2202L4.578 12.7049L5.88424 8.68461L2.46445 6.19995H6.69155L7.99779 2.17969Z" fill="white"/></g></svg></div>
              <span class="review-name" style="color:rgba(17,17,19,0.5)">TopicSilly</span>
            </div>
            <h3 class="review__title paragraph_14-700">Super</h3>
            <p class="review__text paragraph-12-500" style="color:rgba(17,17,19,0.7)">
              I've only started recently but the results are incredible! I can tell that my endurance and performance improved a lot
            </p>
          </div>
        </Transition>
        <Transition name="fade">
          <div v-if="shownReviews >= 2" class="review light" style="margin-bottom:12px">
            <div class="review__top-block">
              <div class="review__rating"><svg v-for="n in 5" :key="n" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><g fill="none"><rect width="16" height="16" fill="#1DB87F"/><path d="M7.99779 2.17969L9.30404 6.19995H13.5311L10.1113 8.68461L11.4176 12.7049L7.99779 10.2202L4.578 12.7049L5.88424 8.68461L2.46445 6.19995H6.69155L7.99779 2.17969Z" fill="white"/></g></svg></div>
              <span class="review-name" style="color:rgba(17,17,19,0.5)">Will123Darth368</span>
            </div>
            <h3 class="review__title paragraph_14-700">Kegel really works</h3>
            <p class="review__text paragraph-12-500" style="color:rgba(17,17,19,0.7)">
              I've had some erection problems before. But after a while with kegel training, it has become so much firmer! It's amazing
            </p>
          </div>
        </Transition>
        <Transition name="fade">
          <div v-if="shownReviews >= 3" class="review light" style="margin-bottom:12px">
            <div class="review__top-block">
              <div class="review__rating"><svg v-for="n in 5" :key="n" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><g fill="none"><rect width="16" height="16" fill="#1DB87F"/><path d="M7.99779 2.17969L9.30404 6.19995H13.5311L10.1113 8.68461L11.4176 12.7049L7.99779 10.2202L4.578 12.7049L5.88424 8.68461L2.46445 6.19995H6.69155L7.99779 2.17969Z" fill="white"/></g></svg></div>
              <span class="review-name" style="color:rgba(17,17,19,0.5)">Solved by kegel</span>
            </div>
            <h3 class="review__title paragraph_14-700">Solved my problems</h3>
            <p class="review__text paragraph-12-500" style="color:rgba(17,17,19,0.7)">
              My urologist advised me to do Kegels to fix some below belt problems. 6 weeks in and I have no problems at all. If you're looking to improve your men's health - try it, you won't regret it
            </p>
          </div>
        </Transition>
        <Transition name="fade">
          <div v-if="shownReviews >= 4" class="review light" style="margin-bottom:12px">
            <div class="review__top-block">
              <div class="review__rating"><svg v-for="n in 5" :key="n" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><g fill="none"><rect width="16" height="16" fill="#1DB87F"/><path d="M7.99779 2.17969L9.30404 6.19995H13.5311L10.1113 8.68461L11.4176 12.7049L7.99779 10.2202L4.578 12.7049L5.88424 8.68461L2.46445 6.19995H6.69155L7.99779 2.17969Z" fill="white"/></g></svg></div>
              <span class="review-name" style="color:rgba(17,17,19,0.5)">Kegel_fan</span>
            </div>
            <h3 class="review__title paragraph_14-700">Amazing results</h3>
            <p class="review__text paragraph-12-500" style="color:rgba(17,17,19,0.7)">
              It's been only a couple of weeks with Kegel exercises but I can already see a huge difference in my performance. I'm happy with my results!
            </p>
          </div>
        </Transition>
        <Transition name="fade">
          <button
            v-if="planReady"
            type="button"
            class="base-button base-button--red base-button--rounded-half shadow base-button__bold"
            style="width:100%;margin-top:8px"
            @click="goNext"
          >
            <div class="base-button__content">Your plan is ready!</div>
          </button>
        </Transition>
      </div>
    </div>

    <!-- ===== TRUSTED ===== -->
    <div v-else-if="step.type === 'trusted'" class="container trusted-page">
      <h2 class="trusted-page__title">{{ step.title }}</h2>
      <div class="trusted-page__video">
        <video autoplay playsinline :poster="step.videoPoster" preload="auto" class="w-full rounded-2xl">
          <source :src="step.videoSrc" type="video/mp4" />
        </video>
      </div>
      <div class="trusted-page__image">
        <img :src="step.imageSrc" alt="Men worldwide" class="w-full rounded-2xl" />
      </div>
      <div class="trusted-page__buttons">
        <button class="base-button base-button--grey base-button--rounded-half" style="width:100%" @click="goPrev">
          <div class="base-button__content">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M8.53463 6.05C8.92515 5.66 9.55832 5.66 9.94884 6.05C10.3394 6.44 10.3394 7.07 9.94884 7.46L7.41331 10H16.9844C17.5367 10 17.9844 10.45 17.9844 11C17.9844 11.55 17.5367 12 16.9844 12H7.41331L9.94884 14.54C10.3394 14.93 10.3394 15.56 9.94884 15.95C9.55832 16.34 8.92515 16.34 8.53463 15.95L4.29199 11.71C3.90146 11.32 3.90146 10.68 4.29199 10.29L8.53463 6.05Z" fill="#4A4A4B"/></svg>
            Back
          </div>
        </button>
        <button class="base-button base-button--red base-button--rounded-half" style="width:100%" @click="goNext">
          <div class="base-button__content">
            Continue
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M13.4654 6.05C13.0748 5.66 12.4417 5.66 12.0512 6.05C11.6606 6.44 11.6606 7.07 12.0512 7.46L14.5867 10H5.01562C4.46334 10 4.01562 10.45 4.01562 11C4.01562 11.55 4.46334 12 5.01562 12H14.5867L12.0512 14.54C11.6606 14.93 11.6606 15.56 12.0512 15.95C12.4417 16.34 13.0748 16.34 13.4654 15.95L17.708 11.71C18.0985 11.32 18.0985 10.68 17.708 10.29L13.4654 6.05Z" fill="white"/></svg>
          </div>
        </button>
      </div>
    </div>

    <!-- ===== HELP IMPROVE ===== -->
    <div v-else-if="step.type === 'help-improve'" class="container help-improve">
      <h2 class="help-improve__title">{{ step.title }}</h2>
      <div class="areas-improvements" style="--v5f2900a4: rgba(17,17,19,0.8)">
        <h2 class="title-24-800" style="display:none" />
        <ul class="improvement-areas">
          <li v-for="area in helpImproveAreas" :key="area.text" class="improvement-areas__item">
            <div class="improvement-areas__item-wrapper">
              <ImprovementIcon :index="area.iconIdx" />
              <p class="improvement-areas__item-text paragraph-16-600">{{ area.text }}</p>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M7.5 3L15 12.5976H0L7.5 3Z" :fill="`url(#ag${area.iconIdx})`"/><defs><linearGradient :id="`ag${area.iconIdx}`" x1="7.5" y1="3" x2="7.5" y2="12.5976" gradientUnits="userSpaceOnUse"><stop offset="0.395833" stop-color="#53CC58"/><stop offset="1" stop-color="#429746" stop-opacity="0"/></linearGradient></defs></svg>
            </div>
          </li>
        </ul>
      </div>
      <div class="help-improve__buttons">
        <button class="base-button base-button--grey base-button--rounded-half" style="width:100%" @click="goPrev">
          <div class="base-button__content">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M8.53463 6.05071C8.92515 5.66018 9.55832 5.66018 9.94884 6.05071C10.3394 6.44123 10.3394 7.07439 9.94884 7.46492L7.41331 10.0005H16.9844C17.5367 10.0005 17.9844 10.4482 17.9844 11.0005C17.9844 11.5527 17.5367 12.0005 16.9844 12.0005H7.41331L9.94884 14.536C10.3394 14.9265 10.3394 15.5597 9.94884 15.9502C9.55832 16.3407 8.92515 16.3407 8.53463 15.9502L4.29199 11.7076C3.90146 11.317 3.90146 10.6839 4.29199 10.2933L8.53463 6.05071Z" fill="#4A4A4B"/></svg>
            Back
          </div>
        </button>
        <button class="base-button base-button--red base-button--rounded-half" style="width:100%" @click="goNext">
          <div class="base-button__content">
            I got it
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M13.4654 6.05071C13.0748 5.66018 12.4417 5.66018 12.0512 6.05071C11.6606 6.44123 11.6606 7.07439 12.0512 7.46492L14.5867 10.0005H5.01562C4.46334 10.0005 4.01562 10.4482 4.01562 11.0005C4.01562 11.5527 4.46334 12.0005 5.01562 12.0005H14.5867L12.0512 14.536C11.6606 14.9265 11.6606 15.5597 12.0512 15.9502C12.4417 16.3407 13.0748 16.3407 13.4654 15.9502L17.708 11.7076C18.0985 11.317 18.0985 10.6839 17.708 10.2933L13.4654 6.05071Z" fill="white"/></svg>
          </div>
        </button>
      </div>
    </div>

    <!-- ===== BEST THING ===== -->
    <div v-else-if="step.type === 'best-thing'" class="container the-best-thing">
      <div class="five-minutes">
        <h2 class="five-minutes__title">{{ step.title }}</h2>
        <div class="five-minutes__image">
          <img :src="step.imageSrc" alt="5 min a day" style="min-height:200px;width:100%;display:block;" />
        </div>
        <div class="five-minutes__content">
          <div class="five-minutes__equipment">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12.082 16.641C12.584 17.144 12.581 17.952 12.082 18.451L10.953 19.58C10.459 20.076 9.645 20.082 9.143 19.58L4.42 14.857C3.921 14.358 3.921 13.546 4.42 13.047L5.549 11.918C6.048 11.419 6.856 11.416 7.359 11.918L12.082 16.641ZM14.857 4.42C14.357 3.921 13.545 3.921 13.047 4.42L11.918 5.549C11.419 6.048 11.416 6.856 11.918 7.359L16.641 12.082C17.144 12.584 17.952 12.581 18.451 12.082L19.58 10.953C20.079 10.455 20.079 9.642 19.58 9.143L14.857 4.42Z" fill="#111113"/></svg>
            <p>Equipment: <b>not needed</b></p>
          </div>
          <p class="five-minutes__note">
            <b>Note:</b> <i>All exercises from the Kegel Plan are discreet to other people. Therefore, you can do them anywhere and at any time</i>
          </p>
        </div>
      </div>
      <div class="the-best-thing__buttons">
        <button class="base-button base-button--grey base-button--rounded-half" style="width:100%" @click="goPrev">
          <div class="base-button__content">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M8.53463 6.05071C8.92515 5.66018 9.55832 5.66018 9.94884 6.05071C10.3394 6.44123 10.3394 7.07439 9.94884 7.46492L7.41331 10.0005H16.9844C17.5367 10.0005 17.9844 10.4482 17.9844 11.0005C17.9844 11.5527 17.5367 12.0005 16.9844 12.0005H7.41331L9.94884 14.536C10.3394 14.9265 10.3394 15.5597 9.94884 15.9502C9.55832 16.3407 8.92515 16.3407 8.53463 15.9502L4.29199 11.7076C3.90146 11.317 3.90146 10.6839 4.29199 10.2933L8.53463 6.05071Z" fill="#4A4A4B"/></svg>
            Back
          </div>
        </button>
        <button class="base-button base-button--red base-button--rounded-half" style="width:100%" @click="goNext">
          <div class="base-button__content">
            I got it
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M13.4654 6.05071C13.0748 5.66018 12.4417 5.66018 12.0512 6.05071C11.6606 6.44123 11.6606 7.07439 12.0512 7.46492L14.5867 10.0005H5.01562C4.46334 10.0005 4.01562 10.4482 4.01562 11.0005C4.01562 11.5527 4.46334 12.0005 5.01562 12.0005H14.5867L12.0512 14.536C11.6606 14.9265 11.6606 15.5597 12.0512 15.9502C12.4417 16.3407 13.0748 16.3407 13.4654 15.9502L17.708 11.7076C18.0985 11.317 18.0985 10.6839 17.708 10.2933L13.4654 6.05071Z" fill="white"/></svg>
          </div>
        </button>
      </div>
    </div>

    <!-- ===== FINAL ADJUSTMENT ===== -->
    <div v-else-if="step.type === 'final-adjustment'" class="page-wrapper final-adjustment">
      <h2 class="final-adjustment__title">{{ step.title }}</h2>
      <p class="final-adjustment__subtitle">You can Improve <b>{{ goalLabel }}</b></p>
      <div class="final-adjustment__dates">
        <p class="final-adjustment__by"><span style="display:none">by {{ targetDate }}</span></p>
        <video autoplay loop playsinline poster="https://quiz.kegel-plan.com/video/en/EN_video_34_faster_zaglushka.webp" preload="auto" class="final-adjustment__label" style="display:none">
          <source src="https://quiz.kegel-plan.com/video/en/EN_video_34_faster.mp4" type="video/mp4" />
        </video>
      </div>
      <div class="final-adjustment__video">
        <video autoplay playsinline :poster="step.videoPoster" preload="auto">
          <source :src="step.videoSrc" type="video/mp4" />
        </video>
        <p>*for illustration purposes only</p>
      </div>
      <div :class="['final-adjustment__content', finalContentVisible && 'show']">
        <h2 class="final-adjustment__content-title">
          Compatibility Score: <span class="green">High</span>
        </h2>
        <video playsinline poster="https://quiz.kegel-plan.com/video/posters/video_compatibility_score.webp" preload="auto" class="mx-auto">
          <source type="video/mp4" />
        </video>
        <span class="final-adjustment__content-score">{{ compatibilityScore }}%</span>
        <p class="final-adjustment__content-description">
          <span class="bold">{{ compatibilityScore }}%</span>
          of men from the same age group as you
          <span class="bold">({{ ageGroup }} years)</span>
          report noticeable improvements by following Kegel Plan.
        </p>
        <p class="final-adjustment__content-disclaimer">*statistics from internal survey</p>
        <button
          class="base-button base-button--red base-button--rounded-half shadow base-button__bold final-adjustment__cta"
          style="width:100%"
          @click="goNext"
        >
          <div class="base-button__content">Continue</div>
        </button>
      </div>
    </div>
  </div>
</template>
