'use client'

interface QuestionRatingProps {
  question: string
  rateLabels: [string, string]
  value: number | null
  onChange: (value: number) => void
}

export function QuestionRating({
  question,
  rateLabels,
  value,
  onChange,
}: QuestionRatingProps) {
  return (
    <div className="question-rating">
      <h2 className="question-rating__title">{question}</h2>
      <div className="question-rating__options">
        {[1, 2, 3, 4, 5].map((num) => (
          <button
            key={num}
            type="button"
            className={`question-rating__option ${value === num ? 'selected' : ''}`}
            onClick={() => onChange(num)}
          >
            {num}
          </button>
        ))}
      </div>
      <div className="question-rating__labels">
        <span>{rateLabels[0]}</span>
        <span>{rateLabels[1]}</span>
      </div>
    </div>
  )
}
