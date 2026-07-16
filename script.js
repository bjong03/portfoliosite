function toggleMenu(){
    const menu = document.getElementById('mobileLinks');
    const btn = document.getElementById('menuToggle');
    const isOpen = menu.classList.toggle('open');
    btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  }
  function closeMenu(){
    document.getElementById('mobileLinks').classList.remove('open');
    document.getElementById('menuToggle').setAttribute('aria-expanded','false');
  }

  (function(){
    const row = document.getElementById('pedestalRow');
    const prevBtn = document.getElementById('timelinePrev');
    const nextBtn = document.getElementById('timelineNext');
    if(!row || !prevBtn || !nextBtn) return;

    let index = 0;

    function step(){
      const unit = row.querySelector('.pedestal-unit');
      const gap = parseFloat(getComputedStyle(row).columnGap || getComputedStyle(row).gap || 0);
      return unit ? unit.getBoundingClientRect().width + gap : 0;
    }

    function visibleCount(){
      const s = step();
      return s ? Math.max(1, Math.floor((row.parentElement.clientWidth + parseFloat(getComputedStyle(row).gap||0)) / s)) : 1;
    }

    function maxIndex(){
      const total = row.querySelectorAll('.pedestal-unit').length;
      return Math.max(0, total - visibleCount());
    }

    function update(){
      const max = maxIndex();
      if(index > max) index = max;
      if(index < 0) index = 0;
      row.style.transform = `translateX(${-index * step()}px)`;
      prevBtn.disabled = index <= 0;
      nextBtn.disabled = index >= max;
    }

    window.scrollTimeline = function(dir){
      index += dir;
      update();
    };

    window.addEventListener('resize', update);
    update();
  })();

  function openCase(){ document.getElementById('overlay').classList.add('open'); }
  function closeCase(){ document.getElementById('overlay').classList.remove('open'); }
  document.getElementById('overlay').addEventListener('click', function(e){ if(e.target === this) closeCase(); });

  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches){
    let lastLeaf = 0;
    const leafSVG = (color) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28"><path d="M14 3c6 2 9 7 9 12-4 1-9-1-11-5-1 3 0 7 3 9-5 1-10-3-10-9 0-4 3-6 9-7z" fill="${color}" stroke="#241D14" stroke-width="1"/></svg>`;
    const leafColors = ['#C9A155','#F2DFA6','#4FA8A0','#D98BB0'];
    window.addEventListener('mousemove', (e) => {
      const now = Date.now();
      if(now - lastLeaf < 90) return;
      lastLeaf = now;
      const el = document.createElement('div');
      el.className = 'leaf-particle';
      el.innerHTML = leafSVG(leafColors[Math.floor(Math.random()*leafColors.length)]);
      el.style.left = (e.clientX - 8) + 'px';
      el.style.top = (e.clientY - 8) + 'px';
      document.body.appendChild(el);
      const drift = (Math.random() - 0.5) * 60;
      const rot = (Math.random() - 0.5) * 260;
      const duration = 900 + Math.random()*400;
      el.animate([
        { transform: 'translate(0,0) rotate(0deg)', opacity:1 },
        { transform: `translate(${drift}px, 70px) rotate(${rot}deg)`, opacity:0 }
      ], { duration: duration, easing:'ease-out' });
      setTimeout(() => el.remove(), duration);
    });
  }
