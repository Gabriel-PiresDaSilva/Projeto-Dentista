document.addEventListener('DOMContentLoaded', () => {

  const numeroWhatsApp = "5511997190994";
  const msgPadrao = "Olá, Dra. Mileny! Gostaria de agendar uma consulta.";

  const botoesWhatsApp = document.querySelectorAll(
    '.btn-whatsapp, #btn-hero-whatsapp, .botao-topo'
  );

  botoesWhatsApp.forEach((botao) => {
    botao.href = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(msgPadrao)}`;
    botao.target = "_blank";
    botao.rel = "noopener noreferrer";
  });

  const cabecalho = document.querySelector('.topo');
  const menu = document.querySelector('.topo-menu');

  if (cabecalho && menu) {
    const btnMobile = document.createElement('button');
    btnMobile.classList.add('btn-mobile');
    btnMobile.setAttribute('aria-label', 'Abrir menu');
    btnMobile.setAttribute('aria-expanded', 'false');
    btnMobile.innerHTML = '<i class="fa-solid fa-bars"></i>';

    cabecalho.insertBefore(btnMobile, menu);

    btnMobile.addEventListener('click', () => {
      menu.classList.toggle('ativo');
      const icone = btnMobile.querySelector('i');
      const aberto = menu.classList.contains('ativo');

      if (aberto) {
        icone.classList.replace('fa-bars', 'fa-xmark');
      } else {
        icone.classList.replace('fa-xmark', 'fa-bars');
      }
      btnMobile.setAttribute('aria-expanded', aberto ? 'true' : 'false');
    });

    menu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        menu.classList.remove('ativo');
        btnMobile.querySelector('i').classList.replace('fa-xmark', 'fa-bars');
        btnMobile.setAttribute('aria-expanded', 'false');
      });
    });
  }

  if (cabecalho) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        cabecalho.classList.add('rolado');
      } else {
        cabecalho.classList.remove('rolado');
      }
    });
  }

  const elementosAnimados = document.querySelectorAll(
    '.secao, .hero-texto, .sobre-wrap, .diferenciais-grade article, .servico-card, .foto-galeria'
  );

  elementosAnimados.forEach((el) => el.classList.add('fade-in'));

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visivel');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    elementosAnimados.forEach((el) => observer.observe(el));
  } else {
    elementosAnimados.forEach((el) => el.classList.add('visivel'));
  }

  const form = document.querySelector('.contato-formulario form');
  const inputTelefone = document.querySelector('input[type="tel"]');
  const inputMensagem = document.querySelector('textarea[name="mensagem"]');

  const urlParams = new URLSearchParams(window.location.search);
  const servicoSelecionado = urlParams.get('servico');

  if (servicoSelecionado && inputMensagem) {
    const servicoLimpo = decodeURIComponent(servicoSelecionado);
    inputMensagem.value = `Olá! Gostaria de saber mais sobre o tratamento de ${servicoLimpo}.`;
  }

  if (inputTelefone) {
    inputTelefone.addEventListener('input', (e) => {
      let value = e.target.value.replace(/\D/g, ''); 
      if (value.length > 11) value = value.slice(0, 11);

      value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
      value = value.replace(/(\d)(\d{4})$/, '$1-$2');

      e.target.value = value;
    });
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const nome = form.querySelector('input[name="nome"]')?.value.trim() || '';
      const telefone = form.querySelector('input[name="telefone"]')?.value.trim() || '';
      const email = form.querySelector('input[name="email"]')?.value.trim() || '';
      const mensagem = form.querySelector('textarea[name="mensagem"]')?.value.trim() || '';

      if (!nome || !telefone || !email) {
        alert('Por favor, preencha nome, telefone e e-mail.');
        return;
      }

      const texto = `Olá, Dra. Mileny! Gostaria de agendar uma consulta.\n\n*Nome:* ${nome}\n*Telefone:* ${telefone}\n*E-mail:* ${email}\n*Mensagem:* ${mensagem || 'Nenhuma mensagem adicional.'}`;

      const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(texto)}`;

      window.open(url, '_blank', 'noopener,noreferrer');

      form.reset();
    });
  }

});