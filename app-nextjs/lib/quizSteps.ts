export type StepType =
  | 'single-select'
  | 'rating'
  | 'info-video'
  | 'info-image'
  | 'info-goal'
  | 'info-goal-2'
  | 'loading'
  | 'consent'
  | 'creating-plan'
  | 'trusted'
  | 'help-improve'
  | 'best-thing'
  | 'final-adjustment'

export interface QuizStep {
  id: string
  type: StepType
  theme: 'white' | 'dark'
  progress: number
  activeCheckmarks: number
  questionId?: number
  question?: string
  options?: string[]
  optionSubtexts?: string[]
  rateLabels?: [string, string]
  title?: string
  body?: string
  videoSrc?: string
  videoPoster?: string
  imageSrc?: string
  badgeType?: 'study' | 'survey'
  badgeText?: string
  sourceText?: string
  ctaText?: string
  prev?: string
  next?: string
}

export const QUIZ_STEPS: QuizStep[] = [
  {
    id: 'q0',
    type: 'single-select',
    theme: 'white',
    progress: 0,
    activeCheckmarks: 0,
    questionId: 0,
    question: 'Choose your main goal',
    options: ['Improve Erectile Function', 'Improve Ejaculation Control', 'Maximize Sexual Wellness'],
    optionSubtexts: ['', '', '(Improve both of the above)'],
    prev: '/',
    next: 'q201',
  },
  {
    id: 'q201',
    type: 'single-select',
    theme: 'white',
    progress: 3,
    activeCheckmarks: 0,
    questionId: 201,
    question: 'Which one best describes your problem?',
    options: ['Difficulty achieving erection', 'Difficulty maintaining erection', 'Both', "I don't want to answer"],
    prev: 'q0',
    next: 'q202',
  },
  {
    id: 'q202',
    type: 'single-select',
    theme: 'white',
    progress: 6,
    activeCheckmarks: 0,
    questionId: 202,
    question: 'How often do you experience problems with erection?',
    options: ['Never', 'Rarely', 'Often', 'All the time', "I don't want to answer"],
    prev: 'q201',
    next: 'q203',
  },
  {
    id: 'q203',
    type: 'single-select',
    theme: 'white',
    progress: 9,
    activeCheckmarks: 0,
    questionId: 203,
    question: 'How long have you been experiencing problems with erection?',
    options: ['Less than 1 year', 'From 1 to 5 years', 'From 5 to 10 years', 'More than 10 years', "I don't want to answer"],
    prev: 'q202',
    next: 'q204',
  },
  {
    id: 'q204',
    type: 'single-select',
    theme: 'white',
    progress: 12,
    activeCheckmarks: 0,
    questionId: 204,
    question: 'Can you have sex 2 times in a row?',
    options: ['Yes, but I must try hard', "No, I can't", "I don't want to answer"],
    prev: 'q203',
    next: 'ed-s1',
  },
  {
    id: 'ed-s1',
    type: 'info-video',
    theme: 'dark',
    progress: 16,
    activeCheckmarks: 1,
    title: 'Quality of Erection depends on the strength of the Pelvic Floor (PF) muscles',
    body: 'Stronger PF muscles help to fill & retain more blood in the male organ leading to harder and more lasting erection.',
    videoSrc: 'https://quiz.kegel-plan.com/video/video_ED_s1.mp4',
    ctaText: 'I got it',
    prev: 'q204',
    next: 'q205',
  },
  {
    id: 'q205',
    type: 'single-select',
    theme: 'white',
    progress: 19,
    activeCheckmarks: 1,
    questionId: 205,
    question: 'How often do you experience morning erections?',
    options: ['Never', 'Rarely', 'Often', 'All the time', "I don't want to answer"],
    prev: 'ed-s1',
    next: 'q206',
  },
  {
    id: 'q206',
    type: 'rating',
    theme: 'white',
    progress: 22,
    activeCheckmarks: 1,
    questionId: 206,
    question: 'How hard is your erection during masturbation?',
    rateLabels: ['Not hard', 'Very hard'],
    prev: 'q205',
    next: 'q207',
  },
  {
    id: 'q207',
    type: 'rating',
    theme: 'white',
    progress: 25,
    activeCheckmarks: 1,
    questionId: 207,
    question: 'How hard is your erection during sex?',
    rateLabels: ['Not hard', 'Very hard'],
    prev: 'q206',
    next: 'q208',
  },
  {
    id: 'q208',
    type: 'rating',
    theme: 'white',
    progress: 37,
    activeCheckmarks: 2,
    questionId: 208,
    question: 'How satisfied are you with your sex life in the last 3 months?',
    rateLabels: ['Not satisfied', 'Very satisfied'],
    prev: 'q207',
    next: 'q209',
  },
  {
    id: 'q209',
    type: 'rating',
    theme: 'white',
    progress: 40,
    activeCheckmarks: 2,
    questionId: 209,
    question: 'How much do you worry about having problem with erection?',
    rateLabels: ["I don't worry", "I'm very worried"],
    prev: 'q208',
    next: 'q212',
  },
  {
    id: 'q212',
    type: 'single-select',
    theme: 'white',
    progress: 58,
    activeCheckmarks: 2,
    questionId: 212,
    question: 'How long does your sex typically last?',
    options: ['Less than 2 minutes', '2-7 minutes', '7-15 minutes', '15 or more minutes'],
    prev: 'q209',
    next: 'q213',
  },
  {
    id: 'q213',
    type: 'single-select',
    theme: 'white',
    progress: 61,
    activeCheckmarks: 2,
    questionId: 213,
    question: "How often do you ejaculate earlier than you'd like?",
    options: ['Never', 'Rarely', 'Often', 'All the time', "I don't want to answer"],
    prev: 'q212',
    next: 'q214',
  },
  {
    id: 'q214',
    type: 'single-select',
    theme: 'white',
    progress: 63,
    activeCheckmarks: 2,
    questionId: 214,
    question: 'Do you want to improve ejaculation control?',
    options: ["Yes, I'd like to", "No, I don't want to"],
    prev: 'q213',
    next: 'q215',
  },
  {
    id: 'q215',
    type: 'rating',
    theme: 'white',
    progress: 65,
    activeCheckmarks: 2,
    questionId: 215,
    question: 'How would you rate your libido (sex drive) in the last 3 months?',
    rateLabels: ['Low', 'High'],
    prev: 'q214',
    next: 'q221',
  },
  {
    id: 'q221',
    type: 'single-select',
    theme: 'white',
    progress: 73,
    activeCheckmarks: 3,
    questionId: 221,
    question: 'How often do you drink alcohol?',
    options: ['Every day', 'Several times a week', 'Once a week', 'Once a month', "I don't drink at all"],
    prev: 'q215',
    next: 'q222',
  },
  {
    id: 'q222',
    type: 'single-select',
    theme: 'white',
    progress: 76,
    activeCheckmarks: 3,
    questionId: 222,
    question: 'Do you smoke?',
    options: ['Yes, I do', "No, I don't", 'Sometimes'],
    prev: 'q221',
    next: 'q223',
  },
  {
    id: 'q223',
    type: 'rating',
    theme: 'white',
    progress: 82,
    activeCheckmarks: 3,
    questionId: 223,
    question: 'How healthy is your diet?',
    rateLabels: ['Unhealthy', 'Healthy'],
    prev: 'q222',
    next: 'q225',
  },
  {
    id: 'q225',
    type: 'rating',
    theme: 'white',
    progress: 88,
    activeCheckmarks: 3,
    questionId: 225,
    question: "What's your level of physical activity?",
    rateLabels: ['Low', 'High'],
    prev: 'q223',
    next: 'q226',
  },
  {
    id: 'q226',
    type: 'rating',
    theme: 'white',
    progress: 92,
    activeCheckmarks: 3,
    questionId: 226,
    question: 'How would you rate your daily stress level?',
    rateLabels: ['Low', 'High'],
    prev: 'q225',
    next: 'creating-plan',
  },
  {
    id: 'creating-plan',
    type: 'creating-plan',
    theme: 'white',
    progress: 98,
    activeCheckmarks: 4,
    title: 'Analyzing your answers',
    prev: 'q226',
    next: 'results',
  },
]

export const getStep = (id: string) => QUIZ_STEPS.find(s => s.id === id)
