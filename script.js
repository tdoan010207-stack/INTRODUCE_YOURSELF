document.addEventListener('DOMContentLoaded', function() {
    
    const preloader = document.getElementById('preloader');
    const mainContent = document.querySelector('.main-content');
    const currentPath = window.location.pathname.split("/").pop() || 'index.html';

    // ====================================
    // 1. QUẢN LÝ PRELOADER VÀ HIỆU ỨNG GÕ CHỮ
    // ====================================
    if (currentPath === 'index.html') {
        const welcomeText = document.querySelector('.welcome-text');

        if (preloader && welcomeText) {
            welcomeText.textContent = 'WELCOME TO MY WEBSITE.';
            
            // Chạy Preloader bình thường trên Trang Chủ
            setTimeout(() => {
                preloader.classList.add('fade-out'); 
                setTimeout(() => {
                    preloader.remove();
                }, 1000); 

                if (mainContent) {
                    mainContent.classList.add('loaded');
                    const typeElement = document.getElementById('typing-text');
                    if (typeElement) {
                        typeWriterEffect(typeElement, typeElement.textContent, 50); 
                    }
                }
            }, 500); 
        }
    } else {
        // TẮT PRELOADER NGAY LẬP TỨC TRÊN CÁC TRANG KHÁC
        if (preloader) {
            preloader.remove();
        }
        if (mainContent) {
            mainContent.classList.add('loaded'); // Đảm bảo nội dung hiển thị ngay
        }
    }

    // ====================================
    // HÀM GÕ CHỮ (CHỈ DÙNG CHO INDEX.HTML)
    // ====================================
    function typeWriterEffect(element, text, delay) {
        let i = 0;
        element.textContent = ''; 
        element.style.visibility = 'visible';
        
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, delay);
            }
        }
        type();
    }


    // ====================================
    // 2. HIỆU ỨNG FADE-IN KHI CUỘN (SCROLL ANIMATION)
    // ====================================
    const sections = document.querySelectorAll('.card');

    const observerOptions = {
        root: null, 
        rootMargin: '0px',
        threshold: 0.1 
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible'); 
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        if (!section.closest('#home-intro')) {
            observer.observe(section);
        }
    });

    // ====================================
    // 3. ĐÁNH DẤU ACTIVE LINK
    // ====================================
    const navLinks = document.querySelectorAll('.nav-links a');

    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href').split("/").pop();
        
        if (currentPath === linkPath || (currentPath === "index.html" && linkPath === "index.html")) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});