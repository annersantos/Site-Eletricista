/**
 * Cunha Soluções — Instalações Elétricas
 * Script Principal Frontend (Vanilla JavaScript)
 * Totalmente estático, sem dependências externas, WCAG 2.1 AA compatível
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileMenu();
  initFaqAccordion();
  initPhoneMask();
  initBudgetForm();
  initScrollReveal();
  initScrollspy();
  initServiceSelectors();
});

/**
 * 1. Navbar — Efeito visual no scroll
 */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  const handleScroll = () => {
    if (window.scrollY > 20) {
      navbar.classList.add('shadow-md', 'bg-white/95');
      navbar.classList.remove('bg-white/80');
    } else {
      navbar.classList.remove('shadow-md', 'bg-white/95');
      navbar.classList.add('bg-white/80');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/**
 * 2. Menu Mobile — Drawer acessível com suporte a teclado e auto-fechamento
 */
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const backdrop = document.getElementById('mobile-menu-backdrop');
  const closeBtn = document.getElementById('mobile-menu-close');
  const navLinks = document.querySelectorAll('.mobile-nav-link');

  if (!toggleBtn || !mobileMenu) return;

  const openMenu = () => {
    mobileMenu.classList.remove('translate-x-full');
    backdrop.classList.remove('opacity-0', 'pointer-events-none');
    backdrop.classList.add('opacity-100');
    toggleBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    if (closeBtn) closeBtn.focus();
  };

  const closeMenu = () => {
    mobileMenu.classList.add('translate-x-full');
    backdrop.classList.remove('opacity-100');
    backdrop.classList.add('opacity-0', 'pointer-events-none');
    toggleBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    toggleBtn.focus();
  };

  toggleBtn.addEventListener('click', () => {
    const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
    if (isExpanded) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  if (closeBtn) closeBtn.addEventListener('click', closeMenu);
  if (backdrop) backdrop.addEventListener('click', closeMenu);

  navLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && toggleBtn.getAttribute('aria-expanded') === 'true') {
      closeMenu();
    }
  });
}

/**
 * 3. FAQ Accordion — Acessibilidade WAI-ARIA completa
 */
function initFaqAccordion() {
  const triggers = document.querySelectorAll('.accordion-trigger');

  triggers.forEach((trigger, index) => {
    trigger.addEventListener('click', () => {
      const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
      const panelId = trigger.getAttribute('aria-controls');
      const panel = document.getElementById(panelId);

      // Fecha outros itens se desejar comportamento único
      triggers.forEach(otherTrigger => {
        if (otherTrigger !== trigger) {
          otherTrigger.setAttribute('aria-expanded', 'false');
          const otherPanelId = otherTrigger.getAttribute('aria-controls');
          const otherPanel = document.getElementById(otherPanelId);
          if (otherPanel) {
            otherPanel.classList.remove('is-open');
          }
        }
      });

      if (isExpanded) {
        trigger.setAttribute('aria-expanded', 'false');
        if (panel) panel.classList.remove('is-open');
      } else {
        trigger.setAttribute('aria-expanded', 'true');
        if (panel) panel.classList.add('is-open');
      }
    });

    // Teclas de navegação do accordion
    trigger.addEventListener('keydown', (e) => {
      let targetTrigger = null;
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        targetTrigger = triggers[(index + 1) % triggers.length];
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        targetTrigger = triggers[(index - 1 + triggers.length) % triggers.length];
      } else if (e.key === 'Home') {
        e.preventDefault();
        targetTrigger = triggers[0];
      } else if (e.key === 'End') {
        e.preventDefault();
        targetTrigger = triggers[triggers.length - 1];
      }

      if (targetTrigger) {
        targetTrigger.focus();
      }
    });
  });
}

/**
 * 4. Máscara de Telefone e WhatsApp (Padrão Nacional)
 */
function initPhoneMask() {
  const phoneInputs = document.querySelectorAll('input[type="tel"]');

  phoneInputs.forEach(input => {
    input.addEventListener('input', (e) => {
      let value = e.target.value.replace(/\D/g, '');
      if (value.length > 11) value = value.slice(0, 11);

      if (value.length > 10) {
        // (11) 99999-9999
        value = value.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
      } else if (value.length > 5) {
        // (11) 9999-9999
        value = value.replace(/^(\d{2})(\d{4})(\d{0,4})$/, '($1) $2-$3');
      } else if (value.length > 2) {
        value = value.replace(/^(\d{2})(\d{0,5})$/, '($1) $2');
      } else if (value.length > 0) {
        value = value.replace(/^(\d*)$/, '($1');
      }

      e.target.value = value;
    });
  });
}

/**
 * 5. Formulário de Orçamento — Validação e Envio Estruturado via WhatsApp
 */
function initBudgetForm() {
  const form = document.getElementById('budget-form');
  const toast = document.getElementById('form-feedback-toast');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Limpar estados de erro prévios
    const errorElements = form.querySelectorAll('.form-error-msg');
    errorElements.forEach(el => el.remove());
    form.querySelectorAll('.has-error').forEach(el => el.classList.remove('has-error', 'border-red-500'));

    let isValid = true;

    const nome = form.querySelector('#nome');
    const whatsapp = form.querySelector('#whatsapp');
    const email = form.querySelector('#email');
    const tipoCliente = form.querySelector('input[name="tipo_cliente"]:checked');
    const servico = form.querySelector('#servico');
    const tipoImovel = form.querySelector('#tipo_imovel');
    const regiao = form.querySelector('#regiao');
    const periodo = form.querySelector('#periodo');
    const descricao = form.querySelector('#descricao');

    // Validação Nome
    if (!nome.value.trim() || nome.value.trim().length < 3) {
      showFieldError(nome, 'Por favor, informe seu nome completo.');
      isValid = false;
    }

    // Validação WhatsApp
    const phoneDigits = whatsapp.value.replace(/\D/g, '');
    if (phoneDigits.length < 10) {
      showFieldError(whatsapp, 'Por favor, informe um WhatsApp válido com DDD.');
      isValid = false;
    }

    // Validação Serviço
    if (!servico.value) {
      showFieldError(servico, 'Selecione o tipo de serviço elétrico que você precisa.');
      isValid = false;
    }

    // Validação Descrição
    if (!descricao.value.trim() || descricao.value.trim().length < 5) {
      showFieldError(descricao, 'Conte-nos brevemente o que você precisa que seja feito.');
      isValid = false;
    }

    if (!isValid) {
      const firstError = form.querySelector('.has-error');
      if (firstError) firstError.focus();
      return;
    }

    // Montagem da mensagem profissional para WhatsApp
    const tipoClienteVal = tipoCliente ? tipoCliente.value : 'Residencial';
    const emailVal = email.value.trim() || 'Não informado';
    const tipoImovelVal = tipoImovel.value || 'Não especificado';
    const regiaoVal = regiao.value.trim() || 'São Paulo e Região';
    const periodoVal = periodo.value || 'Qualquer horário comercial';

    const whatsappMessage = 
`⚡ *SOLICITAÇÃO DE ORÇAMENTO — CUNHA SOLUÇÕES* ⚡

*👤 Dados do Solicitante:*
• *Nome:* ${nome.value.trim()}
• *WhatsApp:* ${whatsapp.value.trim()}
• *E-mail:* ${emailVal}

*🔧 Detalhes do Serviço:*
• *Perfil do Cliente:* ${tipoClienteVal}
• *Serviço Necessário:* ${servico.value}
• *Tipo de Imóvel:* ${tipoImovelVal}
• *Localização / Bairro:* ${regiaoVal}
• *Melhor Período:* ${periodoVal}

*📝 Descrição da Demanda:*
${descricao.value.trim()}

---
_Enviado pelo formulário oficial do site cunhasolucoes.com.br_`;

    // Número de contato WhatsApp: (11) 9090-9090
    const targetPhoneNumber = '551190909090';
    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${targetPhoneNumber}&text=${encodedMessage}`;

    // Exibir notificação de sucesso amigável
    if (toast) {
      toast.classList.remove('hidden');
      toast.classList.add('flex');
      setTimeout(() => {
        toast.classList.add('hidden');
        toast.classList.remove('flex');
      }, 5000);
    }

    // Redirecionamento para o WhatsApp
    setTimeout(() => {
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    }, 400);
  });
}

function showFieldError(field, message) {
  field.classList.add('has-error', 'border-red-500');
  const errorEl = document.createElement('p');
  errorEl.className = 'form-error-msg text-xs text-red-600 font-medium mt-1';
  errorEl.textContent = message;
  field.parentNode.appendChild(errorEl);
}

/**
 * 6. Scroll Reveal com IntersectionObserver
 */
function initScrollReveal() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('.reveal-item').forEach(el => el.classList.add('is-revealed'));
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        obs.unobserve(entry.target);
      }
    });
  }, {
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.12
  });

  document.querySelectorAll('.reveal-item').forEach(el => observer.observe(el));
}

/**
 * 7. Scrollspy para destacar links ativos na navbar
 */
function initScrollspy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.desktop-nav-link');

  if (!sections.length || !navLinks.length) return;

  const highlightNav = () => {
    const scrollY = window.pageYOffset + 120;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('text-red-600', 'font-semibold');
          link.classList.add('text-slate-600');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('text-red-600', 'font-semibold');
            link.classList.remove('text-slate-600');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', highlightNav, { passive: true });
}

/**
 * 8. Interação de seleção rápida de serviços
 * Permite clicar em "Solicitar este serviço" em qualquer card e rolar direto com o campo preenchido
 */
function initServiceSelectors() {
  const selectServiceButtons = document.querySelectorAll('[data-select-service]');
  const servicoSelect = document.getElementById('servico');

  selectServiceButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const serviceName = btn.getAttribute('data-select-service');
      if (servicoSelect && serviceName) {
        // Encontra ou seleciona a opção correspondente
        for (let i = 0; i < servicoSelect.options.length; i++) {
          if (servicoSelect.options[i].text.includes(serviceName) || servicoSelect.options[i].value.includes(serviceName)) {
            servicoSelect.selectedIndex = i;
            break;
          }
        }
      }
    });
  });
}
