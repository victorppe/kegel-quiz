"use client"

import { useState } from "react"

// ==================== TYPES ====================
interface AgeOption {
  group: string
  score: number
}

interface SourceItem {
  marker: string
  paper: string
  journal: string
  citation: string
}

// ==================== SVG ICONS ====================
const CheckmarkSvg = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
    <g fill="none">
      <circle cx="9" cy="9" r="9" fill="currentColor" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9 18C13.9706 18 18 13.9706 18 9C18 4.02944 13.9706 0 9 0C4.02944 0 0 4.02944 0 9C0 13.9706 4.02944 18 9 18ZM13.4938 5.9819C13.0994 5.6196 13.0242 5.56442 12.8644 5.5201C12.6255 5.4538 12.4596 5.46523 12.2569 5.56202C12.2106 5.58416 11.2439 6.46853 10.1087 7.52729L8.04471 9.45228L7.36122 8.81945C6.95105 8.43966 6.61708 8.1571 6.52602 8.11282C6.32146 8.01335 5.99393 8.0103 5.80123 8.10608C5.59013 8.21106 4.79124 8.98682 4.73744 9.13911C4.67207 9.32406 4.68441 9.56649 4.76731 9.72637C4.81673 9.82171 5.25767 10.2541 6.21318 11.1442C7.52627 12.3673 7.59615 12.427 7.77105 12.4749C7.99883 12.5373 8.05297 12.5373 8.2813 12.4753C8.4593 12.427 8.54121 12.3539 11.2042 9.86895C13.1782 8.02696 13.9642 7.27359 14.0161 7.17384C14.1117 6.99009 14.1104 6.71887 14.0131 6.53102C13.9693 6.44651 13.7689 6.23457 13.4938 5.9819Z"
        fill="currentColor"
      />
    </g>
  </svg>
)

const ArrowRightSvg = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9 18C13.9706 18 18 13.9706 18 9C18 4.02944 13.9706 0 9 0C4.02944 0 0 4.02944 0 9C0 13.9706 4.02944 18 9 18Z"
      fill="white"
    />
    <path d="M8 5.5L11.5 9L8 12.5" stroke="black" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const StarSvg = ({ filled = true }: { filled?: boolean }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="13" viewBox="0 0 14 13" fill="none">
    <path
      d="M6.68143 0.700154C6.80582 0.426757 7.19418 0.426757 7.31857 0.700154L8.87638 4.12386C8.92732 4.23583 9.03331 4.31283 9.15554 4.32669L12.8931 4.75026C13.1915 4.78408 13.3115 5.15343 13.09 5.35622L10.3152 7.89576C10.2245 7.97882 10.184 8.10341 10.2086 8.22394L10.9607 11.9094C11.0207 12.2037 10.7066 12.432 10.4452 12.2839L7.17253 10.4297C7.0655 10.3691 6.9345 10.3691 6.82747 10.4297L3.55477 12.2839C3.29344 12.432 2.97925 12.2037 3.03931 11.9094L3.79143 8.22394C3.81603 8.10341 3.77554 7.97882 3.6848 7.89576L0.910046 5.35622C0.688471 5.15343 0.808478 4.78408 1.10693 4.75026L4.84446 4.32669C4.96669 4.31283 5.07268 4.23583 5.12362 4.12386L6.68143 0.700154Z"
      fill={filled ? "#FE9B1A" : "#ccc"}
    />
  </svg>
)

// ==================== PROGRESS BAR ====================
interface ProgressBarProps {
  progress: number
  activeCheckmarks: number
  dark?: boolean
}

function ProgressBar({ progress, activeCheckmarks, dark = false }: ProgressBarProps) {
  return (
    <div className={`progress-bar ${!dark ? "progress-bar_white" : ""}`}>
      <div className="progress-bar__line">
        <div className="progress-bar__fill-line" style={{ width: `${progress}%` }} />
      </div>
      {[1, 2, 3, 4].map((i) => (
        <span
          key={i}
          className={`progress-bar__icon ${i === 1 || i - 1 < activeCheckmarks ? "progress-bar__icon_active" : ""} ${i === 1 ? "progress-bar__icon_hidden" : ""}`}
        >
          <CheckmarkSvg />
        </span>
      ))}
    </div>
  )
}

// ==================== QUIZ HEADER ====================
function QuizHeader({ dark = false }: { dark?: boolean }) {
  return (
    <header className="quiz-header">
      <img
        src={dark ? "https://quiz.kegel-plan.com/images/en/EN_logo_dark_bg.webp" : "https://quiz.kegel-plan.com/images/en/EN_logo_white_bg.webp"}
        alt="Doctor Kegel"
        className="w-[120px] sm:w-[150px]"
        style={{ minHeight: "28px" }}
      />
    </header>
  )
}

// ==================== QUESTION SINGLE SELECT ====================
interface QuestionSingleSelectProps {
  question: string
  options: string[]
  optionSubtexts?: string[]
  value: string | null
  onChange: (val: string) => void
}

function QuestionSingleSelect({ question, options, optionSubtexts, value, onChange }: QuestionSingleSelectProps) {
  return (
    <div className="quiz-question">
      <h2 className="h2_title sensitive_content">{question}</h2>
      <div className="quiz-question__options sensitive_content">
        {options.map((opt, i) => (
          <div
            key={i}
            className={`quiz-question__option-item ${value === opt ? "quiz-question__option-item-selected" : ""}`}
            onClick={() => onChange(opt)}
          >
            <p className="paragraph-14-500 question-text">
              {opt}
              {optionSubtexts?.[i] && <span className="question-description">{optionSubtexts[i]}</span>}
            </p>
            {value === opt && (
              <span className="question-select-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 18 18">
                  <g fill="none">
                    <circle cx="9" cy="9" r="9" fill="white" />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M9 18C13.9706 18 18 13.9706 18 9C18 4.02944 13.9706 0 9 0C4.02944 0 0 4.02944 0 9C0 13.9706 4.02944 18 9 18ZM13.4938 5.9819C13.0994 5.6196 13.0242 5.56442 12.8644 5.5201C12.6255 5.4538 12.4596 5.46523 12.2569 5.56202C12.2106 5.58416 11.2439 6.46853 10.1087 7.52729L8.04471 9.45228L7.36122 8.81945C6.95105 8.43966 6.61708 8.1571 6.52602 8.11282C6.32146 8.01335 5.99393 8.0103 5.80123 8.10608C5.59013 8.21106 4.79124 8.98682 4.73744 9.13911C4.67207 9.32406 4.68441 9.56649 4.76731 9.72637C4.81673 9.82171 5.25767 10.2541 6.21318 11.1442C7.52627 12.3673 7.59615 12.427 7.77105 12.4749C7.99883 12.5373 8.05297 12.5373 8.2813 12.4753C8.4593 12.427 8.54121 12.3539 11.2042 9.86895C13.1782 8.02696 13.9642 7.27359 14.0161 7.17384C14.1117 6.99009 14.1104 6.71887 14.0131 6.53102C13.9693 6.44651 13.7689 6.23457 13.4938 5.9819Z"
                      fill="#111113"
                    />
                  </g>
                </svg>
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

// ==================== QUESTION RATING ====================
interface QuestionRatingProps {
  question: string
  rateLabels: [string, string]
  value: number | null
  onChange: (val: number) => void
}

function QuestionRating({ question, rateLabels, value, onChange }: QuestionRatingProps) {
  return (
    <div className="quiz-question">
      <h2 className="h2_title">{question}</h2>
      <p className="quiz-question__rate-from paragraph-16-600 text-center">Rate from 1 to 5</p>
      <div className="quiz-question__options">
        <div className="quiz-question__options-wrapper">
          {[1, 2, 3, 4, 5].map((n) => (
            <div
              key={n}
              className={`option-item paragraph-16-600 ${value === n ? "option-item--selected" : ""}`}
              onClick={() => onChange(n)}
            >
              {n}
            </div>
          ))}
        </div>
        <p className="paragraph_14-400 quiz-question__rate-text">
          <span>{rateLabels[0]}</span>
          <span className="quiz-question__rate-text--right">{rateLabels[1]}</span>
        </p>
      </div>
    </div>
  )
}

// ==================== NAV CONTROLS ====================
interface NavControlsProps {
  canNext: boolean
  dark?: boolean
  nextLabel?: string
  onNext: () => void
  onPrev: () => void
}

function NavControls({ canNext, dark = false, nextLabel = "Next", onNext, onPrev }: NavControlsProps) {
  return (
    <div className={`controls-wrapper ${!dark ? "controls-wrapper--light-bg" : ""}`}>
      <button
        type="button"
        className="base-button base-button--grey base-button--rounded-half"
        style={{ flex: "0 0 56px", padding: "16px" }}
        onClick={onPrev}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>
      <button
        type="button"
        className={`base-button base-button--rounded-half base-button__bold ${canNext ? "base-button--black" : "base-button__disabled"}`}
        style={{ flex: 1 }}
        onClick={canNext ? onNext : undefined}
        disabled={!canNext}
      >
        <span className="base-button__content">
          <span>{nextLabel}</span>
          <span className="controls-wrapper__arrow-wrapper">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </span>
        </span>
      </button>
    </div>
  )
}

// ==================== REVIEW CARD ====================
interface ReviewProps {
  title: string
  text: string
  author: string
  variant: "dark" | "light"
}

function Review({ title, text, author, variant }: ReviewProps) {
  return (
    <div className={`review ${variant}`}>
      <div className="review__top-block">
        <div className="review__rating">
          {[1, 2, 3, 4, 5].map((n) => (
            <StarSvg key={n} />
          ))}
        </div>
        <span className="review-name paragraph-12-500">{author}</span>
      </div>
      <h3 className="review__title paragraph_14-700">{title}</h3>
      <p className="review__text paragraph-12-500">{text}</p>
    </div>
  )
}

// ==================== PROCESSING BAR ====================
interface ProcessingBarProps {
  label: string
  percent: number
}

function ProcessingBar({ label, percent }: ProcessingBarProps) {
  return (
    <div className="processing-bar">
      <div className="processing-bar__label">
        <span>{label}</span>
        <span>{percent}%</span>
      </div>
      <div className="processing-bar__track">
        <div className="processing-bar__fill" style={{ width: `${percent}%` }} />
      </div>
    </div>
  )
}

// ==================== AGE BUTTON ====================
interface AgeButtonProps {
  age: AgeOption
  selected: boolean
  onClick: () => void
}

function AgeButton({ age, selected, onClick }: AgeButtonProps) {
  return (
    <button
      type="button"
      className={`ao-age-btn ${selected ? "selected" : ""}`}
      onClick={onClick}
    >
      <div className="ao-btn-inner">
        <p className={`ao-btn-text ${selected ? "selected" : ""}`}>{age.group}</p>
        <div className={`ao-btn-check ${selected ? "checked" : ""}`} aria-hidden="true">
          <ArrowRightSvg />
        </div>
      </div>
    </button>
  )
}

// ==================== SOURCES DATA ====================
const sources: SourceItem[] = [
  { marker: "1.", paper: 'G. Dorey, M. Speakman, R. Feneley, A. Swinkels, C. Dunn, and P. Ewings, (2004). "Randomised controlled trial of pelvic floor muscle exercises and manometric biofeedback for erectile dysfunction"', journal: "British Journal of General Practice", citation: "2004 Nov;54(508):819-25 PMID:15527607" },
  { marker: "2.", paper: 'H. A. Feldman, I. Goldstein, D. G. Hatzichristou, R. J. Krane, and J. B. McKinlay, (1994). "Impotence and its medical and psychosocial correlates: results of the Massachusetts Male Aging Study"', journal: "The Journal of Urology", citation: "1994 Jan;151(1):54-61 PMID:8254833" },
  { marker: "3.", paper: 'M. Crowdis, S. W. Leslie, and S. Nazir, (2023). "Premature Ejaculation"', journal: "StatPearls Publishing", citation: "2023 May 30. PMID: 31536307" },
  { marker: "4.", paper: 'J. Gao, X. Zhang, P. Su, K. Shi, D. Tang, Z. Hao, J. Zhou, and C. Liang, (2014). "Prevalence and impact of premature ejaculation in outpatients complaining of ejaculating prematurely using the instruments of intravaginal ejaculatory latency time and patient-reported outcome measures"', journal: "International Journal of Impotence Research", citation: "2014 May-Jun;26(3):94-99 PMID:24384563" },
  { marker: "5.", paper: 'A. L. Pastore, G. Palleschi, A. Fuschi, C. Maggioni, R. Rago, A. Zucchi, E. Costantini, and A. Carbone, (2014). "Pelvic floor muscle rehabilitation for patients with lifelong premature ejaculation: a novel therapeutic approach"', journal: "Therapeutic Advances in Urology", citation: "2014 Jun;6(3):83-88 PMID:24883105" },
]

// ==================== MAIN PAGE COMPONENT ====================
export default function KegelQuizPage() {
  const [currentView, setCurrentView] = useState<"home" | "quiz" | "results">("home")
  const [selectedAge, setSelectedAge] = useState<string | null>(null)
  const [quizStep, setQuizStep] = useState(0)
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null)
  const [ratingValue, setRatingValue] = useState<number | null>(null)

  const ages: AgeOption[] = [
    { group: "25-35", score: 87.1 },
    { group: "35-45", score: 87.8 },
    { group: "45-55", score: 96.7 },
    { group: "55+", score: 93.0 },
  ]

  const goals = [
    "Improve Erectile Function",
    "Improve Ejaculation Control",
    "Maximize Sexual Wellness",
  ]

  const handleAgeSelect = (age: string) => {
    if (selectedAge) return
    setSelectedAge(age)
    setTimeout(() => {
      setCurrentView("quiz")
      setQuizStep(0)
    }, 350)
  }

  const handleGoalSelect = (goal: string) => {
    setSelectedGoal(goal)
  }

  const handleNext = () => {
    if (quizStep === 0 && selectedGoal) {
      setQuizStep(1)
      setRatingValue(null)
    } else if (quizStep === 1 && ratingValue) {
      setCurrentView("results")
    }
  }

  const handlePrev = () => {
    if (quizStep === 0) {
      setCurrentView("home")
      setSelectedAge(null)
    } else if (quizStep === 1) {
      setQuizStep(0)
    }
  }

  // ==================== HOME VIEW ====================
  if (currentView === "home") {
    return (
      <div id="ao-age" className="min-h-screen flex flex-col items-center w-full bg-white">
        <header className="ao-hdr">
          <img src="https://quiz.kegel-plan.com/images/en/EN_logo_white_bg.webp" alt="Doctor Kegel logo" />
        </header>

        <div className="ao-cnt">
          <h2 className="ao-title">
            Get Your <span>Sexual Wellness</span> Plan
          </h2>
        </div>

        <div className="ao-img-cnt">
          <img className="ao-couple-img" src="https://quiz.kegel-plan.com/images/happy_couple.webp" alt="happy couple" loading="eager" />
          <img className="ao-benefits-img" src="https://quiz.kegel-plan.com/images/en/EN_benefits.webp" alt="benefits" loading="lazy" />
        </div>

        <div className="ao-cnt">
          <div className="ao-age-section">
            <p className="ao-age-title">How old are you?</p>
            <div className="ao-age-btns">
              {ages.map((a) => (
                <AgeButton key={a.group} age={a} selected={selectedAge === a.group} onClick={() => handleAgeSelect(a.group)} />
              ))}
            </div>
          </div>

          <h2 className="ao-src-hdr">Sources:</h2>
          <img className="ao-src-img" src="https://quiz.kegel-plan.com/images/sources/img_source_logos_bw.webp" alt="sources" loading="lazy" />

          <ul className="ao-src-list">
            {sources.map((src, i) => (
              <li key={i} className="ao-src-item">
                <span className="ao-marker">{src.marker}</span>
                <div>
                  <p className="ao-src-paper"><i>{src.paper}</i></p>
                  <p className="ao-src-journal">{src.journal} <span>{src.citation}</span></p>
                </div>
              </li>
            ))}
          </ul>

          <div className="ao-footer">
            <p className="ao-footer-info">
              By choosing your age and continuing you agree to our{" "}
              <a href="/terms.html" target="_blank" rel="noreferrer">Terms &amp; Conditions</a>
              {" | "}
              <a href="/privacy-policy.html" target="_blank" rel="noreferrer">Privacy Policy</a>
              . Please review before continuing.
            </p>
            <span>Appercut sp z o o<br />Warsaw, Twarda 18, 00-105</span>
          </div>
        </div>
      </div>
    )
  }

  // ==================== QUIZ VIEW ====================
  if (currentView === "quiz") {
    return (
      <div className="quiz-white-wrapper">
        <QuizHeader />
        <ProgressBar progress={quizStep === 0 ? 10 : 25} activeCheckmarks={quizStep === 0 ? 1 : 2} />

        {quizStep === 0 && (
          <div className="page-wrapper quiz-question">
            <QuestionSingleSelect
              question="Choose your main goal"
              options={goals}
              value={selectedGoal}
              onChange={handleGoalSelect}
            />
            <NavControls canNext={!!selectedGoal} onNext={handleNext} onPrev={handlePrev} />
          </div>
        )}

        {quizStep === 1 && (
          <div className="page-wrapper quiz-question">
            <QuestionRating
              question="How much do you worry about having problem with erection?"
              rateLabels={["I don't worry", "I'm very worried"]}
              value={ratingValue}
              onChange={setRatingValue}
            />
            <NavControls canNext={!!ratingValue} onNext={handleNext} onPrev={handlePrev} />
          </div>
        )}
      </div>
    )
  }

  // ==================== RESULTS VIEW ====================
  return (
    <div className="quiz-dark-wrapper">
      <QuizHeader dark />
      <ProgressBar progress={100} activeCheckmarks={4} dark />

      <div className="page-wrapper" style={{ paddingBottom: "150px" }}>
        <div className="goal-page">
          <h2 className="goal-page__title">Based on your personal goals you can</h2>
          <p className="goal-page__subtitle">
            Improve <strong>Sexual Wellness</strong>
          </p>
          <p className="goal-page__by">by {new Date(Date.now() + 28 * 24 * 60 * 60 * 1000).toLocaleDateString("en-US", { month: "long", day: "numeric" })}</p>

          <div className="goal-page__video">
            <video autoPlay loop playsInline poster="https://quiz.kegel-plan.com/video/en/EN_video_graph_pp1_zaglushka.webp" preload="auto">
              <source src="https://quiz.kegel-plan.com/video/en/EN_video_graph_pp1.mp4" type="video/mp4" />
            </video>
            <p>*for illustration purposes only</p>
          </div>

          <div className="reviews-wrapper goal-page__reviews">
            <h2 className="title-24-800 text-center text-white mb-4">Customer reviews</h2>
            <div className="flex flex-col gap-3">
              <Review variant="light" title="Awesome!" text="2 weeks and I can already feel improvements" author="Brown" />
              <Review variant="light" title="Guys, you must try it" text="I followed this kegel plan and now my performance is at its peak! Guys, this is a real game-changer - don't sleep on it" author="Amteleronnnnn" />
              <Review variant="light" title="Fantastic" text="The results are amazing" author="Brodau56" />
            </div>
          </div>

          <button
            type="button"
            className="base-button base-button--red base-button--rounded-half shadow base-button__bold goal-page__cta"
            style={{ width: "100%", marginTop: "24px" }}
          >
            <span className="base-button__content">
              <span>Get My Plan</span>
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}
