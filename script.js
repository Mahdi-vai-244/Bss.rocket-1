// ডকুমেন্ট রেডি হলে সব ফাংশন ইনিশিয়ালাইজ করুন
document.addEventListener('DOMContentLoaded', function() {
  // নেভিগেশন লিংকগুলিতে ইভেন্ট যোগ করুন
  initNavigation();
  
  // গ্যালারি টগল বাটন
  initGallery();
  
  // মোবাইল মেনু
  initMobileMenu();
  
  // ফর্ম সাবমিশন
  initForm();
  
  // স্ক্রোল টু টপ বাটন
  initScrollToTop();
  
  // ছবি লোড চেক
  checkImages();
});

// নেভিগেশন ফাংশন
function initNavigation() {
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId.startsWith('#')) {
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          // মোবাইল মেনু বন্ধ করুন (যদি খোলা থাকে)
          const mobileMenu = document.getElementById('mobileMenu');
          if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
          }
          
          // টার্গেট এলিমেন্টে স্ক্রোল করুন
          const headerHeight = document.querySelector('nav').offsetHeight;
          const targetPosition = targetElement.offsetTop - headerHeight - 20;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });
}

// গ্যালারি টগল ফাংশন
function initGallery() {
  const galleryToggleBtn = document.getElementById('galleryToggleBtn');
  const gallery = document.getElementById('certGallery');
  const galleryBtnText = document.getElementById('galleryBtnText');
  
  if (galleryToggleBtn && gallery) {
    galleryToggleBtn.addEventListener('click', function() {
      gallery.classList.toggle('active');
      
      if (gallery.classList.contains('active')) {
        galleryBtnText.textContent = 'গ্যালারি লুকান';
        // আইকন পরিবর্তন
        const icon = this.querySelector('i');
        if (icon) {
          icon.className = 'fa-regular fa-eye-slash';
        }
      } else {
        galleryBtnText.textContent = 'সার্টিফিকেটের নমুনা দেখুন';
        // আইকন পরিবর্তন
        const icon = this.querySelector('i');
        if (icon) {
          icon.className = 'fa-regular fa-image';
        }
      }
    });
  }
}

// মোবাইল মেনু ফাংশন
function initMobileMenu() {
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', function() {
      mobileMenu.classList.toggle('hidden');
      
      // আইকন পরিবর্তন
      const icon = this.querySelector('i');
      if (icon) {
        if (mobileMenu.classList.contains('hidden')) {
          icon.className = 'fa-solid fa-bars';
        } else {
          icon.className = 'fa-solid fa-times';
        }
      }
    });
    
    // উইন্ডো রিসাইজ হলে মোবাইল মেনু বন্ধ করুন
    window.addEventListener('resize', function() {
      if (window.innerWidth >= 768) { // md breakpoint
        mobileMenu.classList.add('hidden');
        const icon = mobileMenuBtn.querySelector('i');
        if (icon) {
          icon.className = 'fa-solid fa-bars';
        }
      }
    });
  }
}

// ফর্ম সাবমিশন ফাংশন
function initForm() {
  const form = document.getElementById('admissionForm');
  
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      submitToWhatsApp(e);
    });
  }
}

// হোয়াটসঅ্যাপ সাবমিশন ফাংশন
function submitToWhatsApp(event) {
  // ভ্যালু নেওয়া
  const name = document.getElementById('name').value;
  const father = document.getElementById('father').value;
  const mobile = document.getElementById('mobile').value;
  const profession = document.getElementById('profession').value;
  const address = document.getElementById('address').value;

  // মেসেজ ফরম্যাট করা
  const message = `*আসসালামু আলাইকুম, আমি ভর্তি হতে চাই।*%0a%0a` +
    `*পূর্ণ নাম:* _${name}_%0a` +
    `*পিতার নাম:* _${father}_%0a` +
    `*মোবাইল:* _${mobile}_%0a` +
    `*পেশা:* _${profession}_%0a` +
    `*ঠিকানা:* _${address}_`;

  // WhatsApp এ রিডাইরেক্ট
  const whatsappNumber = "8801887852687";
  const url = `https://wa.me/${whatsappNumber}?text=${message}`;

  // পপ-আপ কনফার্মেশন
  if (confirm("আপনার তথ্য সঠিক হলে 'OK' চাপুন। এটি আপনাকে হোয়াটসঅ্যাপে নিয়ে যাবে।")) {
    window.open(url, '_blank');
    event.target.reset();
    
    // সাফল্য মেসেজ (ঐচ্ছিক)
    showNotification('আপনার আবেদন সফলভাবে জমা হয়েছে! হোয়াটসঅ্যাপে রিডাইরেক্ট করা হচ্ছে...', 'success');
  }
}

// স্ক্রোল টু টপ ফাংশন
function initScrollToTop() {
  const scrollToTopBtn = document.getElementById('scrollToTopBtn');
  
  if (scrollToTopBtn) {
    scrollToTopBtn.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
    
    // স্ক্রোল পজিশন অনুযায়ী বাটন শো/হাইড
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 300) {
        scrollToTopBtn.style.opacity = '1';
        scrollToTopBtn.style.visibility = 'visible';
      } else {
        scrollToTopBtn.style.opacity = '0';
        scrollToTopBtn.style.visibility = 'hidden';
      }
    });
  }
}

// ছবি লোড চেক ফাংশন
function checkImages() {
  const galleryImages = document.querySelectorAll('#certGallery img');
  const galleryFallback = document.getElementById('galleryFallback');
  
  if (galleryImages.length > 0) {
    let loadedCount = 0;
    
    galleryImages.forEach(img => {
      // ইমেজ লোড চেক
      if (img.complete && img.naturalWidth !== 0) {
        loadedCount++;
      } else {
        img.addEventListener('load', function() {
          loadedCount++;
          if (loadedCount === 0 && galleryFallback) {
            // কোন ছবি লোড হয়নি
            galleryFallback.classList.remove('hidden');
          }
        });
        
        img.addEventListener('error', function() {
          console.log('ছবি লোড ব্যর্থ:', this.src);
          // বিকল্প ছবি সেট করুন
          const index = Array.from(galleryImages).indexOf(this) + 1;
          this.src = `https://via.placeholder.com/300x200/1e40af/ffffff?text=Certificate+${index}`;
        });
      }
    });
    
    // সব চেক করার পর
    setTimeout(() => {
      if (loadedCount === 0 && galleryFallback) {
        galleryFallback.classList.remove('hidden');
      }
    }, 1000);
  }
}

// নোটিফিকেশন ফাংশন (ঐচ্ছিক)
function showNotification(message, type = 'info') {
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg transform transition-all duration-300 ${
    type === 'success' ? 'bg-green-500 text-white' : 
    type === 'error' ? 'bg-red-500 text-white' : 
    'bg-blue-500 text-white'
  }`;
  notification.textContent = message;
  
  // Add to body
  document.body.appendChild(notification);
  
  // Auto remove after 3 seconds
  setTimeout(() => {
    notification.style.opacity = '0';
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }, 3000);
}

// URL হ্যাশ পরিবর্তন হলে স্বয়ংক্রিয়ভাবে স্ক্রোল
window.addEventListener('hashchange', function() {
  const hash = window.location.hash;
  if (hash) {
    const targetElement = document.querySelector(hash);
    if (targetElement) {
      const headerHeight = document.querySelector('nav').offsetHeight;
      const targetPosition = targetElement.offsetTop - headerHeight - 20;
      
      setTimeout(() => {
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }, 100);
    }
  }
});

// পেজ লোড হলে হ্যাশ চেক করুন
if (window.location.hash) {
  setTimeout(() => {
    const hash = window.location.hash;
    const targetElement = document.querySelector(hash);
    if (targetElement) {
      const headerHeight = document.querySelector('nav').offsetHeight;
      const targetPosition = targetElement.offsetTop - headerHeight - 20;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  }, 500);
}