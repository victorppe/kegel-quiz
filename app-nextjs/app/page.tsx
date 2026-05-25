'use client'

import { useRouter } from 'next/navigation'
import { useQuizStore } from '@/lib/store'

const ageOptions = ['25-35', '35-45', '45-55', '55+']

const sources = [
  { marker: '[1]', paper: 'Dorey G, Speakman M, Feneley R, Swinkels A, Dunn C, Ewings P.', journal: 'Pelvic floor exercises for treating post-micturition dribble in men with erectile dysfunction: a randomized controlled trial.', source: 'Urol Nurs. 2004 Dec;24(6):490-7. PMID: 15658738.' },
  { marker: '[2]', paper: 'Lavoisier P, Roy P, Dantony E, Watrelot A, Ruggeri J, Dumoulin S.', journal: 'Pelvic-floor muscle rehabilitation in erectile dysfunction and premature ejaculation.', source: 'Phys Ther. 2014 Dec;94(12):1731-43.' },
  { marker: '[3]', paper: 'Cohen D, Gonzalez J, Goldstein I.', journal: 'The Role of Pelvic Floor Muscles in Male Sexual Dysfunction and Pelvic Pain.', source: 'Sex Med Rev. 2016 Jan;4(1):53-62.' },
]

export default function HomePage() {
  const router = useRouter()
  const { setAge } = useQuizStore()

  const handleAgeSelect = (age: string) => {
    setAge(age)
    router.push('/quiz/q0')
  }

  return (
    <div className="landing-wrapper">
      <header className="ao-hdr">
        <img src="https://quiz.kegel-plan.com/images/en/EN_logo_white_bg.webp" alt="Doctor Kegel" />
      </header>

      <main className="ao-cnt">
        <h1 className="ao-title">
          Get Your <span>Sexual Wellness</span> Plan
        </h1>

        <div className="ao-img-cnt">
          <img
            src="https://quiz.kegel-plan.com/_vercel/image?url=%2Fimages%2Fen%2FEN_img_couple.webp&w=1536&q=100"
            alt="Happy couple"
            className="ao-couple-img"
          />
          <img
            src="https://quiz.kegel-plan.com/_vercel/image?url=%2Fimages%2Fen%2FEN_img_3_benefits.webp&w=1536&q=100"
            alt="Benefits"
            className="ao-benefits-img"
          />
        </div>

        <section className="ao-age-section">
          <h2 className="ao-age-title">Select your age to start</h2>
          <div className="ao-age-btns">
            {ageOptions.map((age) => (
              <button
                key={age}
                type="button"
                className="ao-age-btn"
                onClick={() => handleAgeSelect(age)}
              >
                <div className="ao-btn-inner">
                  <span className="ao-btn-text">{age}</span>
                  <span className="ao-btn-check">
                    <svg width="8" height="14" viewBox="0 0 8 14" fill="none">
                      <path d="M1 1L7 7L1 13" stroke="#111113" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </div>
              </button>
            ))}
          </div>
        </section>

        <div className="ao-src-hdr">Sources</div>
        <img
          src="https://quiz.kegel-plan.com/_vercel/image?url=%2Fimages%2Fen%2FEN_img_sources_logos.webp&w=1536&q=100"
          alt="Source logos"
          className="ao-src-img"
        />
        <ul className="ao-src-list">
          {sources.map((src) => (
            <li key={src.marker} className="ao-src-item">
              <span className="ao-marker">{src.marker}</span>
              <div>
                <p className="ao-src-paper"><i>{src.paper}</i></p>
                <p className="ao-src-journal">
                  {src.journal}
                  <span>{src.source}</span>
                </p>
              </div>
            </li>
          ))}
        </ul>

        <footer className="ao-footer">
          <p className="ao-footer-info">
            By continuing, you agree to our{' '}
            <a href="/terms">Terms of Service</a> and{' '}
            <a href="/privacy">Privacy Policy</a>
          </p>
          <span>This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.</span>
        </footer>
      </main>
    </div>
  )
}
