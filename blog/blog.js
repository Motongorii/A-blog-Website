// Blog Post Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Share buttons functionality
    const shareButtons = document.querySelectorAll('.share-buttons button');
    shareButtons.forEach(button => {
        button.addEventListener('click', function() {
            const postUrl = window.location.href;
            const postTitle = document.querySelector('.blog-post-header h1').textContent;

            switch(button.dataset.platform) {
                case 'facebook':
                    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`, 
                        'facebook-share', 'width=580,height=296');
                    break;
                case 'twitter':
                    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(postTitle)}&url=${encodeURIComponent(postUrl)}`,
                        'twitter-share', 'width=550,height=235');
                    break;
                case 'linkedin':
                    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl)}`,
                        'linkedin-share', 'width=600,height=400');
                    break;
                case 'email':
                    window.location.href = `mailto:?subject=${encodeURIComponent(postTitle)}&body=${encodeURIComponent(postUrl)}`;
                    break;
            }
        });
    });

    // Table of Contents generation
    const contentBody = document.querySelector('.content-body');
    const headings = contentBody.querySelectorAll('h2, h3');
    const tocContainer = document.querySelector('.table-of-contents');

    if (tocContainer && headings.length > 0) {
        const tocList = document.createElement('ul');
        headings.forEach((heading, index) => {
            // Add ID to heading if not present
            if (!heading.id) {
                heading.id = `section-${index + 1}`;
            }

            const listItem = document.createElement('li');
            const link = document.createElement('a');
            link.href = `#${heading.id}`;
            link.textContent = heading.textContent;
            link.classList.add(heading.tagName.toLowerCase());

            listItem.appendChild(link);
            tocList.appendChild(listItem);
        });
        tocContainer.appendChild(tocList);
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Reading time calculation
    function calculateReadingTime() {
        const text = contentBody.textContent;
        const wordCount = text.trim().split(/\s+/).length;
        const readingTime = Math.ceil(wordCount / 200); // Assuming 200 words per minute
        
        const readingTimeElement = document.querySelector('.reading-time');
        if (readingTimeElement) {
            readingTimeElement.textContent = `${readingTime} min read`;
        }
    }
    calculateReadingTime();

    // Progress bar
    const progressBar = document.querySelector('.progress-bar');
    if (progressBar) {
        window.addEventListener('scroll', () => {
            const winScroll = document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            progressBar.style.width = scrolled + '%';
        });
    }

    // Related posts hover effect
    const relatedCards = document.querySelectorAll('.related-card');
    relatedCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Resource link tracking
    const resourceLinks = document.querySelectorAll('.resource-links a');
    resourceLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // You can implement analytics tracking here
            console.log(`Resource clicked: ${this.textContent}`);
        });
    });
}); 