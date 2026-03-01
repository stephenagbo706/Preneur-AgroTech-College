/* TODO: Replace story content below with your own insights */
const stories = [
  {
    tag: 'Founder Note',
    title: 'Why PATC, why now',
    by: 'Peter Ajuwon, PhD. & Agbenu Esther Ochoga, PhD.',
    body: `
      <p>She had the certificates in a nylon folder, neat and proud, the way you keep proof of effort when results have not arrived yet. Two years of trainings. Three different "graduations." A stack of handouts she could almost recite.</p>
      <p>Still, every month ended the same way, with her doing the math in her head and realizing the math did not care how hard she tried. That day, she said it quietly, like a confession more than a complaint:</p>
      <div class="story-quote">"I have learned plenty. I just can't turn it into money that lasts."</div>
      <p>We have heard versions of that sentence in too many places to count. Sometimes it comes from a young graduate who can talk brilliance but has never tested a product in a real market. Sometimes it comes from a farmer who grows well but loses profit to poor processing, weak storage, or middlemen who control the buyer.</p>
      <p>And that is the part that keeps breaking our hearts—because it is not a problem of laziness or lack of intelligence. It is usually a problem of disconnection. That is why we built PATC. Not as another training program that leaves people inspired for a week and stranded for a year. PATC is a practical model—a full circle learning to business ecosystem designed to close the loop.</p>
      <p>If you have been looking for a place where your hard work finally has a pathway, welcome. You are not behind. You are not incapable. You have simply been carrying effort without enough structure around it. PATC is here to change that.</p>
    `
  },
  {
    tag: 'Program Insight',
    title: 'What our learners will actually leave with',
    by: 'Agbenu Esther Ochoga, PhD. & Peter Ajuwon, PhD.',
    body: `
      <p>Let us tell you what we have learned about "training." Most people do not fail because they did not attend a class. They fail because they attended a class, then went home alone.</p>
      <p>They return to the same environment, the same uncertainties, the same lack of tools, the same market confusion, and the same discouragement. And after a while, even the best notes start to feel like paper that cannot pay bills.</p>
      <div class="story-quote">Enterprise is not built through dramatic moments. It is built through repeatable actions.</div>
      <p>Along the way, learners practice the quiet routines that separate hobby from enterprise: recordkeeping, quality habits, simple operations discipline, and customer tracking. Because enterprise is not built through dramatic moments. It is built through repeatable actions. Small steps done consistently create momentum. And momentum, when guided, becomes growth.</p>
      <p>If you are ready for a program that respects your time and produces outcomes you can build on, we would be glad to have you.</p>
    `
  },
  {
    tag: 'Vision',
    title: "Africa's full-circle learning-to-business ecosystem",
    by: 'Preneur AgroTech College (PATC)',
    body: `
      <p>We have seen it too many times. A person learns a skill, and the story ends there. Another person farms, but processing is weak. Another person produces, but packaging and branding are missing.</p>
      <div class="story-quote">This is not just a nice diagram for a website. It is a sequence of capability building.</div>
      <p>We are building a model where the pieces connect, so learners do not just gain knowledge—they gain a pathway. As PATC grows, this becomes more than a program. It becomes an ecosystem: pilot cohorts and stackable certificates, an Enterprise Lab for demonstration production and value addition, partnerships with universities, farms, and industry, and market linkages that connect learners to real buyers.</p>
      <p>Our goal is simple: build a pathway where learning becomes productive work, and productive work becomes sustainable businesses. If you are a learner, join a cohort. If you are a partner, help strengthen the ecosystem.</p>
    `
  }
];

let activeStory = 0;

function joinPath(root, path){
  const cleanRoot = root.replace(/\/$/, '');
  if(cleanRoot === '.' || cleanRoot === '') return './' + path;
  return cleanRoot + '/' + path;
}

function applyDataLinks(scope){
  const root = document.body.dataset.root || '.';
  scope.querySelectorAll('[data-link]').forEach(el => {
    const href = el.getAttribute('data-link');
    if(href) el.setAttribute('href', joinPath(root, href));
  });
}

function renderInsights(idx){
  activeStory = idx;
  const s = stories[idx];
  if(!s) return;
  const others = stories.map((o,i)=>({...o,i})).filter((_,i)=>i!==idx);
  const container = document.getElementById('insights-content');
  if(!container) return;

  container.innerHTML = `
    <div>
      <div class="story-tag">${s.tag}</div>
      <h2 class="story-h">${s.title}</h2>
      <div class="story-by">${s.by}</div>
      <div class="story-txt">${s.body}</div>
      <div style="margin-top:2rem;display:flex;gap:.8rem;flex-wrap:wrap">
        <a class="btn btn-red" data-link="pages/apply.html">Join the Next Cohort</a>
        <a class="btn btn-outline-red" data-link="pages/partnerships.html">Partner With PATC</a>
      </div>
    </div>
    <div class="story-sidebar">
      <div class="sec-label">More from Insights</div>
      ${others.map(o=>`
        <div class="ss-card" onclick="showInsight(${o.i})">
          <div class="ss-tag">${o.tag}</div>
          <h4>${o.title}</h4>
        </div>`).join('')}
    </div>
  `;
  applyDataLinks(container);
}

function showInsight(idx){
  renderInsights(idx);
  const params = new URLSearchParams(window.location.search);
  params.set('story', String(idx));
  const newUrl = window.location.pathname + '?' + params.toString();
  window.history.replaceState({}, '', newUrl);
}

(function(){
  function init(){
    const container = document.getElementById('insights-content');
    if(!container) return;
    const params = new URLSearchParams(window.location.search);
    const idx = parseInt(params.get('story') || '0', 10);
    const safeIdx = Number.isFinite(idx) && idx >= 0 && idx < stories.length ? idx : 0;
    renderInsights(safeIdx);
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init);
  }else{
    init();
  }
})();
