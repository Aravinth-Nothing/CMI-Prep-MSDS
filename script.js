
document.addEventListener("DOMContentLoaded", function () {

    
    // Add event listener to the back button


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

function loadProblem(url) {
    console.log(url);
    
    const problemListContainer = document.getElementById("problem-list-container");
    problemListContainer.innerHTML = '';
    problemListContainer.style.marginTop = '0rem';

    const filterContainer = document.getElementById("filter-container");
    filterContainer.innerHTML = '';


    // Fetch the problem HTML content
    fetch(url)
        .then(response => response.text())
        .then(problemHtml => {

            document.getElementById("body-container").innerHTML = problemHtml;
            MathJax.typesetPromise()
            

            // Save the current page URL to history
            pageHistory.push(url);
            // Show or hide the back button based on the updated history
            updateBackButtonVisibility();


        })
        .catch(error => console.error("Error loading problem:", error));
        const match = url.match(/problem-(\d+)\.html/);
    const problemNumber = match ? parseInt(match[1], 10) : null;

    if (problemNumber !== null) {
    const problem = problemsList.find(item => item.file === `problem-${problemNumber}.html`);

    if (problem) {
        // Check if the concept of the problem contains "graph"
        if (problem.tags.concept.includes("graph")) {
            console.log(`Executing code block for problem ${problemNumber} with "graph" concept.`);
            var scriptElement = document.createElement('script');
            
            scriptElement.src = 'tikzjax.js';
            scriptElement.onload = function() {
                // Your code here that depends on tikzjax.js being loaded
                window.onload();
              };
            document.body.appendChild(scriptElement);

        }
    } 
}
}




function loadPage(url) {
    if (url === "problem-list") {
        problemListPro();
    } else {
        loadProblem(url);
    }
}



const revealButtons = document.querySelectorAll('.reveal-buttons');
            

revealButtons.forEach(button => {
                button.addEventListener('click', toggleSolution);
            });
function toggleSolution(event) {
    const solution = event.target.nextElementSibling; // Assuming the solution is the next sibling element
    solution.classList.toggle('revealed');
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