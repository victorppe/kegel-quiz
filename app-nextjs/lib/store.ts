'use client'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface QuizState {
  age: string | null
  goal: string
  answers: Record<string, string | number>
  healthConsent: boolean
  setAge: (age: string) => void
  setGoal: (goal: string) => void
  setAnswer: (questionId: string, answer: string | number) => void
  getAnswer: (questionId: string) => string | number | undefined
  setHealthConsent: (consent: boolean) => void
  reset: () => void
}

export const useQuizStore = create<QuizState>()(
  persist(
    (set, get) => ({
      age: null,
      goal: 'Sexual Wellness',
      answers: {},
      healthConsent: false,
      setAge: (age) => set({ age }),
      setGoal: (goal) => set({ goal }),
      setAnswer: (questionId, answer) =>
        set((state) => ({
          answers: { ...state.answers, [questionId]: answer },
        })),
      getAnswer: (questionId) => get().answers[questionId],
      setHealthConsent: (consent) => set({ healthConsent: consent }),
      reset: () => set({ age: null, goal: 'Sexual Wellness', answers: {}, healthConsent: false }),
    }),
    {
      name: 'kegel-quiz-storage',
    }
  )
)
