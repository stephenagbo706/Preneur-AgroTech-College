(function(){
  function joinPath(root, path){
    const cleanRoot = root.replace(/\/$/, '');
    if(cleanRoot === '.' || cleanRoot === '') return './' + path;
    return cleanRoot + '/' + path;
  }

  async function loadComponent(targetId, file){
    const target = document.getElementById(targetId);
    if(!target) return;
    try{
      const res = await fetch(file);
      if(!res.ok) throw new Error('Failed to load ' + file);
      target.innerHTML = await res.text();
    }catch(err){
      console.warn(err);
    }
  }

  async function init(){
    const root = document.body.dataset.root || '.';
    await Promise.all([
      loadComponent('site-header', joinPath(root, 'components/header.html')),
      loadComponent('site-menu', joinPath(root, 'components/menu.html')),
      loadComponent('site-footer', joinPath(root, 'components/footer.html')),
    ]);

    const ensureFontAwesome = () => {
      const href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
      let link = document.querySelector(`link[href="${href}"]`);
      if(!link){
        link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = href;
        document.head.appendChild(link);
      }

      const check = () => {
        const probe = document.createElement('i');
        probe.className = 'fab fa-facebook-f';
        probe.style.position = 'absolute';
        probe.style.opacity = '0';
        document.body.appendChild(probe);
        const fam = (getComputedStyle(probe).fontFamily || '').toLowerCase();
        document.body.classList.toggle('fa-missing', !fam.includes('font awesome'));
        probe.remove();
      };

      if(link.sheet){
        check();
      }else{
        link.addEventListener('load', check, {once:true});
        setTimeout(check, 1500);
      }
    };

    const applyLinks = (scope) => {
      scope.querySelectorAll('[data-link]').forEach(el => {
        const href = el.getAttribute('data-link');
        if(href) el.setAttribute('href', joinPath(root, href));
      });
      scope.querySelectorAll('[data-src]').forEach(el => {
        const src = el.getAttribute('data-src');
        if(src) el.setAttribute('src', joinPath(root, src));
      });
    };

    applyLinks(document);
    ensureFontAwesome();

    const page = document.body.dataset.page;
    if(page){
      document.querySelectorAll('[data-page]')
        .forEach(el => el.classList.toggle('active', el.getAttribute('data-page') === page));
    }

    const ham = document.getElementById('ham');
    const drawer = document.getElementById('drawer');
    if(ham && drawer){
      ham.addEventListener('click', () => drawer.classList.toggle('open'));
      drawer.querySelectorAll('a').forEach(a => a.addEventListener('click', () => drawer.classList.remove('open')));
    }

    const botnav = document.getElementById('botnav');
    if(botnav){
      botnav.querySelectorAll('[data-link]').forEach(el => {
        el.addEventListener('click', () => {
          const link = el.getAttribute('data-link');
          if(link) window.location.href = joinPath(root, link);
        });
      });
    }

    const topnav = document.getElementById('topnav');
    if(topnav){
      window.addEventListener('scroll', () => {
        topnav.classList.toggle('shadow', window.scrollY > 20);
      });
    }

    window.dispatchEvent(new Event('components:loaded'));
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init);
  }else{
    init();
  }
})();
