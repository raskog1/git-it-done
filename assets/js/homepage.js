const userFormEl = document.querySelector("#user-form");
const nameInputEl = document.querySelector("#username");
const repoContainerEl = document.querySelector("#repos-container");
const repoSearchTerm = document.querySelector("#repo-search-term");

const formSubmitHandler = function (event) {
    event.preventDefault();
    let username = nameInputEl.value.trim();

    if (username) {
        getUserRepos(username);
        nameInputEl.value = "";
    } else {
        alert("Please enter a GitHub username");
    }
}

const getUserRepos = function (user) {
    // Fetch is async, so this won't work:
    // let response = fetch("https://api.github.com/users/octocat/repos");
    // console.log(response);

    let apiUrl = `https://api.github.com/users/${user}/repos`;

    fetch(apiUrl).then(function (response) {
        // The response has a method called json() whose callback
        // function captures the actual data.
        console.log(response);
        if (response.ok) {
            response.json().then(function (data) {
                displayRepos(data, user);
            })
        } else {
            alert("Error: " + response.statusText);
        }
    }).catch(function (error) {
        // Notice this '.catch()' getting chained onto the end of '.then()'
        alert("Unable to connect to Github");
    })
};

const displayRepos = function (repos, searchTerm) {
    // Check if api returned any repos
    if (repos.length === 0) {
        repoContainerEl.textContent = "No repositories found.";
        return;
    }

    // Clear old content
    repoContainerEl.textContent = "";
    repoSearchTerm.textContent = searchTerm;

    // Loop over repos
    for (let i = 0; i < repos.length; i++) {
        // Format repo name
        const repoName = repos[i].owner.login + "/" + repos[i].name;

        // Create a container for each repo
        const repoEl = document.createElement("a");
        repoEl.classList = "list-item flex-row justify-space-between align-center";
        repoEl.setAttribute("href", "./single-repo.html?repo=" + repoName);

        // Create a span element to hold repository name
        const titleEl = document.createElement("span");
        titleEl.textContent = repoName;

        // Append to container
        repoEl.appendChild(titleEl);

        // Create a status element
        const statusEl = document.createElement("span");
        statusEl.classList = "flex-row align-center";

        // Check if current repo has issues or not
        if (repos[i].open_issues_count > 0) {
            statusEl.innerHTML = "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issue(s)";
        } else {
            statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
        }

        // Append to container
        repoEl.appendChild(statusEl);

        // Append container to the dom
        repoContainerEl.appendChild(repoEl);
    }
}

userFormEl.addEventListener("submit", formSubmitHandler);