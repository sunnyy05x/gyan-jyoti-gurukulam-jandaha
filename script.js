/* ===========================
   Gyan Jyoti Gurukulam Public School - 3D Interactive Website
   JavaScript with Three.js, Particles, Animations
   =========================== */

(function () {
    'use strict';

    // ===========================
    // Loading Screen
    // ===========================
    window.addEventListener('load', () => {
        setTimeout(() => {
            document.getElementById('loader').classList.add('hidden');
        }, 2500);
    });

    // ===========================
    // Three.js 3D Background
    // ===========================
    function init3DBackground() {
        const canvas = document.getElementById('bg-canvas');
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });

        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        // Helper to create a book
        function createBook() {
            const group = new THREE.Group();
            
            // Book cover
            const coverGeo = new THREE.BoxGeometry(2, 2.5, 0.4);
            const coverMat = new THREE.MeshPhongMaterial({
                color: new THREE.Color().setHSL(Math.random(), 0.6, 0.6),
                roughness: 0.7,
                metalness: 0.1
            });
            const cover = new THREE.Mesh(coverGeo, coverMat);
            
            // Book pages
            const pagesGeo = new THREE.BoxGeometry(1.9, 2.4, 0.35);
            const pagesMat = new THREE.MeshPhongMaterial({ color: 0xffffff });
            const pages = new THREE.Mesh(pagesGeo, pagesMat);
            pages.position.x = 0.05; // slightly offset pages
            
            group.add(cover);
            group.add(pages);
            return group;
        }

        // Helper to create a lab flask
        function createFlask() {
            const group = new THREE.Group();
            
            const glassMat = new THREE.MeshPhysicalMaterial({
                color: 0xffffff,
                metalness: 0.1,
                roughness: 0.1,
                transmission: 0.9,
                transparent: true,
                opacity: 0.4
            });
            
            const liquidColor = new THREE.Color().setHSL(Math.random(), 0.7, 0.6);
            const liquidMat = new THREE.MeshPhongMaterial({ color: liquidColor, transparent: true, opacity: 0.8 });
            
            // Base layout
            const baseGeo = new THREE.CylinderGeometry(0.4, 1.2, 1.5, 32);
            const base = new THREE.Mesh(baseGeo, glassMat);
            base.position.y = -0.5;
            
            const liquidGeo = new THREE.CylinderGeometry(0.5, 1.15, 1.1, 32);
            const liquid = new THREE.Mesh(liquidGeo, liquidMat);
            liquid.position.y = -0.65;
            
            const neckGeo = new THREE.CylinderGeometry(0.4, 0.4, 1, 32);
            const neck = new THREE.Mesh(neckGeo, glassMat);
            neck.position.y = 0.75;
            
            const rimGeo = new THREE.TorusGeometry(0.45, 0.08, 16, 32);
            const rim = new THREE.Mesh(rimGeo, glassMat);
            rim.position.y = 1.25;
            rim.rotation.x = Math.PI / 2;
            
            group.add(base);
            group.add(liquid);
            group.add(neck);
            group.add(rim);
            
            return group;
        }

        // Helper to create a pencil
        function createPencil() {
            const group = new THREE.Group();
            
            const bodyGeo = new THREE.CylinderGeometry(0.2, 0.2, 2.5, 6);
            const bodyMat = new THREE.MeshPhongMaterial({ color: 0xfbd065 });
            const body = new THREE.Mesh(bodyGeo, bodyMat);
            
            const woodGeo = new THREE.CylinderGeometry(0.05, 0.2, 0.6, 6);
            const woodMat = new THREE.MeshPhongMaterial({ color: 0xeecba6 });
            const wood = new THREE.Mesh(woodGeo, woodMat);
            wood.position.y = -1.55;
            
            const graphiteGeo = new THREE.CylinderGeometry(0.01, 0.05, 0.2, 6);
            const graphiteMat = new THREE.MeshPhongMaterial({ color: 0x333333 });
            const graphite = new THREE.Mesh(graphiteGeo, graphiteMat);
            graphite.position.y = -1.95;
            
            const metalGeo = new THREE.CylinderGeometry(0.21, 0.21, 0.3, 16);
            const metalMat = new THREE.MeshStandardMaterial({ color: 0xaaaaaa, metalness: 0.8, roughness: 0.2 });
            const metal = new THREE.Mesh(metalGeo, metalMat);
            metal.position.y = 1.4;
            
            const eraserGeo = new THREE.CylinderGeometry(0.2, 0.2, 0.4, 16);
            const eraserMat = new THREE.MeshPhongMaterial({ color: 0xff6666 });
            const eraser = new THREE.Mesh(eraserGeo, eraserMat);
            eraser.position.y = 1.7;
            
            group.add(body);
            group.add(wood);
            group.add(graphite);
            group.add(metal);
            group.add(eraser);
            
            return group;
        }

        // Helper to create an atom
        function createAtom() {
            const group = new THREE.Group();
            
            const coreGeo = new THREE.SphereGeometry(0.4, 32, 32);
            const coreMat = new THREE.MeshPhongMaterial({ color: 0xff5555 });
            const core = new THREE.Mesh(coreGeo, coreMat);
            group.add(core);

            const electronMat = new THREE.MeshPhongMaterial({ color: 0x5555ff });
            const ringMat = new THREE.MeshBasicMaterial({ color: 0xaaaaaa, transparent: true, opacity: 0.3 });
            
            for (let i = 0; i < 3; i++) {
                const ringGeo = new THREE.TorusGeometry(1.5, 0.02, 16, 64);
                const ring = new THREE.Mesh(ringGeo, ringMat);
                
                ring.rotation.x = Math.random() * Math.PI;
                ring.rotation.y = Math.random() * Math.PI;
                
                const electronGeo = new THREE.SphereGeometry(0.1, 16, 16);
                const electron = new THREE.Mesh(electronGeo, electronMat);
                electron.position.x = 1.5;
                
                const orbit = new THREE.Group();
                orbit.rotation.x = ring.rotation.x;
                orbit.rotation.y = ring.rotation.y;
                orbit.add(electron);
                
                group.add(ring);
                group.add(orbit);
                
                if (!group.userData.orbits) group.userData.orbits = [];
                group.userData.orbits.push({
                    obj: orbit,
                    speed: Math.random() * 0.05 + 0.02
                });
            }
            
            return group;
        }

        // Create functional school meshes
        const meshes = [];

        function addMesh(mesh, scaleFactor = 1) {
            mesh.position.set(
                (Math.random() - 0.5) * 80,
                (Math.random() - 0.5) * 100,
                (Math.random() - 0.5) * 40 - 20
            );
            mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
            
            const scale = (Math.random() * 0.6 + 0.6) * scaleFactor;
            mesh.scale.set(scale, scale, scale);

            mesh.userData = {
                rotSpeed: { x: (Math.random() - 0.5) * 0.01, y: (Math.random() - 0.5) * 0.01 },
                floatSpeed: Math.random() * 0.002 + 0.001,
                floatOffset: Math.random() * Math.PI * 2,
                originalY: mesh.position.y,
                orbits: mesh.userData.orbits || null
            };
            
            scene.add(mesh);
            meshes.push(mesh);
        }

        for (let i = 0; i < 15; i++) addMesh(createBook(), 1);
        for (let i = 0; i < 12; i++) addMesh(createFlask(), 0.8);
        for (let i = 0; i < 12; i++) addMesh(createPencil(), 0.8);
        for (let i = 0; i < 8; i++) addMesh(createAtom(), 0.9);

        // Floating particles (stars)
        const particleGeo = new THREE.BufferGeometry();
        const particleCount = 500;
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);

        for (let i = 0; i < particleCount; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 60;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 40;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 40 - 10;

            const color = new THREE.Color().setHSL(0.1 + Math.random() * 0.1, 0.8, 0.6 + Math.random() * 0.3);
            colors[i * 3] = color.r;
            colors[i * 3 + 1] = color.g;
            colors[i * 3 + 2] = color.b;
        }

        particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        const particleMat = new THREE.PointsMaterial({
            size: 0.08,
            vertexColors: true,
            transparent: true,
            opacity: 0.6,
            sizeAttenuation: true
        });

        const particles = new THREE.Points(particleGeo, particleMat);
        scene.add(particles);

        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffb4a2, 0.4);
        scene.add(ambientLight);

        const pointLight1 = new THREE.PointLight(0xffb4a2, 0.6, 50);
        pointLight1.position.set(10, 10, 10);
        scene.add(pointLight1);

        const pointLight2 = new THREE.PointLight(0x749bc2, 0.5, 50);
        pointLight2.position.set(-10, -10, 10);
        scene.add(pointLight2);

        camera.position.z = 15;

        // Mouse interaction
        let mouseX = 0, mouseY = 0;
        let targetX = 0, targetY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = (e.clientX / window.innerWidth) * 2 - 1;
            mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
        });

        // Animation loop
        const clock = new THREE.Clock();

        function animate() {
            requestAnimationFrame(animate);
            const elapsed = clock.getElapsedTime();

            targetX += (mouseX * 2 - targetX) * 0.02;
            targetY += (mouseY * 2 - targetY) * 0.02;

            camera.position.x = targetX;
            camera.position.y = targetY;
            camera.lookAt(scene.position);

            // Animate meshes
            const scrollY = window.scrollY;
            meshes.forEach(mesh => {
                mesh.rotation.x += mesh.userData.rotSpeed.x;
                mesh.rotation.y += mesh.userData.rotSpeed.y;
                
                // Floating movement + scroll parallax
                const floatY = Math.sin(elapsed * mesh.userData.floatSpeed * 100 + mesh.userData.floatOffset) * 0.5;
                const scrollOffset = scrollY * 0.05;
                mesh.position.y = mesh.userData.originalY + floatY + scrollOffset;

                // Animate atom orbits
                if (mesh.userData.orbits) {
                    mesh.userData.orbits.forEach(orbitData => {
                        orbitData.obj.rotation.z += orbitData.speed;
                    });
                }
            });

            // Rotate particles slowly
            particles.rotation.y += 0.0003;
            particles.rotation.x += 0.0001;

            renderer.render(scene, camera);
        }

        animate();

        // Resize handler
        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });
    }

    init3DBackground();

    // ===========================
    // DOM Particles Overlay
    // ===========================
    function createParticles() {
        const overlay = document.getElementById('particles-overlay');
        const count = 30;

        for (let i = 0; i < count; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 4 + 2}px;
                height: ${Math.random() * 4 + 2}px;
                background: radial-gradient(circle, rgba(185, 28, 28, ${Math.random() * 0.4 + 0.1}), transparent);
                border-radius: 50%;
                top: ${Math.random() * 100}%;
                left: ${Math.random() * 100}%;
                animation: particleFloat ${Math.random() * 15 + 10}s ease-in-out infinite ${Math.random() * -15}s;
                pointer-events: none;
            `;
            overlay.appendChild(particle);
        }

        // Add animation keyframes
        const style = document.createElement('style');
        style.textContent = `
            @keyframes particleFloat {
                0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.3; }
                25% { transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * -100}px) scale(1.5); opacity: 0.7; }
                50% { transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * -200}px) scale(1); opacity: 0.5; }
                75% { transform: translate(${Math.random() * 50 - 25}px, ${Math.random() * -100}px) scale(1.3); opacity: 0.6; }
            }
        `;
        document.head.appendChild(style);
    }

    createParticles();

    // ===========================
    // Navbar Scroll Effect
    // ===========================
    const navbar = document.getElementById('navbar');
    const backToTop = document.getElementById('backToTop');
    const sections = document.querySelectorAll('.section, .hero-section');
    const navLinks = document.querySelectorAll('.nav-link');

    function handleScroll() {
        const scrollY = window.scrollY;

        // Navbar background
        if (scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Back to top
        if (scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }

        // Active nav link
        sections.forEach(section => {
            const top = section.offsetTop - 150;
            const bottom = top + section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollY >= top && scrollY < bottom) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('data-section') === id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ===========================
    // Mobile Navigation
    // ===========================
    const navToggle = document.getElementById('navToggle');
    const navLinksContainer = document.getElementById('navLinks');

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navLinksContainer.classList.toggle('active');
    });

    navLinksContainer.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navLinksContainer.classList.remove('active');
        });
    });

    // ===========================
    // Scroll Reveal (AOS-like)
    // ===========================
    function revealElements() {
        const elements = document.querySelectorAll('[data-aos]');
        elements.forEach(el => {
            const rect = el.getBoundingClientRect();
            const delay = parseInt(el.getAttribute('data-aos-delay')) || 0;

            if (rect.top < window.innerHeight * 0.85) {
                setTimeout(() => {
                    el.classList.add('aos-animate');
                }, delay);
            }
        });
    }

    window.addEventListener('scroll', revealElements);
    window.addEventListener('load', revealElements);

    // ===========================
    // Counter Animation
    // ===========================
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        let animated = false;

        function checkCounters() {
            if (animated) return;

            counters.forEach(counter => {
                const rect = counter.getBoundingClientRect();
                if (rect.top < window.innerHeight * 0.9) {
                    animated = true;
                    const target = parseInt(counter.getAttribute('data-count'));
                    const duration = 2000;
                    const start = performance.now();

                    function update(now) {
                        const elapsed = now - start;
                        const progress = Math.min(elapsed / duration, 1);
                        const eased = 1 - Math.pow(1 - progress, 4); // easeOutQuart
                        const current = Math.round(eased * target);
                        counter.textContent = current;

                        if (progress < 1) {
                            requestAnimationFrame(update);
                        }
                    }

                    requestAnimationFrame(update);
                }
            });
        }

        window.addEventListener('scroll', checkCounters);
        checkCounters();
    }

    animateCounters();

    // ===========================
    // 3D Tilt Card Effect
    // ===========================
    function initTiltCards() {
        if (window.innerWidth <= 768) return;

        const cards = document.querySelectorAll('.tilt-card');

        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = (y - centerY) / centerY * -8;
                const rotateY = (x - centerX) / centerX * 8;

                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
            });
        });
    }

    initTiltCards();

    // ===========================
    // Gallery Lightbox
    // ===========================
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxClose = document.querySelector('.lightbox-close');
    const galleryItems = document.querySelectorAll('.gallery-item');

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            lightboxImg.src = img.src;
            lightboxImg.alt = img.alt;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeLightbox();
    });

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    // ===========================
    // Contact Form
    // ===========================
    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const btn = contactForm.querySelector('button[type="submit"]');
        const originalText = btn.innerHTML;

        btn.innerHTML = '<span>Sending...</span><i class="fas fa-spinner fa-spin"></i>';
        btn.disabled = true;

        setTimeout(() => {
            btn.innerHTML = '<span>Message Sent!</span><i class="fas fa-check"></i>';
            btn.style.background = 'linear-gradient(135deg, #4CAF50, #45a049)';

            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.background = '';
                btn.disabled = false;
                contactForm.reset();
            }, 3000);
        }, 1500);
    });

    // ===========================
    // Smooth Scroll for anchor links
    // ===========================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // ===========================
    // Parallax on Scroll
    // ===========================
    function parallaxScroll() {
        const scrollY = window.scrollY;

        // Hero floating shapes parallax
        const shapes = document.querySelectorAll('.shape');
        shapes.forEach((shape, i) => {
            const speed = 0.1 + i * 0.03;
            shape.style.transform = `translateY(${scrollY * speed}px)`;
        });

        // Hero content parallax
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.transform = `translateY(${scrollY * 0.3}px)`;
            heroContent.style.opacity = 1 - scrollY / 800;
        }
    }

    window.addEventListener('scroll', parallaxScroll);

    // ===========================
    // Magnetic effect on buttons
    // ===========================
    if (window.innerWidth > 768) {
        document.querySelectorAll('.btn, .nav-cta').forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
            });

            btn.addEventListener('mouseleave', () => {
                btn.style.transform = '';
            });
        });
    }

    // ===========================
    // Typewriter effect for hero badge
    // ===========================
    function typewriter() {
        const badge = document.querySelector('.hero-badge span');
        if (!badge) return;

        const text = badge.textContent;
        badge.textContent = '';
        let i = 0;

        function type() {
            if (i < text.length) {
                badge.textContent += text.charAt(i);
                i++;
                setTimeout(type, 50);
            }
        }

        setTimeout(type, 2500);
    }

    typewriter();

    // ===========================
    // Intersection Observer for section animations
    // ===========================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.section').forEach(section => {
        section.style.opacity = '1';
        sectionObserver.observe(section);
    });

    // ===========================
    // Fetch Announcements from Google Sheets
    // ===========================
    async function fetchAnnouncements() {
        const sheetId = '1z9y7QYB6MYjXU_R3RBfklQmnx4jWX5ATuo9LRaDxPY4';
        const gid = '1072262507';
        const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json&gid=${gid}`;
        const listContainer = document.getElementById('announcement-list');

        if (!listContainer) return;

        try {
            const response = await fetch(url);
            let dataText = await response.text();
            
            // Remove Google's wrapping function to parse JSON
            const jsonString = dataText.substring(dataText.indexOf('{'), dataText.lastIndexOf('}') + 1);
            const data = JSON.parse(jsonString);

            // Google Sheets visualization API returns data in table.rows
            const rows = data.table.rows;
            listContainer.innerHTML = ''; // Clear loading spinner

            if (!rows || rows.length === 0) {
                listContainer.innerHTML = `
                    <div class="empty-state">
                        <i class="fas fa-folder-open"></i>
                        <p>No recent announcements at this time.</p>
                    </div>
                `;
                return;
            }

            let hasValidNotices = false;

            rows.forEach((row, index) => {
                // In some cases, gviz includes header in rows, but we can check if it's 'Date'
                const dateCell = row.c[0]?.f || row.c[0]?.v || '';
                const titleCell = row.c[1]?.v || '';
                const descCell = row.c[2]?.v || ''; // Extraction of Description column
                
                if (!dateCell || !titleCell || titleCell === 'Title' || dateCell === 'Date') return;

                hasValidNotices = true;

                // Parse date (Assuming format like "2026-04-25" or "April 25, 2026" or "25-Apr-2026")
                let day = '--';
                let month = '---';
                
                // Try to format date
                try {
                    let d = new Date(dateCell);
                    if (!isNaN(d.getTime())) {
                        day = d.getDate().toString().padStart(2, '0');
                        month = d.toLocaleString('default', { month: 'short' });
                    } else {
                        // Fallback string extraction if date parsing fails
                        const parts = dateCell.toString().split(/[-\s/]/);
                        if (parts.length >= 2) {
                            day = parts[0].substring(0, 2);
                            month = parts[1].substring(0, 3);
                        } else {
                            day = dateCell.substring(0, 2);
                            month = 'N/A';
                        }
                    }
                } catch(e) { }

                const item = document.createElement('div');
                item.className = 'announcement-item';
                item.innerHTML = `
                    <div class="announcement-date">
                        <span class="day">${day}</span>
                        <span class="month">${month}</span>
                    </div>
                    <div class="announcement-details">
                        <h4 class="announcement-title">${titleCell}</h4>
                        ${descCell ? `<p class="announcement-desc">${descCell}</p>` : ''}
                        <div class="announcement-meta">
                            <span><i class="far fa-clock"></i> Posted Recently</span>
                        </div>
                    </div>
                `;
                listContainer.appendChild(item);
            });

            if (!hasValidNotices) {
                listContainer.innerHTML = `
                    <div class="empty-state">
                        <i class="fas fa-folder-open"></i>
                        <p>No recent announcements at this time.</p>
                    </div>
                `;
            }

        } catch (error) {
            console.error('Error fetching announcements:', error);
            listContainer.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-exclamation-circle" style="color: #F97316;"></i>
                    <p>Failed to load announcements. Please try again later.</p>
                </div>
            `;
        }
    }

    fetchAnnouncements();

    console.log('🎓 Gyan Jyoti Gurukulam Public School - Singhara, Vaishali | Website Loaded Successfully');

})();
