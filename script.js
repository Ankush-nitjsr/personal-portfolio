// AI-generated via Cursor on 2026-04-25
// Reviewed and validated by Ankush

const body = document.body;

const tablinks = document.querySelectorAll('.tab-titles [role="tab"]');

const activateTab = (tabname) => {
  for (const tab of tablinks) {
    const isActive = tab.getAttribute('data-tab') === tabname;
    tab.classList.toggle('active-link', isActive);
    tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
    tab.tabIndex = isActive ? 0 : -1;
  }

  for (const content of document.querySelectorAll('.tab-contents')) {
    const isActive = content.id === tabname;
    content.classList.toggle('active-tab', isActive);
    if (isActive) {
      content.removeAttribute('hidden');
    } else {
      content.setAttribute('hidden', '');
    }
  }
};

for (const tab of tablinks) {
  tab.addEventListener('click', () => {
    const name = tab.getAttribute('data-tab');
    if (name) {
      activateTab(name);
    }
  });
  tab.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      tab.click();
    }
  });
}

const tablist = document.querySelector('.tab-titles[role="tablist"]');
if (tablist) {
  tablist.addEventListener('keydown', (e) => {
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') {
      return;
    }
    const tabs = Array.from(tablinks);
    const i = tabs.indexOf(document.activeElement);
    if (i === -1) {
      return;
    }
    e.preventDefault();
    const next =
      e.key === 'ArrowRight' ? (i + 1) % tabs.length : (i - 1 + tabs.length) % tabs.length;
    const btn = tabs[next];
    if (btn) {
      const name = btn.getAttribute('data-tab');
      if (name) {
        activateTab(name);
        btn.focus();
      }
    }
  });
}

const sidemenu = document.getElementById('sidemenu');
const navToggle = document.getElementById('navToggle');
const navClose = document.getElementById('navClose');
const menuOverlay = document.getElementById('menuOverlay');

const isMobileMenu = () => window.matchMedia('(max-width: 600px)').matches;

const setMenuOpen = (open) => {
  if (!sidemenu || !navToggle) {
    return;
  }
  const mobile = isMobileMenu();
  sidemenu.classList.toggle('is-open', open);
  body.classList.toggle('menu-open', open && mobile);
  if (menuOverlay) {
    if (mobile) {
      menuOverlay.classList.toggle('is-open', open);
      if (open) {
        menuOverlay.removeAttribute('hidden');
        menuOverlay.setAttribute('aria-hidden', 'false');
      } else {
        menuOverlay.setAttribute('hidden', '');
        menuOverlay.setAttribute('aria-hidden', 'true');
      }
    } else {
      menuOverlay.classList.remove('is-open');
      menuOverlay.setAttribute('hidden', '');
      menuOverlay.setAttribute('aria-hidden', 'true');
    }
  }
  if (mobile) {
    navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    sidemenu.setAttribute('aria-hidden', open ? 'false' : 'true');
  } else {
    navToggle.setAttribute('aria-expanded', 'false');
    sidemenu.removeAttribute('aria-hidden');
  }
};

if (navToggle) {
  navToggle.setAttribute('aria-expanded', 'false');
  navToggle.addEventListener('click', () => {
    setMenuOpen(!sidemenu.classList.contains('is-open'));
  });
}
if (navClose) {
  navClose.addEventListener('click', () => {
    setMenuOpen(false);
  });
}
if (menuOverlay) {
  menuOverlay.setAttribute('hidden', '');
  menuOverlay.setAttribute('aria-hidden', 'true');
  menuOverlay.addEventListener('click', () => {
    setMenuOpen(false);
  });
}
if (isMobileMenu() && sidemenu) {
  sidemenu.setAttribute('aria-hidden', 'true');
} else if (sidemenu) {
  sidemenu.removeAttribute('aria-hidden');
}

window.addEventListener('resize', () => {
  if (!isMobileMenu() && menuOverlay) {
    menuOverlay.classList.remove('is-open');
    menuOverlay.setAttribute('hidden', '');
    menuOverlay.setAttribute('aria-hidden', 'true');
  }
  if (sidemenu) {
    sidemenu.classList.remove('is-open');
  }
  if (!isMobileMenu()) {
    body.classList.remove('menu-open');
  }
  if (isMobileMenu() && sidemenu) {
    sidemenu.setAttribute('aria-hidden', 'true');
  } else if (sidemenu) {
    sidemenu.removeAttribute('aria-hidden');
  }
  if (navToggle) {
    navToggle.setAttribute('aria-expanded', 'false');
  }
});

document.querySelectorAll('.nav-list a[role="menuitem"]').forEach((link) => {
  link.addEventListener('click', () => {
    if (window.innerWidth <= 600) {
      setMenuOpen(false);
    }
  });
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && sidemenu && sidemenu.classList.contains('is-open')) {
    setMenuOpen(false);
  }
});

const backToTop = document.getElementById('backToTop');
if (backToTop) {
  const toggleBtt = () => {
    if (window.scrollY > 420) {
      backToTop.classList.add('is-visible');
    } else {
      backToTop.classList.remove('is-visible');
    }
  };
  let ticking = false;
  window.addEventListener(
    'scroll',
    () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          toggleBtt();
          ticking = false;
        });
        ticking = true;
      }
    },
    { passive: true }
  );
  toggleBtt();
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

const sectionIds = ['header', 'about', 'services', 'portfolio', 'contact'];
const navLinkMap = new Map();
document.querySelectorAll('.nav-list a[role="menuitem"]').forEach((a) => {
  const href = a.getAttribute('href');
  if (href && href.startsWith('#') && href.length > 1) {
    const id = href.slice(1);
    if (!navLinkMap.has(id)) {
      navLinkMap.set(id, a);
    }
  }
});
const setActiveNav = (id) => {
  if (!id) {
    return;
  }
  navLinkMap.forEach((link, key) => {
    if (key === id) {
      link.setAttribute('aria-current', 'page');
    } else {
      link.removeAttribute('aria-current');
    }
  });
};

const sectionEls = sectionIds.map((id) => document.getElementById(id)).filter(Boolean);
const updateActiveNav = () => {
  const triggerLine = window.innerHeight * 0.28;
  let bestId = sectionEls[0] ? sectionEls[0].id : 'header';
  for (const sec of sectionEls) {
    const r = sec.getBoundingClientRect();
    if (r.top <= triggerLine) {
      bestId = sec.id;
    }
  }
  setActiveNav(bestId);
};

let navTick = false;
const onScrollNav = () => {
  if (!navTick) {
    window.requestAnimationFrame(() => {
      updateActiveNav();
      navTick = false;
    });
    navTick = true;
  }
};

window.addEventListener('scroll', onScrollNav, { passive: true });
window.addEventListener('load', () => {
  updateActiveNav();
  const hash = window.location.hash.slice(1);
  if (hash && document.getElementById(hash)) {
    setActiveNav(hash);
  }
});
updateActiveNav();

const scriptURL =
  'https://script.google.com/macros/s/AKfycbxwP0xOyklr4Dqgk5EC76gu8tb3wzN3d9nQRgI9vDKObFLGJu6s_99BIBW3G79vPN8/exec';
const form = document.forms['submit-to-google-sheet'];
const msg = document.getElementById('msg');
if (form) {
  if (msg) {
    msg.setAttribute('aria-hidden', 'true');
  }
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const submitBtn = form.querySelector('button[type="submit"]');
    if (msg) {
      msg.textContent = '';
      msg.className = 'form-msg';
    }
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.dataset.label = submitBtn.textContent;
      submitBtn.textContent = 'Sending…';
    }
    fetch(scriptURL, { method: 'POST', body: new FormData(form) })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network error');
        }
        if (msg) {
          msg.textContent = 'Message sent successfully';
          msg.classList.remove('is-error');
        }
        form.reset();
        setTimeout(() => {
          if (msg) {
            msg.textContent = '';
            msg.setAttribute('aria-hidden', 'true');
          }
        }, 5000);
      })
      .catch((error) => {
        if (msg) {
          msg.textContent = 'Something went wrong. Please try email or LinkedIn instead.';
          msg.classList.add('is-error');
        }
        console.error('Error!', error);
      })
      .finally(() => {
        if (submitBtn) {
          submitBtn.disabled = false;
          if (submitBtn.dataset.label) {
            submitBtn.textContent = submitBtn.dataset.label;
          } else {
            submitBtn.textContent = 'Submit';
          }
        }
        if (msg) {
          msg.setAttribute('aria-hidden', 'false');
        }
      });
  });
}
