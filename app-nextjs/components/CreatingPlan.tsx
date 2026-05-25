'use client'

import { useEffect, useState } from 'react'

interface CreatingPlanProps {
  onComplete: () => void
}

const loaderLabels = ['Intimate health indicators', 'Sexual behaviours', 'Lifestyle', 'Creating your plan']

const reviews = [
  { name: 'Pepsi Zero', rating: 5, title: 'To do it is to believe it truly works', text: "I was very skeptical at first but I noticed a difference in about 2 weeks." },
  { name: 'Yak', rating: 5, title: 'Excellent', text: 'Literally changed my life!' },
  { name: 'IVBES', rating: 5, title: 'Few weeks in', text: "I'm a few weeks in and I can already tell there's better blood flow." },
  { name: 'Brown', rating: 5, title: 'Awesome!', text: '2 weeks and I can already feel improvements' },
]

export function CreatingPlan({ onComplete }: CreatingPlanProps) {
  const [loaderPercents, setLoaderPercents] = useState([0, 0, 0, 0])
  const [planReady, setPlanReady] = useState(false)
  const [shownReviews, setShownReviews] = useState(1)

  useEffect(() => {
    let currentIdx = 0

    const animateLoader = (idx: number) => {
      if (idx >= 4) {
        setPlanReady(true)
        setTimeout(onComplete, 1500)
        return
      }

      let pct = 0
      const interval = setInterval(() => {
        pct += Math.random() * 4 + 2
        if (pct >= 100) {
          pct = 100
          setLoaderPercents(prev => {
            const newArr = [...prev]
            newArr[idx] = 100
            return newArr
          })
          clearInterval(interval)
          if (idx < 3) setShownReviews(idx + 2)
          setTimeout(() => animateLoader(idx + 1), 400)
        } else {
          setLoaderPercents(prev => {
            const newArr = [...prev]
            newArr[idx] = Math.round(pct)
            return newArr
          })
        }
      }, 80)
    }

    animateLoader(0)
  }, [onComplete])

  return (
    <div className="creating-plan">
      <h2 className="creating-plan__title">Analyzing your answers</h2>
      
      <div className="creating-plan__loaders">
        {loaderLabels.map((label, idx) => (
          <div key={label} className="creating-plan__loader">
            <div className="creating-plan__loader-header">
              <span className="creating-plan__loader-label">{label}</span>
              <span className="creating-plan__loader-percent">{loaderPercents[idx]}%</span>
            </div>
            <div className="creating-plan__loader-bar">
              <div 
                className="creating-plan__loader-fill" 
                style={{ width: `${loaderPercents[idx]}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="creating-plan__reviews">
        {reviews.slice(0, shownReviews).map((review, idx) => (
          <div key={review.name} className="review light" style={{ animationDelay: `${idx * 0.2}s` }}>
            <div className="review__top-block">
              <div className="review__rating">
                {[...Array(review.rating)].map((_, i) => (
                  <svg key={i} width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <rect width="16" height="16" fill="#1DB87F"/>
                    <path d="M7.99779 2.17969L9.30404 6.19995H13.5311L10.1113 8.68461L11.4176 12.7049L7.99779 10.2202L4.578 12.7049L5.88424 8.68461L2.46445 6.19995H6.69155L7.99779 2.17969Z" fill="white"/>
                  </svg>
                ))}
              </div>
              <span className="review-name">{review.name}</span>
            </div>
            <h3 className="review__title">{review.title}</h3>
            <p className="review__text">{review.text}</p>
          </div>
        ))}
      </div>

      {planReady && (
        <div className="creating-plan__ready">
          <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
            <circle cx="32" cy="32" r="32" fill="#53CC58"/>
            <path d="M20 32L28 40L44 24" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <p>Your plan is ready!</p>
        </div>
      )}
    </div>
  )
}
