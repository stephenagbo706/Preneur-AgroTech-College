(function(){
  function initSearch(){
    const openBtn = document.getElementById('open-search');
    const panel = document.getElementById('search-panel');
    const closeBtn = document.getElementById('close-search');
    if(!openBtn || !panel) return;

    const open = () => panel.classList.add('active');
    const close = () => panel.classList.remove('active');

    openBtn.addEventListener('click', open);
    if(closeBtn) closeBtn.addEventListener('click', close);
    panel.addEventListener('click', (e) => {
      if(e.target === panel) close();
    });
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', initSearch);
  }else{
    initSearch();
  }

  window.addEventListener('components:loaded', initSearch);
})();
