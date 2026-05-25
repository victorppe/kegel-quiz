'use client'

import { useState, useEffect } from 'react'
import { useQuizStore } from '@/lib/store'

const plans = [
  { id: '1w', name: '1-WEEK PLAN', crossedPrice: '10.59 USD', price: '6.99 USD', discountPerDay: '1.50 USD', fullPerDay: '0.99 USD' },
  { id: '1m', name: '1-MONTH PLAN', crossedPrice: '31.00 USD', price: '15.19 USD', discountPerDay: '1.00 USD', fullPerDay: '0.49 USD', popular: true },
  { id: '3m', name: '3-MONTH PLAN', crossedPrice: '53.04 USD', price: '25.99 USD', discountPerDay: '0.59 USD', fullPerDay: '0.29 USD' },
]

const improvements = [
  'Erectile function',
  'Ejaculation control',
  'Prostate health',
  'Confidence',
  'Relationship happiness',
]

const reviews = [
  { name: 'Pepsi Zero', rating: 5, title: 'To do it is to believe it truly works', text: "I was very skeptical at first. I started having problems about 1 yr ago. I've now doing the exercises for 72 days straight. WOW I wake up like I'm in my twenties. I definitely would recommend this plan to everyone." },
  { name: 'Yak', rating: 5, title: 'Excellent', text: 'Literally changed my life!' },
  { name: 'IVBES', rating: 5, title: 'Few weeks in', text: "I'm a few weeks in and I can already tell there's better blood flow and less temptation to ejaculate early." },
]

export default function ResultsPage() {
  const [selected, setSelected] = useState('1m')
  const [timeLeft, setTimeLeft] = useState('09:56')
  const { age } = useQuizStore()

  useEffect(() => {
    let totalSec = 9 * 60 + 56
    const t = setInterval(() => {
      totalSec--
      if (totalSec <= 0) { clearInterval(t); return }
      const m = Math.floor(totalSec / 60)
      const s = totalSec % 60
      setTimeLeft(`${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`)
    }, 1000)
    return () => clearInterval(t)
  }, [])

  const targetDate = new Date()
  targetDate.setDate(targetDate.getDate() + 28)
  const formattedDate = targetDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })

  return (
    <div className="landing-wrapper">
      {/* Timer Banner */}
      <div className="landing-timer">
        <div className="landing-timer__wrapper">
          <p>51% Discount reserved for</p>
          <span className="landing-timer__time">{timeLeft}</span>
        </div>
        <button className="landing-timer__button">Get My Plan</button>
      </div>

      {/* Header */}
      <header className="results-header">
        <img src="https://quiz.kegel-plan.com/images/en/EN_logo_white_bg.webp" alt="Doctor Kegel" />
      </header>

      <main className="results-content">
        <h1 className="results-title">Your Personal Plan is Ready!</h1>

        <img
          src="https://quiz.kegel-plan.com/_vercel/image?url=%2Fimages%2Fen%2FEN_img_beforeafter2.webp&w=1536&q=100"
          alt="Before and after"
          className="results-image"
        />

        {/* Areas of Improvements */}
        <section className="improvements-section">
          <h2>Areas of Improvements</h2>
          <ul className="improvements-list">
            {improvements.map((item) => (
              <li key={item} className="improvement-item">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <circle cx="10" cy="10" r="10" fill="#53CC58"/>
                  <path d="M6 10L9 13L14 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* When to Expect */}
        <section className="expect-section">
          <h2>When to Expect Improvements</h2>
          <p>Based on our data you can reach noticeable improvements</p>
          <div className="expect-date">
            <span>by {formattedDate}</span>
          </div>
          <img
            src="https://quiz.kegel-plan.com/_vercel/image?url=%2Fimages%2Fen%2FEN_video_graph_final.webp&w=1536&q=100"
            alt="Progress graph"
            className="expect-graph"
          />
        </section>

        {/* Plan Selection */}
        <section className="plan-section">
          <h2>Get your Personal Kegel Plan</h2>
          <div className="plan-timer">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 4V8L11 10" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
              <circle cx="8" cy="8" r="6" stroke="white" strokeWidth="1.5"/>
            </svg>
            <span>This offer ends in {timeLeft}</span>
          </div>
          
          <div className="plans-wrapper">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`plan-item ${selected === plan.id ? 'plan-item--selected' : ''}`}
                onClick={() => setSelected(plan.id)}
              >
                {plan.popular && <div className="plan-popular">MOST POPULAR</div>}
                <div className="plan-radio">
                  {selected === plan.id ? (
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <circle cx="10" cy="10" r="10" fill="#5773D6"/>
                      <path d="M6 10L9 13L14 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <circle cx="10" cy="10" r="9" stroke="#ccc" strokeWidth="2"/>
                    </svg>
                  )}
                </div>
                <div className="plan-info">
                  <span className="plan-name">{plan.name}</span>
                  <span className="plan-price">
                    <s>{plan.crossedPrice}</s> {plan.price}
                  </span>
                </div>
                <div className="plan-perday">
                  <span className="plan-perday__price">{plan.fullPerDay}</span>
                  <span className="plan-perday__label">per day</span>
                </div>
              </div>
            ))}
          </div>

          <div className="plan-guarantee">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 2L12 8H18L13 12L15 18L10 14L5 18L7 12L2 8H8L10 2Z" fill="#5773D6"/>
            </svg>
            <span>30-day money-back guarantee</span>
          </div>

          <button className="plan-cta">Get My Plan</button>

          <p className="plan-disclaimer">
            We have automatically applied the discount to your 1-month Kegel Plan. After 1 month, 
            your subscription will be automatically renewed at the full price of 31 USD per 1 month.
          </p>
        </section>

        {/* Reviews */}
        <section className="reviews-section">
          <h2>Hear Success Stories From Our Customers</h2>
          <div className="reviews-list">
            {reviews.map((review) => (
              <div key={review.name} className="review-card">
                <div className="review-header">
                  <div className="review-rating">
                    {[...Array(review.rating)].map((_, i) => (
                      <svg key={i} width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <rect width="16" height="16" fill="#1DB87F"/>
                        <path d="M8 2L9.3 6.2H13.5L10.1 8.7L11.4 12.7L8 10.2L4.6 12.7L5.9 8.7L2.5 6.2H6.7L8 2Z" fill="white"/>
                      </svg>
                    ))}
                  </div>
                  <span className="review-name">{review.name}</span>
                </div>
                <h3 className="review-title">{review.title}</h3>
                <p className="review-text">{review.text}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
