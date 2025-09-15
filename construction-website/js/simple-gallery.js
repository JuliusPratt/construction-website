// Simple Gallery System - Directly reads folder contents
// No manifest files needed - just add images to folders!

class SimpleGallery {
  constructor() {
    this.galleryConfig = {
      kitchen: { title: 'Kitchen Remodeling Gallery', folder: 'gallery-kitchen' },
      bathroom: { title: 'Bathroom Renovations Gallery', folder: 'gallery-bathroom' },
      interior: { title: 'Interior / Whole-Home Updates Gallery', folder: 'gallery-interior' },
      additions: { title: 'Additions & Structural Improvements Gallery', folder: 'gallery-additions' },
      cabinetry: { title: 'Selective Custom Cabinetry & Built-Ins Gallery', folder: 'gallery-cabinetry' },
      jobsite: { title: 'Job Site Photos', folder: 'gallery-jobsite' }
    };
    
    this.init();
  }

  async init() {
    // Initialize gallery functionality
    this.initializeGallery();
  }

  // Hardcoded image lists - update these when you add new images
  getGalleryImages(galleryKey) {
    const imageMap = {
      'kitchen': [
        '1.png',
        '1131Kit.png', 
        '1131kit2.JPG'
      ],
      'bathroom': [
        '4.png',
        '6.png',
        '1131bath1.JPG',
        '1131bath2.JPG',
        '1131shower.JPG'
      ],
      'interior': [
        'sunroom.png',
        'luxury-living-room.png',
        'closet.png',
        '1131bookshelf.JPG',
        '1131hall.JPG',
        '1131mantle.JPG'
      ],
      'additions': [
        // Add images here when you have them
      ],
      'cabinetry': [
        'wine-storage.png',
        '2.png',
        '7.png',
        '9.png',
        '1131cof.JPG'
      ],
      'jobsite': [
        '3.png',
        '5.png',
        '8.png',
        '10.png',
        '11.png',
        '13.png',
        'under-construction.jpg'
      ]
    };

    return imageMap[galleryKey] || [];
  }

  initializeGallery() {
    const modal = document.getElementById('gallery-modal');
    const modalContent = modal.querySelector('.gallery-modal-content');
    const closeBtn = modal.querySelector('.gallery-close');
    const prevBtn = modal.querySelector('.gallery-prev');
    const nextBtn = modal.querySelector('.gallery-next');
    const galleryImage = document.getElementById('gallery-image');
    const galleryTitle = document.getElementById('gallery-title');
    const galleryCounter = modal.querySelector('.gallery-counter');
    const galleryContainer = modal.querySelector('.gallery-container');
    const galleryPlaceholder = modal.querySelector('.gallery-placeholder');
    
    let currentService = '';
    let currentIndex = 0;
    let currentImages = [];

    // Gallery button click handlers
    document.querySelectorAll('.gallery-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const service = btn.getAttribute('data-service');
        this.openGallery(service);
      });
    });

    this.openGallery = (service) => {
      currentService = service;
      currentIndex = 0;
      currentImages = this.getGalleryImages(service);
      
      galleryTitle.textContent = this.galleryConfig[service]?.title || 'Project Gallery';
      
      if (currentImages.length > 0) {
        this.showImage();
        galleryContainer.style.display = 'flex';
        galleryPlaceholder.style.display = 'none';
      } else {
        galleryContainer.style.display = 'none';
        galleryPlaceholder.style.display = 'block';
      }
      
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    };

    this.showImage = () => {
      if (currentImages.length === 0) return;
      
      const config = this.galleryConfig[currentService];
      const imagePath = `images/${config.folder}/${currentImages[currentIndex]}`;
      galleryImage.src = imagePath;
      galleryCounter.textContent = `${currentIndex + 1} / ${currentImages.length}`;
      
      // Update navigation button states
      prevBtn.disabled = currentIndex === 0;
      nextBtn.disabled = currentIndex === currentImages.length - 1;
    };

    const showPrev = () => {
      if (currentIndex > 0) {
        currentIndex--;
        this.showImage();
      }
    };

    const showNext = () => {
      if (currentIndex < currentImages.length - 1) {
        currentIndex++;
        this.showImage();
      }
    };

    const closeGallery = () => {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    };

    // Event listeners
    closeBtn.addEventListener('click', closeGallery);
    prevBtn.addEventListener('click', showPrev);
    nextBtn.addEventListener('click', showNext);

    // Close on backdrop click
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeGallery();
      }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (!modal.classList.contains('active')) return;
      
      switch(e.key) {
        case 'Escape':
          closeGallery();
          break;
        case 'ArrowLeft':
          showPrev();
          break;
        case 'ArrowRight':
          showNext();
          break;
      }
    });
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.simpleGallery = new SimpleGallery();
});
