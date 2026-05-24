<script setup lang="ts">
import { useQuiz } from '~/composables/useQuiz'
const { setAge } = useQuiz()
const router = useRouter()

const ages = [
  { group: '25-35', score: 87.1 },
  { group: '35-45', score: 87.8 },
  { group: '45-55', score: 96.7 },
  { group: '55+', score: 93.0 },
]
const selected = ref<string | null>(null)

function select(age: string) {
  if (selected.value) return
  selected.value = age
  setAge(age)
  setTimeout(() => router.push('/quiz/q0'), 350)
}
</script>

<template>
  <div id="ao-age" style="min-height:100dvh;display:flex;flex-direction:column;align-items:center;width:100%;background:#fff;">
    <header class="ao-hdr">
      <DoctorKegelLogo />
    </header>

    <div class="ao-cnt">
      <h2 class="ao-title">
        Get Your <span>Sexual Wellness</span> Plan
      </h2>
    </div>

    <div class="ao-img-cnt">
      <img class="ao-couple-img" src="https://quiz.kegel-plan.com/images/happy_couple.webp" alt="happy couple" loading="eager" />
      <img class="ao-benefits-img" src="https://quiz.kegel-plan.com/images/en/EN_benefits.webp" alt="benefits" loading="lazy" />
    </div>

    <div class="ao-cnt">
      <div class="ao-age-section">
        <p class="ao-age-title">How old are you?</p>
        <div class="ao-age-btns">
          <button
            v-for="a in ages"
            :key="a.group"
            :class="['ao-age-btn', selected === a.group && 'selected']"
            type="button"
            :data-age-group="a.group"
            :data-compatibility-score="a.score"
            @click="select(a.group)"
          >
            <div class="ao-btn-inner">
              <p :class="['ao-btn-text', selected === a.group && 'selected']">{{ a.group }}</p>
              <div :class="['ao-btn-check', selected === a.group && 'checked']" aria-hidden="true">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M9 18C13.9706 18 18 13.9706 18 9C18 4.02944 13.9706 0 9 0C4.02944 0 0 4.02944 0 9C0 13.9706 4.02944 18 9 18Z" fill="white"/>
                  <path d="M8 5.5L11.5 9L8 12.5" stroke="black" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
            </div>
          </button>
        </div>
      </div>

      <h2 class="ao-src-hdr">Sources:</h2>
      <img class="ao-src-img" src="https://quiz.kegel-plan.com/images/sources/img_source_logos_bw.webp" alt="sources" loading="lazy" />

      <ul class="ao-src-list">
        <li class="ao-src-item"><span class="ao-marker">1.</span><div><p class="ao-src-paper">G. Dorey, M. Speakman, R. Feneley, A. Swinkels, C. Dunn, and P. Ewings, (2004). <i>"Randomised controlled trial of pelvic floor muscle exercises and manometric biofeedback for erectile dysfunction"</i></p><p class="ao-src-journal">British Journal of General Practice <span>2004 Nov;54(508):819–25 PMID:15527607</span></p></div></li>
        <li class="ao-src-item"><span class="ao-marker">2.</span><div><p class="ao-src-paper">H. A. Feldman, I. Goldstein, D. G. Hatzichristou, R. J. Krane, and J. B. McKinlay, (1994). <i>"Impotence and its medical and psychosocial correlates: results of the Massachusetts Male Aging Study"</i></p><p class="ao-src-journal">The Journal of Urology <span>1994 Jan;151(1):54–61 PMID:8254833</span></p></div></li>
        <li class="ao-src-item"><span class="ao-marker">3.</span><div><p class="ao-src-paper">M. Crowdis, S. W. Leslie, and S. Nazir, (2023). <i>"Premature Ejaculation"</i></p><p class="ao-src-journal">StatPearls Publishing <span>2023 May 30. PMID: 31536307</span></p></div></li>
        <li class="ao-src-item"><span class="ao-marker">4.</span><div><p class="ao-src-paper">J. Gao, X. Zhang, P. Su, K. Shi, D. Tang, Z. Hao, J. Zhou, and C. Liang, (2014). <i>"Prevalence and impact of premature ejaculation in outpatients complaining of ejaculating prematurely using the instruments of intravaginal ejaculatory latency time and patient-reported outcome measures"</i></p><p class="ao-src-journal">International Journal of Impotence Research <span>2014 May–Jun;26(3):94–99 PMID:24384563</span></p></div></li>
        <li class="ao-src-item"><span class="ao-marker">5.</span><div><p class="ao-src-paper">A. L. Pastore, G. Palleschi, A. Fuschi, C. Maggioni, R. Rago, A. Zucchi, E. Costantini, and A. Carbone, (2014). <i>"Pelvic floor muscle rehabilitation for patients with lifelong premature ejaculation: a novel therapeutic approach"</i></p><p class="ao-src-journal">Therapeutic Advances in Urology <span>2014 Jun;6(3):83–88 PMID:24883105</span></p></div></li>
        <li class="ao-src-item"><span class="ao-marker">6.</span><div><p class="ao-src-paper">A. L. Siegel, (2014). <i>"Pelvic floor muscle training in males: practical applications"</i></p><p class="ao-src-journal">The Journal of Urology <span>2014 Jul;84(1):1–7 PMID:24821468.</span></p></div></li>
        <li class="ao-src-item"><span class="ao-marker">7.</span><div><p class="ao-src-paper">H. A. Feldman, I. Goldstein, D. G. Hatzichristou, R. J. Krane, and J. B. McKinlay, (1994). <i>"Impotence and its medical and psychosocial correlates: results of the Massachusetts Male Aging Study"</i></p><p class="ao-src-journal">The Journal of Urology <span>1994 Jan;151(1):54–61 PMID:8254833.</span></p></div></li>
        <li class="ao-src-item"><span class="ao-marker">8.</span><div><p class="ao-src-paper">A. L. Pastore, G. Palleschi, A. Leto, L. Pacini, F. Iori, C. Leonardo, and A. Carbone, (2012). <i>"A prospective randomized study to compare pelvic floor rehabilitation and dapoxetine for treatment of lifelong premature ejaculation"</i></p><p class="ao-src-journal">International Journal of Andrology <span>2012 Aug;35(4):528–533 PMID:22320846</span></p></div></li>
        <li class="ao-src-item"><span class="ao-marker">9.</span><div><p class="ao-src-paper">D. Cohen, J. Gonzalez, and I. Goldstein, (2016). <i>"The Role of Pelvic Floor Muscles in Male Sexual Dysfunction and Pelvic Pain"</i></p><p class="ao-src-journal">Sexual Medicine Reviews <span>2016 Jan;4(1):53–62 PMID:27872005</span></p></div></li>
        <li class="ao-src-item"><span class="ao-marker">10.</span><div><p class="ao-src-paper">P. Capogrosso, M. Colicchia, E. Ventimiglia, G. Castagna, M. C. Clementi, N. Suardi, F. Castiglione, A. Briganti, F. Cantiello, R. Damiano, F. Montorsi, and A. Salonia, (2013). <i>"One patient out of four with newly diagnosed erectile dysfunction is a young man—worrisome picture from the everyday clinical practice"</i></p><p class="ao-src-journal">The Journal of Sexual Medicine <span>2013 Jul;10(7):1833–1841 PMID:23651423</span></p></div></li>
        <li class="ao-src-item"><span class="ao-marker">11.</span><div><p class="ao-src-paper">A. L. Pastore, G. Palleschi, A. Fuschi, Y. Al Salhi, A. Zucchi, G. Bozzini, E. Illiano, E. Costantini, and A. Carbone, (2018). <i>"Pelvic muscle floor rehabilitation as a therapeutic option in lifelong premature ejaculation: long-term outcomes"</i></p><p class="ao-src-journal">Asian Journal of Andrology <span>2018 Nov–Dec;20(6):572–575 PMID:29974885</span></p></div></li>
      </ul>

      <div class="ao-footer">
        <p class="ao-footer-info">
          By choosing your age and continuing you agree to our
          <a href="/terms.html" target="_blank" rel="noreferrer">Terms &amp; Conditions</a>
          |
          <a href="/privacy-policy.html" target="_blank" rel="noreferrer">Privacy Policy</a>
          . Please review before continuing.
        </p>
        <span>Appercut sp z o o<br />Warsaw, Twarda 18, 00-105</span>
      </div>
    </div>
  </div>
</template>
