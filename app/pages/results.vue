<script setup lang="ts">
import { useQuiz } from '~/composables/useQuiz'
const router = useRouter()
const { age } = useQuiz()

const plans = [
  { id: '1w', name: '1-WEEK PLAN', crossedPrice: '10.59 USD', price: '6.99 USD', discountPerDay: '1.50 USD', fullPerDay: '0.99 USD' },
  { id: '1m', name: '1-MONTH PLAN', crossedPrice: '31.00 USD', price: '15.19 USD', discountPerDay: '1.00 USD', fullPerDay: '0.49 USD', popular: true },
  { id: '3m', name: '3-MONTH PLAN', crossedPrice: '53.04 USD', price: '25.99 USD', discountPerDay: '0.59 USD', fullPerDay: '0.29 USD' },
]
const selected = ref('1m')

const timeLeft = ref('09:56')
onMounted(() => {
  let totalSec = 9 * 60 + 56
  const t = setInterval(() => {
    totalSec--
    if (totalSec <= 0) { clearInterval(t); return }
    const m = Math.floor(totalSec / 60)
    const s = totalSec % 60
    timeLeft.value = `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`
  }, 1000)
})

const targetDate = computed(() => {
  const d = new Date()
  d.setDate(d.getDate() + 28)
  return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })
})

const improvements = [
  { label: 'Erectile function', idx: 0 },
  { label: 'Ejaculation control', idx: 1 },
  { label: 'Prostate health', idx: 2 },
  { label: 'Confidence', idx: 3 },
  { label: 'Relationship happiness', idx: 4 },
]

const reviews = [
  { name: 'Pepsi Zero', rating: 5, title: 'To do it is to believe it truly works', text: "I was very skeptical at first. Seems like yeah yeah yeah but nothing works. I started having problems about 1 yr ago. I bought supplements, but never worked. So I came across this ad on my feed. What the heck let me try it. Even though it would cost some money. I've wasted money before. So I decided to try it. I will say I noticed a difference in about 2 weeks. So I was excited about the results in the future. I've now doing the exercises for 72 days straight. WOW I wake up like I'm in my twenties. Standing at attention, bigger, stronger than in years. I definitely would recommend this plan to everyone. Just remember be committed to doing the exercise as I am. I guarantee you'll see results and you'll be tremendously happy." },
  { name: 'Yak', rating: 5, title: 'Excellent', text: 'Literally changed my life!' },
  { name: 'IVBES', rating: 5, title: 'Few weeks in', text: "I'm a few weeks in and I can already tell there's better blood flow and less temptation to ejaculate early." },
]

</script>

<template>
  <div class="landing-wrapper en">
    <!-- Timer Banner -->
    <div class="landing-timer">
      <div class="landing-timer__wrapper">
        <p class="paragraph_14-400">51% Discount reserved for</p>
        <span class="landing-timer__time">{{ timeLeft }}</span>
      </div>
      <button class="base-button base-button--blue base-button--rounded-half base-button__bold landing-timer__button">
        <div class="base-button__content">Get My Plan</div>
      </button>
    </div>

    <!-- Header -->
    <header class="flex items-center w-full min-h-[28px] p-6 sm:max-w-[600px] sm:mx-auto">
      <img src="/doctor-kegel.png" alt="Doctor Kegel" class="w-[120px] sm:w-[150px]" style="min-height:28px;" />
    </header>

    <div class="page-wrapper landing-page-template">
      <!-- Title -->
      <h1 class="h1_title text-center">Your Personal Plan is Ready!</h1>

      <!-- Before/After image -->
      <img
        src="https://quiz.kegel-plan.com/_vercel/image?url=%2Fimages%2Fen%2FEN_img_beforeafter2.webp&w=1536&q=100"
        alt="landing"
        class="landing-image"
        style="min-height:313px;"
      />

      <!-- Areas of improvements -->
      <div class="areas-improvements" style="--v5f2900a4: rgba(17,17,19,0.8)">
        <h2 class="title-24-800">Areas of Improvements</h2>
        <ul class="improvement-areas">
          <li v-for="item in improvements" :key="item.label" class="improvement-areas__item">
            <div class="improvement-areas__item-wrapper">
              <ImprovementIcon :index="item.idx" />
              <p class="improvement-areas__item-text paragraph-16-600">{{ item.label }}</p>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M7.5 3L15 12.5976H0L7.5 3Z" :fill="`url(#rg${item.idx})`"/>
                <defs><linearGradient :id="`rg${item.idx}`" x1="7.5" y1="3" x2="7.5" y2="12.5976" gradientUnits="userSpaceOnUse"><stop offset="0.395833" stop-color="#53CC58"/><stop offset="1" stop-color="#429746" stop-opacity="0"/></linearGradient></defs>
              </svg>
            </div>
          </li>
        </ul>
      </div>

      <!-- When to Expect Improvements -->
      <h2 class="title-24-800 text-center">When to Expect Improvements</h2>
      <p class="expect-text paragraph-16-400 text-center">Based on our data you can reach noticeable improvements</p>
      <div class="final-graph">
        <div class="final-graph__date-wrapper">
          <span class="final-graph__date-text paragraph-20-700">by {{ targetDate }}</span>
          <video autoplay loop playsinline poster="https://quiz.kegel-plan.com/video/en/EN_video_34_faster_zaglushka.webp" preload="auto" class="final-graph__video">
            <source src="https://quiz.kegel-plan.com/video/en/EN_video_34_faster.mp4" type="video/mp4" />
          </video>
        </div>
        <img
          src="https://quiz.kegel-plan.com/_vercel/image?url=%2Fimages%2Fen%2FEN_video_graph_final.webp&w=1536&q=100"
          alt="final graph"
          class="final-graph__image"
          style="min-height:190px;"
          loading="lazy"
        />
        <p class="final-graph__image-label paragraph-12-300">*for illustration purposes only</p>
      </div>
    </div>

    <!-- Plan Section 1 -->
    <div class="personal-plan" style="--theme-color:#5773d6">
      <h2 class="h1_title text-center">Get your Personal Kegel Plan</h2>
      <div class="personal-plan__timer">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none"><g><path d="M9.00828 1H7.00356C6.73847 1 6.52308 1.21539 6.52308 1.48047C6.52308 1.74555 6.73847 1.96094 7.00356 1.96094H9.00828C9.27336 1.96094 9.48875 1.74555 9.48875 1.48047C9.48875 1.21539 9.27336 1 9.00828 1ZM14.3597 4.1645L13.0509 2.85564C12.8686 2.67339 12.5704 2.67339 12.3716 2.85564C12.1894 3.03789 12.1894 3.33611 12.3716 3.53492L13.6639 4.82722C13.7633 4.92664 13.8793 4.95978 13.9953 4.95978C14.1112 4.95978 14.2438 4.91009 14.3266 4.82722C14.542 4.64497 14.542 4.34675 14.3597 4.1645ZM7.99764 3.00472C4.68403 3.00472 2 5.68875 2 9.00236C2 12.316 4.68403 15 7.99764 15C11.3112 15 13.9952 12.316 13.9952 9.00236C13.9952 5.68875 11.3112 3.00472 7.99764 3.00472ZM10.4828 9.6485H7.99764C7.73256 9.6485 7.51717 9.43311 7.51717 9.16802V6.05325C7.51717 5.78817 7.73256 5.57278 7.99764 5.57278C8.26272 5.57278 8.47811 5.78817 8.47811 6.05325V8.70414H10.4828C10.7479 8.70414 10.9633 8.91953 10.9633 9.18461C10.9633 9.43314 10.7479 9.6485 10.4828 9.6485Z" fill="white"/></g></svg>
        <p class="personal-plan__timer-text">This offer ends in {{ timeLeft }}</p>
      </div>
      <div class="personal-plan__items-wrapper">
        <div
          v-for="plan in plans"
          :key="plan.id"
          :class="['plan-item plan-item--blue', selected === plan.id && 'plan-item-selected']"
          @click="selected = plan.id"
        >
          <div v-if="plan.popular" class="most-popular blue">
            <p class="most-popular__text paragraph-12-700 text-center">MOST POPULAR</p>
          </div>
          <!-- radio icon -->
          <svg v-if="selected !== plan.id" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" width="20" height="20"><g fill="none"><path d="M19 10C19 14.9706 14.9706 19 10 19C5.02944 19 1 14.9706 1 10C1 5.02944 5.02944 1 10 1C14.9706 1 19 5.02944 19 10Z" stroke="#111113" stroke-opacity="0.15" stroke-width="2"/></g></svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" class="plan-item__check-icon" viewBox="0 0 20 20" width="20" height="20"><g fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20ZM14.9931 6.64656C14.5549 6.244 14.4713 6.18268 14.2938 6.13344C14.0283 6.05978 13.844 6.07248 13.6188 6.18002C13.5673 6.20463 12.4932 7.18726 11.2319 8.36366L8.93857 10.5025L8.17913 9.79939C7.72339 9.3774 7.35231 9.06345 7.25114 9.01424C7.02385 8.90372 6.65992 8.90033 6.44581 9.00675C6.21126 9.1234 5.3236 9.98536 5.26382 10.1546C5.19119 10.3601 5.2049 10.6294 5.29701 10.8071C5.35192 10.913 5.84186 11.3934 6.90354 12.3824C8.36252 13.7415 8.44017 13.8078 8.6345 13.861C8.88759 13.9303 8.94775 13.9303 9.20144 13.8615C9.39922 13.8078 9.49024 13.7266 12.4491 10.9655C14.6424 8.91884 15.5157 8.08176 15.5734 7.97093C15.6797 7.76676 15.6783 7.46541 15.5701 7.25669C15.5214 7.16279 15.2988 6.9273 14.9931 6.64656Z" fill="#5773D6"/></g></svg>
          <div class="text-wrapper">
            <p class="plan-name paragraph-16-600">{{ plan.name }}</p>
            <p class="paragraph-10-300 plan-price">
              <span class="plan-price__crossed">{{ plan.crossedPrice }}</span>
              <span>{{ plan.price }}</span>
            </p>
          </div>
          <div class="price-perday">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 112 56" width="56" height="28"><g fill="none"><path d="M14.5604 2.5193C15.4506 0.96143 17.1073 0 18.9016 0H107C109.761 0 112 2.23858 112 5V51C112 53.7614 109.761 56 107 56H18.9016C17.1073 56 15.4506 55.0386 14.5604 53.4807L1.41754 30.4807C0.53916 28.9435 0.539161 27.0565 1.41754 25.5193L14.5604 2.5193Z" fill="#5773D6"/></g></svg>
            <span class="price-perday__discount paragraph-12-600">{{ plan.discountPerDay }}</span>
            <span class="price-perday__full-price paragraph-12-600">{{ plan.fullPerDay }}</span>
            <span class="price-perday__perday paragraph-12-600">per day</span>
          </div>
        </div>
      </div>
      <div class="personal-plan__guarantee">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 19" width="20" height="19"><g fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M11.2032 1.69499C10.8137 1.31 10.1869 1.31 9.79736 1.69499L8.4388 3.03765C8.25306 3.22121 8.00289 3.32483 7.74176 3.32637L5.83171 3.33762C5.28403 3.34084 4.84084 3.78403 4.83762 4.33171L4.82637 6.24176C4.82483 6.50289 4.72121 6.75306 4.53765 6.9388L3.19499 8.29736C2.81 8.68691 2.81 9.31367 3.19499 9.70322L4.53765 11.0618C4.72121 11.2475 4.82483 11.4977 4.82637 11.7588L4.83762 13.6689C4.84084 14.2165 5.28403 14.6597 5.83171 14.663L7.74176 14.6742C8.00289 14.6757 8.25306 14.7794 8.4388 14.9629L9.79736 16.3056C10.1869 16.6906 10.8137 16.6906 11.2032 16.3056L12.5618 14.9629C12.7475 14.7794 12.9977 14.6757 13.2588 14.6742L15.1689 14.663C15.7165 14.6597 16.1597 14.2165 16.163 13.6689L16.1742 11.7588C16.1757 11.4977 16.2794 11.2475 16.4629 11.0618L17.8056 9.70322C18.1906 9.31367 18.1906 8.68691 17.8056 8.29736L16.4629 6.9388C16.2794 6.75306 16.1757 6.50289 16.1742 6.24176L16.163 4.33171C16.1597 3.78403 15.7165 3.34084 15.1689 3.33762L13.2588 3.32637C12.9977 3.32483 12.7475 3.22121 12.5618 3.03765L11.2032 1.69499ZM12.7661 6.56124C12.8682 6.5927 12.9162 6.63187 13.1682 6.88906C13.344 7.06843 13.472 7.21888 13.5 7.27887C13.5622 7.41222 13.563 7.60475 13.5019 7.73519C13.4687 7.806 12.9665 8.3408 11.7054 9.64839C10.0041 11.4124 9.95171 11.4643 9.83799 11.4986C9.69212 11.5426 9.65753 11.5426 9.512 11.4983C9.40026 11.4643 9.35561 11.4219 8.5167 10.5536C7.90623 9.92177 7.62452 9.61485 7.59294 9.54717C7.53998 9.43368 7.5321 9.26158 7.57386 9.13029C7.60824 9.02219 8.11864 8.47149 8.25351 8.39697C8.37662 8.32897 8.58588 8.33114 8.71657 8.40175C8.77474 8.43319 8.98812 8.63377 9.25016 8.90337L9.68684 9.3526L11.0055 7.9861C11.7308 7.23451 12.3484 6.60672 12.378 6.591C12.5075 6.52229 12.6134 6.51417 12.7661 6.56124Z" fill="#5773D6"/></g></svg>
        <p class="personal-plan__guarantee-text paragraph-14-600 text-center">30-day money-back guarantee</p>
      </div>
      <button class="base-button base-button--blue base-button--rounded-half shadow base-button__bold personal-plan__button" style="width:100%">
        <div class="base-button__content">Get My Plan</div>
      </button>
      <p class="personal-plan__disclaimer small_text text-center">
        We've automatically applied the discount to your 1-month Kegel Plan. After 1 month, your subscription will be automatically renewed at the full price of 31 USD per 1 month and will then be continuously renewed every 1 month until you cancel. If you want to manage your subscription, you may do so visiting Billing Center or in the Doctor Kegel app.
      </p>
    </div>

    <!-- Trusted image & reviews -->
    <div class="page-wrapper landing-page-template">
      <img
        src="https://quiz.kegel-plan.com/_vercel/image?url=%2Fimages%2Fen%2FEN_img_rating_trusted.webp&w=1536&q=100"
        alt="trusted"
        class="trusted-image"
        loading="lazy"
      />

      <!-- Reviews -->
      <div class="reviews-wrapper landing-reviews">
        <h2 class="title-24-800 text-center">Hear Success Stories From Our Customers</h2>
        <div class="reviews">
          <div v-for="r in reviews" :key="r.name" class="review light">
            <div class="review__top-block">
              <div class="review__rating">
                <svg v-for="n in r.rating" :key="n" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><g fill="none"><rect width="16" height="16" fill="#1DB87F"/><path d="M7.99779 2.17969L9.30404 6.19995H13.5311L10.1113 8.68461L11.4176 12.7049L7.99779 10.2202L4.578 12.7049L5.88424 8.68461L2.46445 6.19995H6.69155L7.99779 2.17969Z" fill="white"/></g></svg>
              </div>
              <span class="review-name paragraph-12-500">{{ r.name }}</span>
            </div>
            <h3 class="review__title paragraph_14-700">{{ r.title }}</h3>
            <p class="review__text paragraph-12-500">{{ r.text }}</p>
          </div>
        </div>
        <button type="button" class="base-button base-button--text base-button--rounded-half base-button__bold reviews__button blue" style="width:100%">
          <div class="base-button__content"><span class="reviews__button-text">Show more</span></div>
        </button>
      </div>

      <!-- Video Review -->
      <div class="video-review">
        <div class="video-review__wrapper">
          <video playsinline poster="https://quiz.kegel-plan.com/video/posters/video_reviews.gif" preload="auto">
            <source src="https://quiz.kegel-plan.com/video/video_reviews_landing.mp4" type="video/mp4" />
          </video>
          <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 109 109" fill="none" style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);"><g fill="none"><circle cx="54.5" cy="54.5" r="52.5" stroke="#FFE2E2" stroke-width="4"/><path d="M38 37.3391C38 32.7321 42.9769 29.8439 46.9768 32.1296L77.8834 49.7905C81.9143 52.0939 81.9143 57.9061 77.8834 60.2095L46.9768 77.8704C42.9769 80.1561 38 77.2679 38 72.6609V37.3391Z" fill="white"/></g></svg>
        </div>
        <div class="video-review__sound-wrapper">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M11.8146 5.0181C11.7552 5.0353 10.7817 5.78054 9.65119 6.67419L7.59571 8.29898L7.53902 11.7109C7.50786 13.5875 7.4845 15.1244 7.4871 15.1262C7.48973 15.1281 8.43403 15.8737 9.5856 16.7834C10.8684 17.7967 11.7307 18.4546 11.812 18.4823C12.0362 18.5587 12.3018 18.4536 12.4107 18.2455C12.4607 18.1501 12.4659 17.5313 12.4662 11.7498C12.4665 5.54043 12.4646 5.35641 12.4009 5.24863C12.2885 5.05832 12.0285 4.95612 11.8146 5.0181ZM17.5991 6.19259C17.4124 6.27458 17.2703 6.48206 17.2703 6.67265C17.2703 6.71622 17.381 6.97303 17.5162 7.24331C18.5148 9.23932 18.8359 11.283 18.4791 13.3724C18.3006 14.4179 18.0208 15.2569 17.5133 16.2687C17.2988 16.6964 17.267 16.7831 17.2822 16.8985C17.33 17.2614 17.7354 17.4665 18.0491 17.2866C18.1643 17.2206 18.2209 17.1442 18.3856 16.832C20.0805 13.6215 20.0805 9.89371 18.3856 6.67446C18.207 6.33516 18.1724 6.29066 18.0331 6.22126C17.858 6.134 17.7489 6.12679 17.5991 6.19259ZM15.6434 7.68967C15.5002 7.78507 15.4013 7.96275 15.4012 8.12471C15.4012 8.19196 15.4746 8.39916 15.5754 8.61615C16.4929 10.5914 16.4923 12.9174 15.5738 14.8949C15.3855 15.3003 15.3655 15.4338 15.4653 15.6194C15.568 15.8105 15.7307 15.9012 15.9409 15.8846C16.1929 15.8646 16.3068 15.7702 16.4584 15.4557C16.8307 14.6832 17.084 13.8549 17.2242 12.9509C17.3112 12.3904 17.3105 11.1067 17.2229 10.5395C17.0521 9.4337 16.5151 7.91692 16.221 7.71002C16.0615 7.5978 15.7955 7.58843 15.6434 7.68967ZM3.51948 8.63548C2.95421 8.78129 2.54753 9.18852 2.39706 9.75942C2.32077 10.0489 2.32077 13.4587 2.39706 13.7481C2.51046 14.1783 2.79242 14.5417 3.16646 14.7396C3.5036 14.9181 3.67469 14.9335 5.32744 14.9342L6.8384 14.9347L6.8581 14.5499C6.87734 14.1742 6.95086 9.67056 6.94965 8.94048L6.94906 8.57278L5.34817 8.57477C3.95063 8.57648 3.71834 8.58421 3.51948 8.63548Z" fill="#5773D6"/></svg>
          <p class="video-review__sound-text paragraph-16-600">Make sure your sound is turned on</p>
        </div>
      </div>

    </div>

    <!-- Plan Section 2 -->
    <div class="personal-plan" style="--theme-color:#5773d6">
      <h2 class="h1_title text-center">See the result in 4 weeks</h2>
      <div class="personal-plan__timer">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none"><g><path d="M9.00828 1H7.00356C6.73847 1 6.52308 1.21539 6.52308 1.48047C6.52308 1.74555 6.73847 1.96094 7.00356 1.96094H9.00828C9.27336 1.96094 9.48875 1.74555 9.48875 1.48047C9.48875 1.21539 9.27336 1 9.00828 1ZM14.3597 4.1645L13.0509 2.85564C12.8686 2.67339 12.5704 2.67339 12.3716 2.85564C12.1894 3.03789 12.1894 3.33611 12.3716 3.53492L13.6639 4.82722C13.7633 4.92664 13.8793 4.95978 13.9953 4.95978C14.1112 4.95978 14.2438 4.91009 14.3266 4.82722C14.542 4.64497 14.542 4.34675 14.3597 4.1645ZM7.99764 3.00472C4.68403 3.00472 2 5.68875 2 9.00236C2 12.316 4.68403 15 7.99764 15C11.3112 15 13.9952 12.316 13.9952 9.00236C13.9952 5.68875 11.3112 3.00472 7.99764 3.00472ZM10.4828 9.6485H7.99764C7.73256 9.6485 7.51717 9.43311 7.51717 9.16802V6.05325C7.51717 5.78817 7.73256 5.57278 7.99764 5.57278C8.26272 5.57278 8.47811 5.78817 8.47811 6.05325V8.70414H10.4828C10.7479 8.70414 10.9633 8.91953 10.9633 9.18461C10.9633 9.43314 10.7479 9.6485 10.4828 9.6485Z" fill="white"/></g></svg>
        <p class="personal-plan__timer-text">This offer ends in {{ timeLeft }}</p>
      </div>
      <div class="personal-plan__items-wrapper">
        <div v-for="plan in plans" :key="plan.id" :class="['plan-item plan-item--blue', selected === plan.id && 'plan-item-selected']" @click="selected = plan.id">
          <div v-if="plan.popular" class="most-popular blue"><p class="most-popular__text paragraph-12-700 text-center">MOST POPULAR</p></div>
          <svg v-if="selected !== plan.id" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" width="20" height="20"><g fill="none"><path d="M19 10C19 14.9706 14.9706 19 10 19C5.02944 19 1 14.9706 1 10C1 5.02944 5.02944 1 10 1C14.9706 1 19 5.02944 19 10Z" stroke="#111113" stroke-opacity="0.15" stroke-width="2"/></g></svg>
          <svg v-else class="plan-item__check-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" width="20" height="20"><g fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20ZM14.9931 6.64656C14.5549 6.244 14.4713 6.18268 14.2938 6.13344C14.0283 6.05978 13.844 6.07248 13.6188 6.18002C13.5673 6.20463 12.4932 7.18726 11.2319 8.36366L8.93857 10.5025L8.17913 9.79939C7.72339 9.3774 7.35231 9.06345 7.25114 9.01424C7.02385 8.90372 6.65992 8.90033 6.44581 9.00675C6.21126 9.1234 5.3236 9.98536 5.26382 10.1546C5.19119 10.3601 5.2049 10.6294 5.29701 10.8071C5.35192 10.913 5.84186 11.3934 6.90354 12.3824C8.36252 13.7415 8.44017 13.8078 8.6345 13.861C8.88759 13.9303 8.94775 13.9303 9.20144 13.8615C9.39922 13.8078 9.49024 13.7266 12.4491 10.9655C14.6424 8.91884 15.5157 8.08176 15.5734 7.97093C15.6797 7.76676 15.6783 7.46541 15.5701 7.25669C15.5214 7.16279 15.2988 6.9273 14.9931 6.64656Z" fill="#5773D6"/></g></svg>
          <div class="text-wrapper"><p class="plan-name paragraph-16-600">{{ plan.name }}</p><p class="paragraph-10-300 plan-price"><span class="plan-price__crossed">{{ plan.crossedPrice }}</span><span>{{ plan.price }}</span></p></div>
          <div class="price-perday">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 112 56" width="56" height="28"><g fill="none"><path d="M14.5604 2.5193C15.4506 0.96143 17.1073 0 18.9016 0H107C109.761 0 112 2.23858 112 5V51C112 53.7614 109.761 56 107 56H18.9016C17.1073 56 15.4506 55.0386 14.5604 53.4807L1.41754 30.4807C0.53916 28.9435 0.539161 27.0565 1.41754 25.5193L14.5604 2.5193Z" fill="#5773D6"/></g></svg>
            <span class="price-perday__discount paragraph-12-600">{{ plan.discountPerDay }}</span>
            <span class="price-perday__full-price paragraph-12-600">{{ plan.fullPerDay }}</span>
            <span class="price-perday__perday paragraph-12-600">per day</span>
          </div>
        </div>
      </div>
      <div class="personal-plan__guarantee">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 19" width="20" height="19"><g fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M11.2032 1.69499C10.8137 1.31 10.1869 1.31 9.79736 1.69499L8.4388 3.03765C8.25306 3.22121 8.00289 3.32483 7.74176 3.32637L5.83171 3.33762C5.28403 3.34084 4.84084 3.78403 4.83762 4.33171L4.82637 6.24176C4.82483 6.50289 4.72121 6.75306 4.53765 6.9388L3.19499 8.29736C2.81 8.68691 2.81 9.31367 3.19499 9.70322L4.53765 11.0618C4.72121 11.2475 4.82483 11.4977 4.82637 11.7588L4.83762 13.6689C4.84084 14.2165 5.28403 14.6597 5.83171 14.663L7.74176 14.6742C8.00289 14.6757 8.25306 14.7794 8.4388 14.9629L9.79736 16.3056C10.1869 16.6906 10.8137 16.6906 11.2032 16.3056L12.5618 14.9629C12.7475 14.7794 12.9977 14.6757 13.2588 14.6742L15.1689 14.663C15.7165 14.6597 16.1597 14.2165 16.163 13.6689L16.1742 11.7588C16.1757 11.4977 16.2794 11.2475 16.4629 11.0618L17.8056 9.70322C18.1906 9.31367 18.1906 8.68691 17.8056 8.29736L16.4629 6.9388C16.2794 6.75306 16.1757 6.50289 16.1742 6.24176L16.163 4.33171C16.1597 3.78403 15.7165 3.34084 15.1689 3.33762L13.2588 3.32637C12.9977 3.32483 12.7475 3.22121 12.5618 3.03765L11.2032 1.69499ZM12.7661 6.56124C12.8682 6.5927 12.9162 6.63187 13.1682 6.88906C13.344 7.06843 13.472 7.21888 13.5 7.27887C13.5622 7.41222 13.563 7.60475 13.5019 7.73519C13.4687 7.806 12.9665 8.3408 11.7054 9.64839C10.0041 11.4124 9.95171 11.4643 9.83799 11.4986C9.69212 11.5426 9.65753 11.5426 9.512 11.4983C9.40026 11.4643 9.35561 11.4219 8.5167 10.5536C7.90623 9.92177 7.62452 9.61485 7.59294 9.54717C7.53998 9.43368 7.5321 9.26158 7.57386 9.13029C7.60824 9.02219 8.11864 8.47149 8.25351 8.39697C8.37662 8.32897 8.58588 8.33114 8.71657 8.40175C8.77474 8.43319 8.98812 8.63377 9.25016 8.90337L9.68684 9.3526L11.0055 7.9861C11.7308 7.23451 12.3484 6.60672 12.378 6.591C12.5075 6.52229 12.6134 6.51417 12.7661 6.56124Z" fill="#5773D6"/></g></svg>
        <p class="personal-plan__guarantee-text paragraph-14-600 text-center">30-day money-back guarantee</p>
      </div>
      <button class="base-button base-button--blue base-button--rounded-half shadow base-button__bold personal-plan__button" style="width:100%">
        <div class="base-button__content">Get My Plan</div>
      </button>
      <p class="personal-plan__disclaimer small_text text-center">
        We've automatically applied the discount to your 1-month Kegel Plan. After 1 month, your subscription will be automatically renewed at the full price of 31 USD per 1 month and will then be continuously renewed every 1 month until you cancel.
      </p>
    </div>

    <!-- Money back + footer -->
    <div class="page-wrapper">
      <div class="money-back">
        <img
          src="https://quiz.kegel-plan.com/_vercel/image?url=%2Fimages%2Fen%2FEN_img_moneyback.webp&w=1536&q=100"
          alt="money back"
          class="money-back__image"
          loading="lazy"
          style="min-height:113px;"
        />
        <div class="money-back__text-block">
          <h2 class="money-back__title title-26-600 text-center">30-Day Money-Back</h2>
          <p class="money-back__subtitle paragraph-16-500 text-center">Guarantee Without Questions</p>
          <span class="money-back__text paragraph_14-400">
            We're confident that our Kegel Plan will work for you and that you can achieve noticeable improvements in a few weeks! We're so confident that we're even ready to return your money without any questions if you don't see noticeable improvements. All you need is to send an email to <b>contact@kegel-plan.com</b> within 30 days and ask for a refund. But we're sure that the Kegel Plan will show it's efficacy and there will be no need for a refund. You can find more about the refund process in our <a href="/refund.html" target="_blank" class="guarantee-link">refund policy.</a>
          </span>
        </div>
      </div>
      <div class="safe-checkout">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><g fill="none"><path d="M18.1972 6.95937C18.1721 6.77887 18.0422 6.63039 17.8666 6.58158L12.2397 5.01675C12.1595 4.99442 12.0748 4.99442 11.9945 5.01675L6.36763 6.58158C6.19206 6.63039 6.06219 6.7788 6.03705 6.95937C6.00442 7.19405 5.25988 12.7389 7.16957 15.4974C9.07699 18.2525 11.8909 18.9585 12.0097 18.9873C12.045 18.9958 12.081 19 12.1171 19C12.1532 19 12.1892 18.9957 12.2245 18.9873C12.3434 18.9585 15.1573 18.2525 17.0647 15.4974C18.9744 12.739 18.2298 7.19411 18.1972 6.95937Z" fill="#5773D6"/></g></svg>
        <p class="paragraph-16-600">Guaranteed Safe Checkout</p>
      </div>
      <div class="card-images">
        <img src="https://quiz.kegel-plan.com/_vercel/image?url=%2Fimages%2Fvisa_mc_pp_ae.webp&w=1536&q=100" alt="cards" loading="lazy" />
      </div>
    </div>

    <!-- Footer -->
    <div class="footer-wrapper">
      <div class="footer">
        <div class="footer__disclaimer paragraph-12-300">
          Disclaimer: Each individual's results may vary from person to person based on health condition, body type, starting point, his or her unique background, dedication, desire, motivation, actions, and numerous other factors. This service offers health and fitness information and is designed for educational and entertainment purposes only. You should not rely on this information as a substitute for, nor does it replace, professional medical advice, diagnosis, or treatment. It is intended to be provided for informational, educational, and self-empowerment purposes only. If you have any concerns or questions about your health, you should always consult with a physician or other health-care professional.
        </div>
        <div class="footer__location">
          <p>Appercut sp. z o.o.<br />Warsaw, Twarda 18, 00-105</p>
        </div>
        <div class="footer__links">
          <a href="/privacy-policy.html" target="_blank" class="footer__link">Privacy Policy</a>
          <a href="/terms.html" target="_blank" class="footer__link">Terms &amp; Conditions</a>
          <a href="/refund.html" target="_blank" class="footer__link">Refund Policy</a>
        </div>
      </div>
    </div>
  </div>
</template>
