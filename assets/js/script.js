    // console.log('showProjects called with:', projects);
$(document).ready(function () {

    $('#menu').click(function () {
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');
    });

    $(window).on('scroll load', function () {
        $('#menu').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');

        if (window.scrollY > 60) {
            document.querySelector('#scroll-top').classList.add('active');
        } else {
            document.querySelector('#scroll-top').classList.remove('active');
        }

        // scroll spy
        $('section').each(function () {
            let height = $(this).height();
            let offset = $(this).offset().top - 200;
            let top = $(window).scrollTop();
            let id = $(this).attr('id');

            if (top > offset && top < offset + height) {
                $('.navbar ul li a').removeClass('active');
                $('.navbar').find(`[href="#${id}"]`).addClass('active');
            }
        });
    });

    // smooth scrolling
    $('a[href*="#"]').on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top,
        }, 500, 'linear')
    });

    // <!-- emailjs to mail contact form data -->
    $("#contact-form").submit(function (event) {
        emailjs.init("user_TTDmetQLYgWCLzHTDgqxm");

        emailjs.sendForm('contact_service', 'template_contact', '#contact-form')
            .then(function (response) {
                console.log('SUCCESS!', response.status, response.text);
                document.getElementById("contact-form").reset();
                alert("Form Submitted Successfully");
            }, function (error) {
                console.log('FAILED...', error);
                alert("Form Submission Failed! Try Again");
            });
        event.preventDefault();
    });
    // <!-- emailjs to mail contact form data -->

});

document.addEventListener('visibilitychange',
    function () {
        if (document.visibilityState === "visible") {
            document.title = "Portfolio | Shipra Mathur";
            $("#favicon").attr("href", "assets/images/icon.png");
        }
        else {
            document.title = "Come Back To Portfolio";
            $("#favicon").attr("href", "assets/images/icon.png");
        }
    });


// <!-- typed js effect starts -->
var typed = new Typed(".typing-text", {
    strings: ["machine leaning","frontend development", "backend development", "cloud engineering", "android development", "web development"],
    loop: true,
    typeSpeed: 50,
    backSpeed: 25,
    backDelay: 500,
});
// <!-- typed js effect ends -->
async function fetchData(type = "skills") {
    console.log('fetchData called with type:', type);
    let response;
    if (type === "skills") {
        response = await fetch("skills.json");
    } else {
        response = await fetch("projects/projects.json");
    }
    if (!response.ok) return [];
    const data = await response.json();
    return data;
}

// function showSkills(skills) {
//     let skillsContainer = document.getElementById("skillsContainer");
//     let skillHTML = "";
//         skills.forEach(skill => {
//                 skillHTML += `
//                 <div class="bar">
//                             <div class="info">
//                                 <span>${skill.name}</span>
//                             </div>
//                         </div>`
//         });
//     skillsContainer.innerHTML = skillHTML;
// }

// Pagination variables
let currentPage = 1;
const projectsPerPage = 6;

function showProjects(projects) {
        let projectsContainer = document.querySelector("#work .box-container");
        let paginationContainer = document.querySelector(".projects-pagination");
        if (!projectsContainer) return;
        if (!projects || projects.length === 0) {
                projectsContainer.innerHTML = "<p>No projects found.</p>";
                if (paginationContainer) paginationContainer.innerHTML = "";
                return;
        }
        let filteredProjects = projects.filter(project => project.category !== "android");
        let totalPages = Math.ceil(filteredProjects.length / projectsPerPage);
        if (currentPage > totalPages) currentPage = totalPages;
        if (currentPage < 1) currentPage = 1;
        let start = (currentPage - 1) * projectsPerPage;
        let end = start + projectsPerPage;
        let pageProjects = filteredProjects.slice(start, end);
        let projectHTML = "";
            pageProjects.forEach(project => {
                const viewLink = project.links && project.links.view ? project.links.view : '#';
                projectHTML += `
                <div class=\"grid-item\">
                    <div class=\"box tilt project-card\" style=\"min-width:320px;max-width:380px;width:100%;margin:1rem;display:flex;flex-direction:column;justify-content:space-between;height:260px;\">
                        <div class=\"content\" style=\"flex:1;display:flex;flex-direction:column;justify-content:center;align-items:center;\">
                            <div class=\"tag\" style=\"width:100%;text-align:center;\">
                                <h3>${project.name}</h3>
                            </div>
                            <div class=\"desc\" style=\"width:100%;text-align:center;margin:1rem 0;\">
                                <p>${project.desc}</p>
                            </div>
                            <div class=\"btns\" style=\"text-align:center;margin-top:auto;\">
                                <a href=\"${viewLink}\" class=\"btn\" target=\"_blank\"><i class=\"fas fa-eye\"></i> View</a>
                            </div>
                        </div>
                    </div>
                </div>`;
            });
        // Add empty grid items to keep pagination centered if less than 3 cards
        const cardsInRow = pageProjects.length;
        if (cardsInRow < 3) {
            for (let i = 0; i < 3 - cardsInRow; i++) {
                projectHTML += `<div class=\"grid-item\" style=\"visibility:hidden;\"></div>`;
            }
        }
        projectsContainer.innerHTML = projectHTML;

    // Pagination controls
        if (paginationContainer) {
            let pagHTML = "<div style='display:inline-block;'>";
            pagHTML += `<button class="prev-btn" style="margin:0 8px;padding:8px 16px;cursor:pointer;border-radius:4px;border:1px solid #ccc;background:#fff;color:#222;font-size:1rem;" ${currentPage === 1 ? 'disabled' : ''}>Prev</button>`;
            // Numbered buttons
            let maxPagesToShow = 5;
            let startPage = Math.max(1, currentPage - 2);
            let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
            if (endPage - startPage < maxPagesToShow - 1) {
                startPage = Math.max(1, endPage - maxPagesToShow + 1);
            }
            for (let i = startPage; i <= endPage; i++) {
                pagHTML += `<button class="page-btn${i === currentPage ? ' active' : ''}" data-page="${i}" style="margin:0 4px;padding:8px 16px;cursor:pointer;border-radius:4px;border:1px solid #ccc;background:${i === currentPage ? '#ffd700' : '#fff'};color:#222;font-size:1rem;">${i}</button>`;
            }
            if (endPage < totalPages) {
                pagHTML += `<span style='margin:0 4px;'>...</span>`;
                pagHTML += `<button class="page-btn" data-page="${totalPages}" style="margin:0 4px;padding:8px 16px;cursor:pointer;border-radius:4px;border:1px solid #ccc;background:${totalPages === currentPage ? '#ffd700' : '#fff'};color:#222;font-size:1rem;">${totalPages}</button>`;
            }
            pagHTML += `<button class="next-btn" style="margin:0 8px;padding:8px 16px;cursor:pointer;border-radius:4px;border:1px solid #ccc;background:#fff;color:#222;font-size:1rem;" ${currentPage === totalPages ? 'disabled' : ''}>Next</button>`;
            pagHTML += "</div>";
            paginationContainer.innerHTML = pagHTML;
            paginationContainer.onclick = function(e) {
                if (e.target.classList.contains('prev-btn') && currentPage > 1) {
                    currentPage--;
                    showProjects(window.allProjects);
                }
                if (e.target.classList.contains('next-btn') && currentPage < totalPages) {
                    currentPage++;
                    showProjects(window.allProjects);
                }
                if (e.target.classList.contains('page-btn')) {
                    let page = parseInt(e.target.getAttribute('data-page'));
                    if (!isNaN(page) && page !== currentPage) {
                        currentPage = page;
                        showProjects(window.allProjects);
                    }
                }
            };
    }

    // Tilt effect
    if (window.VanillaTilt) {
        VanillaTilt.init(document.querySelectorAll(".tilt"), {
            max: 15,
        });
    }

    // Scroll reveal
    if (window.ScrollReveal) {
        const srtop = ScrollReveal({
            origin: 'top',
            distance: '80px',
            duration: 1000,
            reset: true
        });
        srtop.reveal('.work .box', { interval: 200 });
    }
}

document.addEventListener("DOMContentLoaded", function() {
    fetchData().then(data => {
        showSkills(data);
    });
    fetchData("projects").then(data => {
        window.allProjects = data;
        showProjects(window.allProjects);
    // Pagination click handler is now managed inside showProjects for correct state
    });

});
// pre loader start
// function loader() {
//     document.querySelector('.loader-container').classList.add('fade-out');
// }
// function fadeOut() {
//     setInterval(loader, 500);
// }
// window.onload = fadeOut;
// pre loader end

// diMathur developer mode
document.onkeydown = function (e) {
    if (e.keyCode == 123) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
        return false;
    }
}

// Start of Tawk.to Live Chat
var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
(function () {
    var s1 = document.createElement("script"), s0 = document.getElementsByTagName("script")[0];
    s1.async = true;
    s1.src = 'https://embed.tawk.to/60df10bf7f4b000ac03ab6a8/1f9jlirg6';
    s1.charset = 'UTF-8';
    s1.setAttribute('crossorigin', '*');
    s0.parentNode.insertBefore(s1, s0);
})();
// End of Tawk.to Live Chat


/* ===== SCROLL REVEAL ANIMATION ===== */
const srtop = ScrollReveal({
    origin: 'top',
    distance: '80px',
    duration: 1000,
    reset: true
});

/* SCROLL HOME */
srtop.reveal('.home .content h3', { delay: 200 });
srtop.reveal('.home .content p', { delay: 200 });
srtop.reveal('.home .content .btn', { delay: 200 });

srtop.reveal('.home .image', { delay: 400 });
srtop.reveal('.home .linkedin', { interval: 600 });
srtop.reveal('.home .github', { interval: 800 });
srtop.reveal('.home .twitter', { interval: 1000 });
srtop.reveal('.home .telegram', { interval: 600 });
srtop.reveal('.home .instagram', { interval: 600 });
srtop.reveal('.home .dev', { interval: 600 });

/* SCROLL ABOUT */
srtop.reveal('.about .content h3', { delay: 200 });
srtop.reveal('.about .content .tag', { delay: 200 });
srtop.reveal('.about .content p', { delay: 200 });
srtop.reveal('.about .content .box-container', { delay: 200 });
srtop.reveal('.about .content .resumebtn', { delay: 200 });


/* SCROLL SKILLS */
srtop.reveal('.skills .container', { interval: 200 });
srtop.reveal('.skills .container .bar', { delay: 400 });

/* SCROLL EDUCATION */
srtop.reveal('.education .box', { interval: 200 });

/* SCROLL PROJECTS */
srtop.reveal('.work .box', { interval: 200 });

/* SCROLL EXPERIENCE */
srtop.reveal('.experience .timeline', { delay: 400 });
srtop.reveal('.experience .timeline .container', { interval: 400 });

/* SCROLL CONTACT */
srtop.reveal('.contact .container', { delay: 400 });
// ...existing code...
srtop.reveal('.contact .container .form-group', { delay: 400 });
