document.addEventListener('DOMContentLoaded', function() {

            // ---- Create Stars ----
            function createStars() {
                const container = document.getElementById('stars');
                for (let i = 0; i < 50; i++) {
                    const star = document.createElement('div');
                    star.classList.add('star');
                    star.style.left = Math.random() * 100 + '%';
                    star.style.top = Math.random() * 100 + '%';
                    star.style.width = (Math.random() * 3 + 1) + 'px';
                    star.style.height = star.style.width;
                    star.style.animationDelay = (Math.random() * 5) + 's';
                    star.style.animationDuration = (Math.random() * 3 + 2) + 's';
                    star.style.opacity = Math.random() * 0.5 + 0.1;
                    container.appendChild(star);
                }
            }
            createStars();

            // ---- Card Hover: 3D Tilt (Desktop) ----
            const card = document.querySelector('.business-card');
            if (window.innerWidth > 768) {
                let isAnimating = false;

                card.addEventListener('mousemove', function(e) {
                    if (isAnimating) return;
                    const rect = this.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;
                    const rotateY = ((x - centerX) / centerX) * 4.5;
                    const rotateX = ((centerY - y) / centerY) * 4.5;

                    this.style.transform =
                        `perspective(800px) rotateY(${rotateY}deg) rotateX(${rotateX}deg) scale(1.01)`;
                    this.style.transition = 'transform 0.1s ease-out';
                });

                card.addEventListener('mouseleave', function() {
                    isAnimating = true;
                    this.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg) scale(1)';
                    this.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
                    setTimeout(() => { isAnimating = false; }, 600);
                });
            }

            // ---- Social Links: Prevent Card Interaction ----
            document.querySelectorAll('.social a').forEach(link => {
                link.addEventListener('click', function(e) {
                    e.stopPropagation();
                });
            });

        });
