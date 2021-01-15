const issueContainerEl = document.querySelector("#issues-container");

const getRepoIssues = function (repo) {
    let apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";

    fetch(apiUrl).then(function (response) {
        // Request was successful
        if (response.ok) {
            response.json().then(function (data) {
                // Pass response data to DOM function
                displayIssues(data);
            });
        } else {
            alert("There was a problem with your request!");
        }
    });
};

const displayIssues = function (issues) {
    // Check for no open issues
    if (issues.length === 0) {
        issueContainerEl.textContent = "This repo has no open issues!";
        return;
    }

    for (let i = 0; i < issues.length; i++) {
        // Create a link element to take users to the issue on github
        const issueEl = document.createElement("a");
        issueEl.classList = "list-item flex-row justify-space-between align-center";
        issueEl.setAttribute("href", issues[i].html_url);
        issueEl.setAttribute("target", "_blank");

        // Create span to hold issue title
        const titleEl = document.createElement("span");
        titleEl.textContent = issues[i].title;

        // Append to container
        issueEl.appendChild(titleEl);

        // Create a type element
        const typeEl = document.createElement("span");

        // Check if issue is an actual issue or a pull request
        if (issues[i].pull_request) {
            typeEl.textContent = "(Pull request)";
        } else {
            typeEl.textContent = "(Issue)";
        }

        // Append to container
        issueEl.appendChild(typeEl);

        issueContainerEl.appendChild(issueEl);
    }
}

getRepoIssues("raskog1/react-portfolio");