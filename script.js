// script.js
document.addEventListener('DOMContentLoaded', () => {
    
    // Menu Mobile
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            
            // Toggle hamburger icon animation
            const bars = menuToggle.querySelectorAll('.bar');
            if (navLinks.classList.contains('active')) {
                bars[0].style.transform = 'translateY(9px) rotate(45deg)';
                bars[1].style.opacity = '0';
                bars[2].style.transform = 'translateY(-9px) rotate(-45deg)';
            } else {
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            }
        });
    }

    // Scroll Header Background
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Smooth Scroll para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            // Fechar menu mobile se estiver aberto
            if (navLinks.classList.contains('active')) {
                menuToggle.click();
            }

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
        
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Intersection Observer para Animações (Scroll)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Adiciona delay caso especificado
                const delay = entry.target.style.getPropertyValue('--delay');
                if (delay) {
                    setTimeout(() => {
                        entry.target.classList.add('is-visible');
                    }, parseInt(delay));
                } else {
                    entry.target.classList.add('is-visible');
                }
                // Para não animar novamente ao rolar pra cima
                // observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });

    // Formulário de Contato WhatsApp Submit
    const contactForm = document.getElementById('whatsapp-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const nome = document.getElementById('nome').value;
            const telefone = document.getElementById('telefone').value; // opcional mandar no text, o wpp já manda do próprio
            const servico = document.getElementById('servico').options[document.getElementById('servico').selectedIndex].text;
            const mensagem = document.getElementById('mensagem').value;

            let text = `Olá! Meu nome é ${nome}.\n`;
            text += `Preciso de ajuda com: ${servico}.\n\n`;
            text += `Detalhes:\n${mensagem}`;

            const encodedText = encodeURIComponent(text);
            const whatsappUrl = `https://wa.me/5511919313197?text=${encodedText}`;

            window.open(whatsappUrl, '_blank');
            contactForm.reset();
        });
    }

    // Cookie Banner Logic
    const cookieBanner = document.getElementById('cookie-banner');
    const acceptCookiesBtn = document.getElementById('accept-cookies');

    if (cookieBanner && acceptCookiesBtn) {
        if (!localStorage.getItem('cookieConsent')) {
            setTimeout(() => {
                cookieBanner.classList.add('show');
            }, 1000);
        }

        acceptCookiesBtn.addEventListener('click', () => {
            localStorage.setItem('cookieConsent', 'true');
            cookieBanner.classList.remove('show');
        });
    }
});
