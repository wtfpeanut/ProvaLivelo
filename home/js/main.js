(function() {
    const search = document.getElementById("search");
    const profile = document.getElementById("profile");
    const url = "https://api.github.com/users";
    const client_id = "607fe5fba2e69389acf3";
    const client_secret = "88701a67b625c06f4974d2098b3307ddab683f85";
    const count = 7;
    const sort = "created: asc";
  
    async function getUser(user) {
      const profileResponse = await fetch(
        `${url}/${user}?client_id=${client_id}&client_secret=${client_secret}`
      );
      const reposResponse = await fetch(
        `${url}/${user}/repos?per_page=${count}&sort=${sort}&client_id=${client_id}&client_secret=${client_secret}`
      );
      const starredResponse = await fetch(
        `${url}/${user}/starred?client_id=${client_id}&client_secret=${client_secret}`
      )
  
      // Passa os parâmetros de usuário assim como client_id e client_secret

      const profile = await profileResponse.json();
      const repos = await reposResponse.json();
  
      return { profile, repos };
    }
  
    function showProfile(user) {
      console.log('----------', user);
      profile.innerHTML = `
      <div class="row">
      <div class="col-md-4">
        <div class="card" style="width: 18rem">
          <img class="card-img-top" src="${user.avatar_url}" />
          <ul class="list-group list-group-flush">
            <li class="list-group-item">Repositórios: <span class="badge">${user.public_repos}</span></li>
            <li class="list-group-item">Seguidores: <span class="badge">${user.followers}</span></li>
            <li class="list-group-item">Seguindo: <span class="badge">${user.following}</span></li>
            
          </ul>
          <div class="card-body">
            <a href="${user.starred_url.replace('{/owner}{/repo}', '')}?client_id=${client_id}&client_secret=${client_secret}" target="_blank" class="btn btn-primary btn-block"> Starred</a> 
          </div>
          <div class="card-body">
            <a href="${user.repos_url.replace('{/owner}{/repo}', '')}?client_id=${client_id}&client_secret=${client_secret}" target="_blank" class="btn btn-primary btn-block">Repositório</a> 
          </div>
        </div>
      </div>
      <div class="col-md-8"><div id="repos"></div></div>
    </div>
  </body>
      `;
    }

    // Vizualizar repositórios, seguidores e quem o usuário segue

    function showRepos(repos) {
      let output = '';
  
      repos.forEach(repo => {
        output += `
            <div class="card card-body mb-2">
                <div class="row">
                    <div class="col-md-6">
                        <a href="${repo.html_url}" target="_blank">${
          repo.name
        }</a>
                    </div>
                      </div>
                      <div class="col-md-6 float-right">
                          <span class="badge badge-primary">Stars: ${
                            repo.stargazers_count
                          }</span>
                          <span class="badge badge-secondary">Watch: ${
                            repo.watchers_count
                          }</span>
                          <span class="badge badge-success">Forks: ${
                            repo.forks_count
                          }</span>
                      </div>
                  </div>
              </div>
          `
      });
  
      document.getElementById("repos").innerHTML = output;
    }

    // Detalhes de cada repositório, como estrelas, pessoas visualizando e forks 
  
    search.addEventListener("keyup", e => {
      const user = e.target.value;
  
      if (user.length > 0) {
        getUser(user).then(res => {
          if (res.message !== "Not Found") {
            showProfile(res.profile);
            showRepos(res.repos);
          }
        });
      }
    });
  })();