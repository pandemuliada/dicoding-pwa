function objectToQueryString(obj) {
  return Object.keys(obj)
    .map((key) => key + '=' + obj[key])
    .join('&')
}

const _apiHost = 'https://api.football-data.org/v2'
const _token = '3fd2ae39563b44aaac81238b1ebc7581'

function APIRequest(method = 'GET', url, params) {
  const options = {
    method,
    headers: {
      'X-Auth-Token': _token,
    },
  }

  if (params) {
    if ((method = 'GET')) {
      url += '?' + objectToQueryString(params)
    } else {
      options.body = JSON.stringify(params)
    }
  }

  return fetch(_apiHost + url, options)
    .then((res) => {
      if (res.status !== 200) {
        console.log('Error: ' + res)
        return Promise.reject(new Error(res.status))
      } else {
        return Promise.resolve(res)
      }
    })
    .then((res) => res.json())
    .catch((err) => console.log(err))
}



const ENDPOINT_TEAMS = `${_apiHost}/competitions/2001/teams`
const ENDPOINT_MATCHES = `${_apiHost}/competitions/2001/matches`

// Fetch teams
function getTeams() {
  if ('caches' in window) {
    caches.match(ENDPOINT_TEAMS).then(function(response) {
      if (response) {
        response.json().then(function(data) {
          console.log('Mengambil data teams dari cache')
          showTeams(data)
        })
      }
    })
  }

  APIRequest('GET', '/competitions/2001/teams').then((response) => {
    showTeams(response)
  }).catch(error => console.log(error))
}

function showTeams(data) {
  const teamsContainer = selectDOMWith('#teamsList')

  let elements = ''

  data.teams.splice(0, 30).map((team) => {
    if (team.crestUrl != null) {
      elements += `
        <div class="col">
          <div class="card">
            <div class="card-image pt-3">
              <img src="${team.crestUrl}" alt="Team Logo" style="width:100px; height: 100px; margin: auto">
              <button class="btn-floating halfway-fab waves-effect waves-light red" data-team="${team.name}" onclick="onAddTeamToFavorite(${team})"><i class="material-icons" title="Tambah ke Team Favorit">add</i></button>
            </div>
            <div class="card-content">
              <span class="card-title">${team.name}</span>
              <p>Lorem ipsum dolor.</p>
            </div>
          </div>
        </div>
      `
    }
  })

  teamsContainer.innerHTML = elements
}

function onAddToFavorite(team) {
  console.log(team)
}


// Fetch matches
function getMatches() {
  if ('caches' in window) {
    caches.match(ENDPOINT_MATCHES).then(function(response) {
      if (response) {
        response.json().then(function(data) {
          console.log('Mengambil data matches dari cache')
          showMatches(data)
        })
      }
    })
  }

  APIRequest('GET', '/competitions/2001/matches').then((response) => {
    showMatches(response)
  }).catch(error => console.log(error))
}

function showMatches(data) {
  const matchesContainer = selectDOMWith('#matchesList')

  let elements = ''
  console.log(data.matches.splice(0, 30))
  data.matches.splice(0, 30).map((match) => {
    elements += `
      <div class="col">
        <div class="card">
          <div class="card-content" style="padding: 2px 20px 30px 20px">
            <h2 class="card-title">${match.stage}</h2>
            <p>Home Team : ${match.homeTeam.name}</p>
            <p>Away Team : ${match.awayTeam.name}</p>
          </div>
        </div>
      </div>
    `
  })

  matchesContainer.innerHTML = elements
}