document.addEventListener('DOMContentLoaded', () => {
    
    const numeroWhatsApp = "5511975879858"; 
    const msgPadrao = "Olá, Dra. Mileny! Gostaria de agendar uma consulta.";

    const botoesWhatsApp = document.querySelectorAll('.botao-topo, #btn-hero-whatsapp');
    
    botoesWhatsApp.forEach(botao => {
        botao.href = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(msgPadrao)}`;
        botao.target = "_blank";
    });

    const cabecalho = document.querySelector('.cabecalho');
    const menu = document.querySelector('.menu');
    
    if (menu) {
        const btnMobile = document.createElement('button');
        btnMobile.classList.add('btn-mobile');
        btnMobile.innerHTML = '<i class="fa-solid fa-bars"></i>';
        cabecalho.insertBefore(btnMobile, menu);

        btnMobile.addEventListener('click', () => {
            menu.classList.toggle('ativo');
            const icone = btnMobile.querySelector('i');
            if (menu.classList.contains('ativo')) {
                icone.classList.replace('fa-bars', 'fa-xmark');
            } else {
                icone.classList.replace('fa-xmark', 'fa-bars');
            }
        });

        menu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menu.classList.remove('ativo');
                btnMobile.querySelector('i').classList.replace('fa-xmark', 'fa-bars');
            });
        });
    }

    window.addEventListener('scroll', () => {
        if (cabecalho) {
            if (window.scrollY > 50) {
                cabecalho.classList.add('rolado');
            } else {
                cabecalho.classList.remove('rolado');
            }
        }
    });

    const elementosAnimados = document.querySelectorAll('.secao, .hero-conteudo, .card-servico, .grade-diferenciais article, .galeria-consultorio img');
    elementosAnimados.forEach(el => el.classList.add('fade-in'));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visivel');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    elementosAnimados.forEach(el => observer.observe(el));

    const form = document.querySelector('.contato-formulario form');
    const inputTelefone = document.querySelector('input[type="tel"]');
    const inputMensagem = document.querySelector('textarea[name="mensagem"]');

    const urlParams = new URLSearchParams(window.location.search);
    const servicoSelecionado = urlParams.get('servico');
    
    if (servicoSelecionado && inputMensagem) {
        inputMensagem.value = `Olá! Gostaria de saber mais sobre o tratamento de ${servicoSelecionado}.`;
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
            
            const nome = form.querySelector('input[name="nome"]').value;
            const telefone = form.querySelector('input[name="telefone"]').value;
            const email = form.querySelector('input[name="email"]').value;
            const mensagem = form.querySelector('textarea[name="mensagem"]').value;

            const texto = `Olá, Dra. Mileny! Gostaria de agendar uma consulta.\n\n*Nome:* ${nome}\n*Telefone:* ${telefone}\n*E-mail:* ${email}\n*Mensagem:* ${mensagem || "Nenhuma mensagem adicional."}`;
            
            const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(texto)}`;
            
            window.open(url, '_blank');
            
            form.reset();
        });
    }
});