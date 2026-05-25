'use client'

interface QuestionSingleSelectProps {
  question: string
  options: string[]
  optionSubtexts?: string[]
  value: string | null
  onChange: (value: string) => void
}

export function QuestionSingleSelect({
  question,
  options,
  optionSubtexts,
  value,
  onChange,
}: QuestionSingleSelectProps) {
  return (
    <div className="question-single-select">
      <h2 className="question-single-select__title">{question}</h2>
      <div className="question-single-select__options">
        {options.map((option, idx) => (
          <button
            key={option}
            type="button"
            className={`question-single-select__option ${value === option ? 'selected' : ''}`}
            onClick={() => onChange(option)}
          >
            <span className="option-text">{option}</span>
            {optionSubtexts?.[idx] && (
              <span className="option-subtext">{optionSubtexts[idx]}</span>
            )}
            <span className={`option-check ${value === option ? 'checked' : ''}`}>
              {value === option && (
                <svg width="14" height="11" viewBox="0 0 14 11" fill="none">
                  <path d="M1 5L5 9L13 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
