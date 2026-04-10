let certChecked = false;
let selTrack = 'Full Circle L2B Cohort';

(function(){
  function initReveal(){
    if(!('IntersectionObserver' in window)) return;
    const ro = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if(entry.isIntersecting) entry.target.classList.add('visible');
      });
    }, {threshold: .1});

    document.querySelectorAll('.reveal').forEach(el => ro.observe(el));
  }

  function initApplyDefaults(){
    const rvTrack = document.getElementById('rv-track');
    if(rvTrack) rvTrack.textContent = selTrack;
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', () => {
      initReveal();
      initApplyDefaults();
    });
  }else{
    initReveal();
    initApplyDefaults();
  }
})();

function gotoStep(n){
  const steps = ['as1','as2','as3'];
  steps.forEach(id => {
    const el = document.getElementById(id);
    if(el) el.classList.remove('active');
  });

  const headers = {
    1: ['APPLICATION','Step 1 of 3'],
    2: ['APPLICATION','Step 2 of 3'],
    3: ['PATC APPLICATION','Final Review']
  };
  const sub = document.getElementById('apply-header-sub');
  const title = document.getElementById('apply-header-title');
  if(headers[n] && sub && title){
    sub.textContent = headers[n][0];
    title.textContent = headers[n][1];
  }

  const stepEl = document.getElementById('as' + n);
  if(stepEl) stepEl.classList.add('active');
  window.scrollTo({top:0,behavior:'smooth'});
}

function pickTrack(el,name){
  document.querySelectorAll('.track-opt').forEach(t => {
    t.classList.remove('sel');
  });
  el.classList.add('sel');
  selTrack = name;
  const rvTrack = document.getElementById('rv-track');
  if(rvTrack) rvTrack.textContent = selTrack;
}

function toggleCert(){
  certChecked = !certChecked;
  const cbox = document.getElementById('cbox');
  if(cbox) cbox.classList.toggle('chk', certChecked);
}

function getApplyPayload(){
  const name = (document.getElementById('f1-name')?.value || '').trim();
  const email = (document.getElementById('f1-email')?.value || '').trim();
  const phone = (document.getElementById('f1-phone')?.value || '').trim();
  const statement = (document.getElementById('f2-stmt')?.value || '').trim();

  return {
    submittedAt: new Date().toISOString(),
    program: 'Preneur AgroTech (PATC)',
    cohort: 'Autumn Intake 2024',
    track: selTrack,
    focusArea: 'Agri-Scale Operations',
    fullName: name,
    emailAddress: email,
    phoneWhatsapp: phone,
    whyThisTrack: statement,
    sourcePage: window.location.href
  };
}

function validateApplyPayload(payload){
  if(!payload.fullName || !payload.emailAddress || !payload.phoneWhatsapp || !payload.whyThisTrack){
    return 'Please complete all application fields before submitting.';
  }
  return '';
}

async function submitApply(){
  if(!certChecked){
    alert('Please agree to the enrollment terms before submitting.');
    return;
  }

  const payload = getApplyPayload();
  const validationError = validateApplyPayload(payload);
  if(validationError){
    alert(validationError);
    return;
  }

  const submitBtn = document.getElementById('apply-submit-btn');
  const oldBtnText = submitBtn ? submitBtn.textContent : '';
  if(submitBtn){
    submitBtn.textContent = 'Submitting...';
    submitBtn.style.pointerEvents = 'none';
    submitBtn.style.opacity = '0.75';
  }

  const webhook = (document.body?.dataset?.sheetWebhook || '').trim();
  if(!webhook){
    alert('Google Sheet webhook is missing. Set data-sheet-webhook on the <body> tag in pages/apply.html.');
    if(submitBtn){
      submitBtn.textContent = oldBtnText;
      submitBtn.style.pointerEvents = '';
      submitBtn.style.opacity = '';
    }
    return;
  }

  try{
    // Use text/plain to avoid CORS preflight with Google Apps Script web apps.
    await fetch(webhook, {
      method: 'POST',
      mode: 'no-cors',
      headers: {'Content-Type': 'text/plain;charset=utf-8'},
      body: JSON.stringify(payload)
    });
  }catch(err){
    alert('Could not submit your application right now. Please try again.');
    if(submitBtn){
      submitBtn.textContent = oldBtnText;
      submitBtn.style.pointerEvents = '';
      submitBtn.style.opacity = '';
    }
    return;
  }

  const form = document.getElementById('apply-form');
  const success = document.getElementById('apply-success');
  if(form) form.classList.add('hidden');
  if(success) success.classList.add('active');
  window.scrollTo({top:0,behavior:'smooth'});
}
