// Typing Animation
const typedTextSpan = document.querySelector('.typed-text');
const words = ['SOFTWARE ENGINEER', 'CYBERSECURITY ENTHUSIAST', 'STUDENT'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
        typedTextSpan.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typedTextSpan.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        setTimeout(type, 2000); // Wait before starting to delete
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(type, 500); // Wait before typing next word
    } else {
        setTimeout(type, isDeleting ? 100 : 200);
    }
}

// Start the typing animation when the page loads
document.addEventListener('DOMContentLoaded', () => {
    if (typedTextSpan) {
        setTimeout(type, 1000);
    }
});

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
}

// Add active class to nav links on scroll
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.scrollY + 100; // Add offset to account for navbar height
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').slice(1) === current) {
            item.classList.add('active');
        }
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        if (hamburger.classList.contains('active')) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        }

        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// CV Download functionality
const downloadCV = document.getElementById('downloadCV');

if (downloadCV) {
    downloadCV.addEventListener('click', function(e) {
        // Check if the file exists by making a HEAD request
        fetch(this.href)
            .then(response => {
                if (!response.ok) {
                    e.preventDefault();
                    alert('CV file is currently not available. Please try again later or contact me directly.');
                }
            })
            .catch(error => {
                e.preventDefault();
                console.error('Error checking CV file:', error);
                alert('Unable to download CV. Please try again later or contact me directly.');
            });
    });
}

// Project Section
const project = {
    title: "Project 1",
    description: "A responsive portfolio website built with HTML, CSS, and JavaScript.",
    image: "assets/projects/project1.jpg",
    technologies: ["HTML", "CSS", "JavaScript"],
    links: {
        github: "#",
        live: "#",
        demo: "#"
    }
};

// Update project content
document.addEventListener('DOMContentLoaded', () => {
    const projectItem = document.querySelector('.project-item');
    if (projectItem) {
        const projectImage = projectItem.querySelector('.project-image img');
        const title = projectItem.querySelector('.project-content h3');
        const description = projectItem.querySelector('.project-content p');
        const techContainer = projectItem.querySelector('.project-tech');
        const links = projectItem.querySelectorAll('.project-links a');

        projectImage.src = project.image;
        projectImage.alt = project.title;
        title.textContent = project.title;
        description.textContent = project.description;
        techContainer.innerHTML = project.technologies.map(tech => `<span>${tech}</span>`).join('');
        
        links[0].href = project.links.github;
        links[1].href = project.links.live;
        links[2].href = project.links.demo;
    }
});

// Add transition styles to elements
document.addEventListener('DOMContentLoaded', () => {
    const projectImage = document.querySelector('.project-image img');
    const title = document.querySelector('.project-content h3');
    const description = document.querySelector('.project-content p');
    const techContainer = document.querySelector('.project-tech');
    
    [projectImage, title, description, techContainer].forEach(element => {
        element.style.transition = 'opacity 0.3s ease';
    });
    
    if (typedTextSpan) {
        setTimeout(type, 1000);
    }
});

// Project Carousel
document.addEventListener('DOMContentLoaded', () => {
    // Project Data - Easy to update
    const projects = [
        {
            image: "assets/air.jpg",
            title: "Airline Management System",
            description: "A comprehensive airline ticket management system with booking, scheduling, and user management features.",
            github: "https://github.com/sumaiyalamgir/Airplane_ticket_management",
            technologies: ["Java", "MySQL", "JavaSwing"]
        },
        {
            image: "assets/clean.jpg",
            title: "Cleanit",
            description: "A modern cleaning service platform with service booking, user authentication, and payment integration.",
            github: "https://github.com/sumaiyalamgir/Cleanit",
            technologies: ["Bootstrap", "Java", "PostgreSQL"]
        },
        {
            image: "assets/doctor.jpg",
            title: "Doctor Appointment System",
            description: "A doctor appointment system with appointment booking, user authentication, and payment integration.",
            github: "#",
            technologies: ["JavaScript", "HTML", "CSS"]
        }
    ];

    const projectContainer = document.querySelector('.project-carousel');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.querySelector('.prev-project');
    const nextBtn = document.querySelector('.next-project');
    let currentIndex = 0;

    function updateProject(index) {
        // Create the project HTML
        const project = projects[index];
        const projectHTML = `
            <div class="project-item active">
                <div class="project-image">
                    <img src="${project.image}" alt="${project.title}">
                    <div class="project-overlay">
                        <div class="project-links">
                            <a href="${project.github}" target="_blank" title="View on GitHub">
                                <i class="fab fa-github"></i>
                            </a>
                        </div>
                    </div>
                </div>
                <div class="project-content">
                    <h3>${project.title}</h3>
                    <p class="project-description">${project.description}</p>
                    <div class="project-tech">
                        ${project.technologies.map(tech => `<span>${tech}</span>`).join('')}
                    </div>
                </div>
            </div>
        `;

        // Update the carousel
        projectContainer.innerHTML = projectHTML;

        // Update indicators
        indicators.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }

    function nextProject() {
        currentIndex = (currentIndex + 1) % projects.length;
        updateProject(currentIndex);
    }

    function prevProject() {
        currentIndex = (currentIndex - 1 + projects.length) % projects.length;
        updateProject(currentIndex);
    }

    // Event Listeners
    prevBtn.addEventListener('click', prevProject);
    nextBtn.addEventListener('click', nextProject);

    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            if (currentIndex === index) return;
            currentIndex = index;
            updateProject(currentIndex);
        });
    });

    // Initialize first project
    updateProject(0);
});