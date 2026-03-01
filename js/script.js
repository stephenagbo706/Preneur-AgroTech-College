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

function submitApply(){
  if(!certChecked){
    alert('Please agree to the enrollment terms before submitting.');
    return;
  }

  const form = document.getElementById('apply-form');
  const success = document.getElementById('apply-success');
  if(form) form.classList.add('hidden');
  if(success) success.classList.add('active');
  window.scrollTo({top:0,behavior:'smooth'});
}
