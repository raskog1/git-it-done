const getUserRepos = function (user) {
    // Fetch is async, so this won't work:
    // let response = fetch("https://api.github.com/users/octocat/repos");
    // console.log(response);

    let apiUrl = `https://api.github.com/users/${user}/repos`;

    fetch(apiUrl).then(function (response) {
        // The response has a method called json() whose callback
        // function captures the actual data.
        console.log(response);
        response.json().then(function (data) {
            console.log(data);
        })
    })
};

getUserRepos("raskog1");