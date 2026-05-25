'use client'

import { useParams, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { getStep, QUIZ_STEPS } from '@/lib/quizSteps'
import { useQuizStore } from '@/lib/store'
import { ProgressBar } from '@/components/ProgressBar'
import { QuestionSingleSelect } from '@/components/QuestionSingleSelect'
import { QuestionRating } from '@/components/QuestionRating'
import { NavControls } from '@/components/NavControls'
import { CreatingPlan } from '@/components/CreatingPlan'

const goalMap: Record<string, string> = {
  'Improve Erectile Function': 'Erectile Function',
  'Improve Ejaculation Control': 'Ejaculation Control',
  'Maximize Sexual Wellness': 'Sexual Wellness',
}

export default function QuizStepPage() {
  const params = useParams()
  const router = useRouter()
  const stepId = params.step as string
  const step = getStep(stepId)

  const { setAnswer, getAnswer, setGoal } = useQuizStore()
  const [currentAnswer, setCurrentAnswer] = useState<string | number | null>(null)

  useEffect(() => {
    if (!step) {
      router.replace('/')
      return
    }
    if (step.questionId) {
      const saved = getAnswer(String(step.questionId))
      setCurrentAnswer(saved ?? null)
    } else {
      setCurrentAnswer(null)
    }
  }, [stepId, step, getAnswer, router])

  if (!step) return null

  const canNext = () => {
    if (step.type === 'single-select' || step.type === 'rating') {
      return currentAnswer !== null
    }
    return true
  }

  const goNext = () => {
    if (step.questionId && currentAnswer !== null) {
      setAnswer(String(step.questionId), currentAnswer)
    }
    if (step.next === 'results') {
      router.push('/results')
    } else if (step.next) {
      router.push(`/quiz/${step.next}`)
    }
  }

  const goPrev = () => {
    if (step.prev === '/') {
      router.push('/')
    } else if (step.prev) {
      router.push(`/quiz/${step.prev}`)
    }
  }

  const selectOption = (val: string) => {
    setCurrentAnswer(val)
    if (step.id === 'q0') {
      setGoal(goalMap[val] ?? 'Sexual Wellness')
    }
  }

  const isDark = step.theme === 'dark'

  return (
    <div className={isDark ? 'quiz-dark-wrapper' : 'quiz-white-wrapper'}>
      <header className="quiz-header">
        <img 
          src="https://quiz.kegel-plan.com/images/en/EN_logo_white_bg.webp" 
          alt="Doctor Kegel" 
          className="quiz-header__logo"
        />
      </header>

      {step.type !== 'creating-plan' && (
        <ProgressBar
          progress={step.progress}
          activeCheckmarks={step.activeCheckmarks}
          dark={isDark}
        />
      )}

      <div className="page-wrapper quiz-question">
        {/* Single Select */}
        {step.type === 'single-select' && (
          <>
            <QuestionSingleSelect
              question={step.question!}
              options={step.options!}
              optionSubtexts={step.optionSubtexts}
              value={currentAnswer as string}
              onChange={selectOption}
            />
            <NavControls
              prevId={step.prev}
              nextId={step.next}
              canNext={canNext()}
              dark={isDark}
              onNext={goNext}
              onPrev={goPrev}
            />
          </>
        )}

        {/* Rating */}
        {step.type === 'rating' && (
          <>
            <QuestionRating
              question={step.question!}
              rateLabels={step.rateLabels!}
              value={currentAnswer as number}
              onChange={(val) => setCurrentAnswer(val)}
            />
            <NavControls
              prevId={step.prev}
              nextId={step.next}
              canNext={canNext()}
              dark={isDark}
              onNext={goNext}
              onPrev={goPrev}
            />
          </>
        )}

        {/* Info Video */}
        {step.type === 'info-video' && (
          <div className="info-video">
            <h2 className="info-video__title">
              <span className="underline">Quality of Erection</span> depends on the strength of the{' '}
              <span className="green">Pelvic Floor (PF) muscles</span>
            </h2>
            {step.videoSrc && (
              <video autoPlay loop playsInline preload="auto" className="info-video__video">
                <source src={step.videoSrc} type="video/mp4" />
              </video>
            )}
            {step.body && <p className="info-video__text">{step.body}</p>}
            <NavControls
              prevId={step.prev}
              nextId={step.next}
              canNext={true}
              dark={true}
              nextLabel={step.ctaText ?? 'I got it'}
              onNext={goNext}
              onPrev={goPrev}
            />
          </div>
        )}

        {/* Creating Plan */}
        {step.type === 'creating-plan' && (
          <CreatingPlan onComplete={goNext} />
        )}
      </div>
    </div>
  )
}
