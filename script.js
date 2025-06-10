// Function for burger button click
document.querySelector("#btn-1").addEventListener("click", function () {
    const menu = document.querySelector("#menu");
    // Toggle the display property between 'flex' and 'none'
    menu.style.display = menu.style.display === "flex" ? "none" : "flex";
});

// Function to change active class when clicked on menu links
document.addEventListener("DOMContentLoaded", function() {
    const menu = document.querySelector("#menu");

    if (menu) { // Ensure menu element exists
        menu.addEventListener("click", function(event) {
            // Check if the clicked element is an <a> tag
            if (event.target.tagName === "A") {
                // Remove 'active' class from all links
                menu.querySelectorAll("a").forEach(link => {
                    link.classList.remove("active");
                    link.style.color = "black"; // Also reset color for consistency
                });
                // Add 'active' class to the clicked link
                event.target.classList.add("active");
                event.target.style.color = "red"; // Set active color

                // For small devices, hide the menu after clicking a link
                if (window.innerWidth <= 712) {
                    menu.style.display = "none";
                } else (window.innerWidth >= 712);{
                    menu.style.display = "flex";
                }
                
            }
        });
    }
});

// Function on scroll for progress bars and active navigation links
window.addEventListener('scroll', function() {
    const sP = window.scrollY;

    // Skill bar animations
    const skillBars = {
        'p-bk': document.querySelector('.p-bk'),
        'p-css': document.querySelector('.p-css'),
        'p-js': document.querySelector('.p-js'),
        'p-bs': document.querySelector('.p-bs'),
        'p-jq': document.querySelector('.p-jq'),
    };

    const targetWidths = {
        'p-bk': '90%',
        'p-css': '85%',
        'p-js': '70%',
        'p-bs': '80%',
        'p-jq': '85%',
    };

    // Animate skill bars when in view
    // Adjust these scroll values if your layout changes significantly
    if (sP >= 555 && sP <= 1450) {
        for (const className in skillBars) {
            if (skillBars[className]) { // Check if element exists
                skillBars[className].style.width = targetWidths[className];
            }
        }
    } else { // Reset widths when out of view
        for (const className in skillBars) {
            if (skillBars[className]) { // Check if element exists
                skillBars[className].style.width = '0%';
            }
        }
    }

    // Function for scroll active navigation
    const navLinks = document.querySelectorAll("#menu li a");
    const sections = [
        { id: 'home', linkIndex: 0, start: 0, end: 639 },
        { id: 'about', linkIndex: 1, start: 640, end: 1599 },
        { id: 'goals', linkIndex: 2, start: 1600, end: 2199 },
        { id: 'projects', linkIndex: 3, start: 2200, end: 3200 }
    ];

    // Remove 'active' class (and reset color) from all navigation links
    navLinks.forEach(link => {
        link.classList.remove("active");
        link.style.color = "black";
    });

    // Apply 'active' style to the currently visible section's link
    for (const section of sections) {
        if (sP >= section.start && sP <= section.end) {
            if (navLinks[section.linkIndex]) {
                navLinks[section.linkIndex].classList.add("active");
                navLinks[section.linkIndex].style.color = "red";
                break; // Exit loop once a match is found
            }
        }
    }
});

// Function for filtering projects
document.addEventListener("DOMContentLoaded", function(){
    // Cache selectors for efficiency
    const allWorkBtn = document.getElementById("all-work");
    const jsWorkBtn = document.getElementById("js-work"); // QuickBooks
    const jQueryBtn = document.getElementById("j-query"); // MS Office & Excel
    const snbBtn = document.getElementById("s-n-b"); // Accounting Processes
    const countDisplay = document.getElementById("count");

    // Helper function to update project display and count
    function updateProjects(filterClass, buttonText) {
        const projectCards = document.querySelectorAll(".wrap-5 .col-4"); // Select all project cards
        let visibleCount = 0;

        projectCards.forEach(card => {
            if (filterClass === "all" || card.classList.contains(filterClass)) {
                card.style.display = "block";
                visibleCount++;
            } else {
                card.style.display = "none";
            }
        });

        // Update count display
        if (countDisplay) {
            countDisplay.textContent = `${buttonText} = ${visibleCount}`;
        }
    }

    // Helper function to manage active button state
    function setActiveButton(clickedButton) {
        const projectFilterButtons = document.querySelectorAll("#pro li a");
        projectFilterButtons.forEach(link => link.classList.remove("active"));
        if (clickedButton) {
            clickedButton.classList.add("active");
        }
    }

    // Initial state: Show all projects on page load
    if (allWorkBtn) {
        setActiveButton(allWorkBtn.querySelector('a'));
        updateProjects("all", "Total projects");
    }

    // Event listeners for project filtering buttons
    if (allWorkBtn) {
        allWorkBtn.addEventListener("click", function(){
            setActiveButton(this.querySelector('a'));
            updateProjects("all", "Total projects");
        });
    }

    if (jsWorkBtn) {
        jsWorkBtn.addEventListener("click", function(){
            setActiveButton(this.querySelector('a'));
            updateProjects("js", "QuickBooks experience"); // 'js' class for QuickBooks
        });
    }

    if (jQueryBtn) {
        jQueryBtn.addEventListener("click", function(){
            setActiveButton(this.querySelector('a'));
            // Assuming 'non-jq' is the class for MS Office & Excel.
            // If it means "not jQuery," and you want to show items that ARE MS Office,
            // you might need a dedicated class like 'msoffice' on the cards.
            // For now, it will show cards that have 'non-jq' class.
            updateProjects("non-jq", "MS Office & Excel experience");
        });
    }

    if (snbBtn) {
        snbBtn.addEventListener("click", function(){
            setActiveButton(this.querySelector('a'));
            // Similar to above, 'non-sass-b' is used.
            // If you want to show cards with "accounting-process" class, use that.
            // For now, it will show cards that have 'non-sass-b' class.
            updateProjects("non-sass-b", "Accounting process experience");
        });
    }
});
