// script.js - BEP Rehberim Tanıtım Sitesi Etkileşim Motoru

document.addEventListener("DOMContentLoaded", function () {
  
  // 1. Mobile Menu Toggle
  const mobileToggle = document.getElementById("mobileToggle");
  const mobileMenu = document.getElementById("mobileMenu");
  
  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener("click", function () {
      mobileMenu.classList.toggle("open");
    });

    // Menüdeki bir linke tıklandığında menüyü kapat
    const mobileLinks = mobileMenu.querySelectorAll(".mobile-link, .btn");
    mobileLinks.forEach(link => {
      link.addEventListener("click", () => {
        mobileMenu.classList.remove("open");
      });
    });
  }

  // 2. FAQ Accordion
  const faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach(item => {
    const questionBtn = item.querySelector(".faq-question");
    if (questionBtn) {
      questionBtn.addEventListener("click", () => {
        const isOpen = item.classList.contains("open");
        
        // Diğerlerini kapat (akordeon etkisi)
        faqItems.forEach(other => other.classList.remove("open"));

        if (!isOpen) {
          item.classList.add("open");
        }
      });
    }
  });

  // İlk soruyu varsayılan açık getir
  if (faqItems.length > 0) {
    faqItems[0].classList.add("open");
  }

  // 3. Screenshot Gallery Tabs
  const galleryTabs = document.querySelectorAll(".gallery-tab");
  const galleryPanels = document.querySelectorAll(".gallery-panel");

  galleryTabs.forEach(tab => {
    tab.addEventListener("click", () => {
      const targetId = tab.getAttribute("data-target");

      galleryTabs.forEach(t => t.classList.remove("active"));
      galleryPanels.forEach(p => p.classList.remove("active"));

      tab.classList.add("active");
      const targetPanel = document.getElementById(targetId);
      if (targetPanel) {
        targetPanel.classList.add("active");
      }
    });
  });

  // 4. Hero Mockup Image Slider (Otomatik Canlı Önizleme)
  const heroMockupImg = document.getElementById("heroMockupImg");
  if (heroMockupImg) {
    const heroImages = [
      "assets/images/Başlıksız-1.jpg",
      "assets/images/Başlıksız-4.jpg",
      "assets/images/Başlıksız-8.jpg",
      "assets/images/Başlıksız-12.jpg",
      "assets/images/Başlıksız-15.jpg"
    ];
    let currentIdx = 0;
    let isHovered = false;

    heroMockupImg.parentElement.addEventListener("mouseenter", () => isHovered = true);
    heroMockupImg.parentElement.addEventListener("mouseleave", () => isHovered = false);

    setInterval(() => {
      if (!isHovered) {
        currentIdx = (currentIdx + 1) % heroImages.length;
        heroMockupImg.style.opacity = "0.7";
        setTimeout(() => {
          heroMockupImg.src = heroImages[currentIdx];
          heroMockupImg.style.opacity = "1";
        }, 200);
      }
    }, 4500);
  }

  // 5. Navbar Shadow on Scroll
  const navbar = document.getElementById("navbar");
  if (navbar) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 20) {
        navbar.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.08)";
      } else {
        navbar.style.boxShadow = "none";
      }
    });
  }

});

// 6. Lisans iletişim bağlantıları (cihaz farkındalığı + hazır mesaj şablonları)
(function () {
  var WA = "905055902343";
  var MAIL = "beprehberim@gmail.com";
  var ua = navigator.userAgent || "";
  var isMobile = /Android|iPhone|iPad|iPod|Mobi|Windows Phone/i.test(ua) ||
    (navigator.maxTouchPoints > 1 && window.innerWidth < 900);

  document.documentElement.classList.add(isMobile ? "is-mobile" : "is-desktop");

  var deviceLine = isMobile
    ? "🖥️ Cihaz Kimliğim: (bilgisayarımdaki programdan kopyalayıp birazdan ileteceğim)"
    : "🖥️ Cihaz Kimliğim (programdaki 'Lisans Al' penceresinde görünen BR-XXXX-XXXX kodu): ";

  var MESSAGES = {
    buy: "Merhaba, BEP Rehberim web sitenizden ulaşıyorum. Öğretmen lisansı (1 yıllık) satın almak istiyorum.\n\n👤 Adım Soyadım: \n🏫 Okulum (isteğe bağlı): \n" + deviceLine,
    renew: "Merhaba, BEP Rehberim lisans süremi uzatmak istiyorum.\n\n👤 Adım Soyadım: \n" + deviceLine,
    info: "Merhaba, BEP Rehberim hakkında bilgi almak istiyorum."
  };

  var SUBJECTS = {
    buy: "BEP Rehberim Lisans Talebi",
    renew: "BEP Rehberim Lisans Uzatma Talebi",
    info: "BEP Rehberim Hakkında Bilgi"
  };

  function setupContactLinks() {
    var waLinks = document.querySelectorAll("[data-wa-intent]");
    for (var i = 0; i < waLinks.length; i++) {
      var intent = waLinks[i].getAttribute("data-wa-intent");
      if (MESSAGES[intent]) {
        waLinks[i].href = "https://wa.me/" + WA + "?text=" + encodeURIComponent(MESSAGES[intent]);
      }
    }
    var mailLinks = document.querySelectorAll("[data-mail-intent]");
    for (var j = 0; j < mailLinks.length; j++) {
      var mIntent = mailLinks[j].getAttribute("data-mail-intent");
      if (MESSAGES[mIntent]) {
        mailLinks[j].href = "mailto:" + MAIL +
          "?subject=" + encodeURIComponent(SUBJECTS[mIntent]) +
          "&body=" + encodeURIComponent(MESSAGES[mIntent].replace(/\n/g, "\r\n"));
      }
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", setupContactLinks);
  } else {
    setupContactLinks();
  }
})();
