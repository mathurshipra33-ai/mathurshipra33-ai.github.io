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
    });
});

document.addEventListener('visibilitychange',
    function () {
        if (document.visibilityState === "visible") {
            document.title = "Projects | Portfolio Shipra Mathur";
            $("#favicon").attr("href", "/assets/images/favicon.png");
        }
        else {
            document.title = "Come Back To Portfolio";
            $("#favicon").attr("href", "/assets/images/favhand.png");
        }
    });


// fetch projects start
function getProjects() {
    return fetch("./projects/projects.json")
        .then(response => response.json())
        .then(data => {
            return data
        });
}


// Pagination logic for projects
let currentPage = 1;
const projectsPerPage = 6;
let allProjects = [];

function renderPagination(totalPages) {
        const paginationContainer = document.querySelector(".projects-pagination");
        if (!paginationContainer) return;
        let html = '';
        html += `<button id="prevPage" ${currentPage === 1 ? 'disabled' : ''}>Previous</button>`;
        html += `<span> Page ${currentPage} of ${totalPages} </span>`;
        html += `<button id="nextPage" ${currentPage === totalPages ? 'disabled' : ''}>Next</button>`;
        paginationContainer.innerHTML = html;

        document.getElementById("prevPage").onclick = function() {
                if (currentPage > 1) {
                        currentPage--;
                        showProjects(allProjects);
                }
        };
        document.getElementById("nextPage").onclick = function() {
                if (currentPage < totalPages) {
                        currentPage++;
                        showProjects(allProjects);
                }
        };
}

function showProjects(projects) {
        let projectsContainer = document.querySelector(".work .box-container");
        let start = (currentPage - 1) * projectsPerPage;
        let end = start + projectsPerPage;
        let paginatedProjects = projects.slice(start, end);
        let projectsHTML = "";
        paginatedProjects.forEach(project => {
                projectsHTML += `
                <div class="grid-item">
                <div class="box tilt" style="width: 380px; margin: 1rem">
            <div class="content">
                <div class="tag">
                <h3>${project.title}</h3>
                </div>
                <div class="desc">
                    <p>${project.description}</p>
                    <div class="btns">
                        <a href="${project.demo}" class="btn" target="_blank"><i class="fas fa-eye"></i> View</a>
                </div>
            </div>
        </div>
        </div>`
        });
        projectsContainer.innerHTML = projectsHTML;

        // Render pagination controls
        let totalPages = Math.ceil(projects.length / projectsPerPage);
        renderPagination(totalPages);
}

getProjects().then(data => {
        allProjects = data;
        showProjects(allProjects);
});

// Add a container for pagination controls below the projects grid
document.addEventListener('DOMContentLoaded', function() {
    let workSection = document.querySelector('.work');
    if (workSection && !document.querySelector('.projects-pagination')) {
        let paginationDiv = document.createElement('div');
        paginationDiv.className = 'projects-pagination';
        paginationDiv.style = 'text-align:center;margin:2rem 0;';
        workSection.appendChild(paginationDiv);
    }
});
// fetch projects end

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