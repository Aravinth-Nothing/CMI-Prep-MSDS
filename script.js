
document.addEventListener("DOMContentLoaded", function () {
    
    // Default problem
    loadProblem("home.html");

    
    // Add event listener to the back button
    const backButton = document.getElementById("backButton");
    if (backButton) {
        backButton.addEventListener("click", goBack);
    }
    window.addEventListener("resize", updateBackButtonVisibility);

    const isDarkMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(isDarkMode);
    const darkModeToggle = document.getElementById('darkmode-toggle');
    darkModeToggle.addEventListener('change', toggleDarkMode);
    if (darkModeToggle) {
        darkModeToggle.checked = isDarkMode;
    }
    // Check dark mode preference from local storage


    // Apply dark mode based on the stored preference
    setDarkMode(isDarkMode);
});

const pageHistory = [];

function loadProblem(url) {
    const problemListContainer = document.getElementById("problem-list-container");
    problemListContainer.innerHTML = '';
    problemListContainer.style.marginTop = '0rem';

    const filterContainer = document.getElementById("filter-container");
    filterContainer.innerHTML = '';

    // Fetch the problem HTML content
    fetch(url)
        .then(response => response.text())
        .then(problemHtml => {
            var scriptElement = document.createElement('script');
        
            scriptElement.src = 'tikzjax.js';

            document.body.appendChild(scriptElement);

            document.getElementById("body-container").innerHTML = problemHtml;
            MathJax.typesetPromise()
            
            const revealButtons = document.querySelectorAll('.reveal-buttons');
            revealButtons.forEach(button => {
                button.addEventListener('click', toggleSolution);
            });

            // Save the current page URL to history
            pageHistory.push(url);
            // Show or hide the back button based on the updated history
            updateBackButtonVisibility();


        })
        .catch(error => console.error("Error loading problem:", error));
}


function loadProblemList() {
    // Fetch the problem HTML content
    const problemsList = [
        {
            title: "Problem 1",
            file: "problem-1.html",
            tags: {
                difficulty: "medium",
                concept: ["polynomials"],
                type: "Numerical",
            },
        },
        {
            title: "Problem 2",
            file: "problem-2.html",
            tags: {
                difficulty: "medium",
                concept: ["sequenceAndSeries"],
                type: "Numerical",
            },
        },
        {
            title: "Problem 3",
            file: "problem-3.html",
            tags: {
                difficulty: "medium",
                concept: ["trigonometry"],
                type: "Proof",
            },
        },
        {
            title: "Problem 4",
            file: "problem-4.html",
            tags: {
                difficulty: "medium",
                concept: ["trigonometry"],
                type: "Proof",
            },
        },
        {
            title: "Problem 5",
            file: "problem-5.html",
            tags: {
                difficulty: "medium",
                concept: ["trigonometry"],
                type: "Numerical",
            },
        },
        {
            title: "Problem 6",
            file: "problem-6.html",
            tags: {
                difficulty: "medium",
                concept: ["trigonometry"],
                type: "Proof",
            },
        },
        {
            title: "Problem 7",
            file: "problem-7.html",
            tags: {
                difficulty: "medium",
                concept: ["trigonometry"],
                type: "Proof",
            },
        },
        {
            title: "Problem 8",
            file: "problem-8.html",
            tags: {
                difficulty: "medium",
                concept: ["trigonometry"],
                type: "Proof",
            },
        },
        {
            title: "Problem 9",
            file: "problem-9.html",
            tags: {
                difficulty: "medium",
                concept: ["trigonometry"],
                type: "Numerical",
            },
        },
        {
            title: "Problem 10",
            file: "problem-10.html",
            tags: {
                difficulty: "medium",
                concept: ["trigonometry"],
                type: "ShortAnswer",
            },
        },
        {
            title: "Problem 11",
            file: "problem-11.html",
            tags: {
                difficulty: "medium",
                concept: ["trigonometry"],
                type: "MCQ",
            },
        },
        {
            title: "Problem 12",
            file: "problem-12.html",
            tags: {
                difficulty: "difficult",
                concept: ["functions","calculus"],
                type: "MSQ",
            },
        },
        {
            title: "Problem 13",
            file: "problem-13.html",
            tags: {
                difficulty: "difficult",
                concept: ["functions","trigonometry"],
                type: "MSQ",
            },
        },
        {
            title: "Problem 14",
            file: "problem-14.html",
            tags: {
                difficulty: "medium",
                concept: ["calculus","trigonometry"],
                type: "MCQ",
            },
        },
        {
            title: "Problem 15",
            file: "problem-15.html",
            tags: {
                difficulty: "medium",
                concept: ["calculus","functions","graph"],
                type: "ShortAnswer",
            },
        },
        // Add more problems as needed
    ];

    const selectedDifficulty = getSelectedFilters("difficulty");
    const selectedConcepts = getSelectedFilters("concept");
    const selectedTypes = getSelectedFilters("type");

    // Filter problems based on selected filters
    const filteredProblems = problemsList.filter(problem => {
        return (
            (selectedDifficulty.length === 0 || selectedDifficulty.includes(problem.tags.difficulty)) &&
            (selectedConcepts.length === 0 || selectedConcepts.some(concept => problem.tags.concept.includes(concept))) &&
            (selectedTypes.length === 0 || selectedTypes.includes(problem.tags.type))
        );
    });
    // Update the HTML with the list of problems
    const problemListContainer = document.getElementById("problem-list-container");
    const bodyContainer = document.getElementById("body-container");
    bodyContainer.innerHTML = '';
    problemListContainer.style.marginTop = '0rem';
    problemListContainer.innerHTML = ''; // Clear existing content

    

    filteredProblems.forEach(problem => {
        const listItem = document.createElement("li");
        const link = document.createElement("a");
        link.href = "javascript:void(0);";
        link.textContent = problem.title;
        // Use loadProblem function on click
        link.onclick = function () {
            loadProblem(`problems/${problem.file}`);
        };
        listItem.appendChild(link);
        problemListContainer.appendChild(listItem);
    });

    pageHistory.push("problem-list");

    // Show back button if there is a page to go back to
    updateBackButtonVisibility();
}

function goBack() {
    // Check if there's a page in the history
    if (pageHistory.length > 1) {
        // Pop the current page from history
        pageHistory.pop();

        // Get the previous page from history
        const previousPage = pageHistory[pageHistory.length - 1];

        // Load the previous page
        loadPage(previousPage);

        // Show or hide the back button based on the updated history
        updateBackButtonVisibility();
    } else {
        alert('No more pages to go back');
    }
}

function loadPage(url) {
    if (url === "problem-list") {
        problemListPro();
    } else {
        loadProblem(url);
    }
}

function updateBackButtonVisibility() {
    const backButton = document.getElementById("backButton");
    if (window.innerWidth <= 1064) {
        if (backButton) {
            backButton.style.display = "none";
             // Hide the button
        }
    } else {
        // Show or hide the button based on the page history
        if (backButton) {
            backButton.style.display = pageHistory.length > 1 ? "block" : "none";
        }
    }
}

function filterFinal(){
    const filterContainer = document.getElementById("filter-container");
    filterContainer.innerHTML = createFilterHTML();
    attachFilterEventListeners();
}
function toggleSolution(event) {
    const solution = event.target.nextElementSibling; // Assuming the solution is the next sibling element
    solution.classList.toggle('revealed');
}
function createFilterHTML() {
    return `
        <center><h3>Filter</h3><center>
        <div class="filter-toggle">
            <button class="filter-toggle-button reveal-buttons" onclick="toggleFilter();">&#9660;</button>
        </div>
        <div class="filter-container  filter-container-2">
            <div class="filter-column">
                <h4>Difficulty</h4>
                <label><input type="checkbox" value="difficulty-easy" /> Easy</label>
                <label><input type="checkbox" value="difficulty-medium" /> Medium</label>
                <label><input type="checkbox" value="difficulty-hard" /> Hard</label>
            </div>
            <div class="filter-column">
                <h4>Concept</h4>
                <label><input type="checkbox" value="concept-trigonometry" /> Trigonometry</label>
                <label><input type="checkbox" value="concept-calculus" /> Calculus</label>
                <label><input type="checkbox" value="concept-sequenceAndSeries" /> Sequence And Series</label>
                <label><input type="checkbox" value="concept-polynomials" />Polynomials</label>
                <label><input type="checkbox" value="concept-functions" />Functions</label>
                <label><input type="checkbox" value="concept-graph" />Graph</label>
                <!-- Add more concepts as needed -->
            </div>
            <div class="filter-column">
                <h4>Type</h4>
                <label><input type="checkbox" value="type-MCQ" /> MCQ</label>
                <label><input type="checkbox" value="type-MSQ" /> MSQ</label>
                <label><input type="checkbox" value="type-Numerical" /> Numerical</label>
                <label><input type="checkbox" value="type-ShortAnswer" /> Short Answer</label>
                <label><input type="checkbox" value="type-Proof" /> Proof</label>
            </div>
        </div>
    `;
}

function getSelectedFilters(filterType) {
    const checkboxes = document.querySelectorAll(`input[type="checkbox"][value^="${filterType}"]:checked`);
    const selectedValues = Array.from(checkboxes).map(checkbox => checkbox.value.replace(`${filterType}-`, ''));

    return selectedValues;
}

function attachFilterEventListeners() {
    // Attach event listeners to filter checkboxes
    const filterCheckboxes = document.querySelectorAll('input[type="checkbox"]');
    filterCheckboxes.forEach(checkbox => {
        // Exclude the dark mode toggle button
        if (checkbox.id !== 'darkmode-toggle') {
            checkbox.addEventListener('click', loadProblemList);
        }
    });
}
function problemListPro(){
    filterFinal();
    loadProblemList();
}
function toggleFilter() {
    const filterContainer2 = document.querySelector('.filter-container-2');
    filterContainer2.classList.toggle('active');
}
function toggleDarkMode() {
    // Toggle dark mode
    const isDarkMode = document.body.classList.toggle("dark-mode");

    // Save dark mode preference to local storage
    localStorage.setItem("darkMode", isDarkMode.toString());
}

function setDarkMode(isDarkMode) {
    // Set dark mode based on the provided preference
    document.body.classList.toggle("dark-mode", isDarkMode);
}