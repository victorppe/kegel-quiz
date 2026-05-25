'use client'

interface NavControlsProps {
  prevId?: string
  nextId?: string
  canNext: boolean
  dark?: boolean
  nextLabel?: string
  onNext: () => void
  onPrev: () => void
}

export function NavControls({
  prevId,
  canNext,
  dark = false,
  nextLabel = 'Next',
  onNext,
  onPrev,
}: NavControlsProps) {
  return (
    <div className={`nav-controls ${dark ? 'nav-controls--dark' : ''}`}>
      {prevId && (
        <button type="button" className="nav-controls__prev" onClick={onPrev}>
          <svg width="8" height="14" viewBox="0 0 8 14" fill="none">
            <path d="M7 1L1 7L7 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      )}
      <button
        type="button"
        className={`nav-controls__next ${!canNext ? 'disabled' : ''}`}
        onClick={onNext}
        disabled={!canNext}
      >
        {nextLabel}
      </button>
    </div>
  )
}
