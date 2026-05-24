export const useQuiz = () => {
  const age = useState<string | null>('quiz-age', () => null)
  const goal = useState<string>('quiz-goal', () => 'Sexual Wellness')
  const answers = useState<Record<string, string | number>>('quiz-answers', () => ({}))
  const healthConsent = useState<boolean>('quiz-consent', () => false)

  const setAge = (val: string) => { age.value = val }
  const setGoal = (val: string) => { goal.value = val }

  const setAnswer = (key: string, val: string | number) => {
    answers.value = { ...answers.value, [key]: val }
  }

  const getAnswer = (key: string) => answers.value[key]

  return { age, goal, answers, healthConsent, setAge, setGoal, setAnswer, getAnswer }
}
