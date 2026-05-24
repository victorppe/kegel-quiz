export const useQuiz = () => {
  const age = useState<string | null>('quiz-age', () => null)
  const answers = useState<Record<string, string | number>>('quiz-answers', () => ({}))
  const healthConsent = useState<boolean>('quiz-consent', () => false)

  const setAge = (val: string) => { age.value = val }

  const setAnswer = (key: string, val: string | number) => {
    answers.value = { ...answers.value, [key]: val }
  }

  const getAnswer = (key: string) => answers.value[key]

  const goal = computed(() => {
    const g = answers.value['0'] as string | undefined
    if (!g) return 'Sexual Wellness'
    if (g.includes('Erectile Function')) return 'Erectile Function'
    if (g.includes('Ejaculation Control')) return 'Ejaculation Control'
    return 'Sexual Wellness'
  })

  return { age, answers, healthConsent, goal, setAge, setAnswer, getAnswer }
}
