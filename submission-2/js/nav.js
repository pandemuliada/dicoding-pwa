onPageLoaded(() => {
  // Activate sidebar
  let elems = document.querySelectorAll('.sidenav')
  M.Sidenav.init(elems)
  loadNav()

  function loadNav() {
    let xhttp = new XMLHttpRequest()
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4) {
        if (this.status != 200) return

        // Load all menus
        document.querySelectorAll('.topnav, .sidenav').forEach(function(elm) {
          elm.innerHTML = xhttp.responseText
        })

        document.querySelectorAll('.topnav, .sidenav').forEach(function(elm) {
          elm.addEventListener("click", function(event) {
            // Close sidenav
            let sidenav = document.querySelector(".sidenav");
            M.Sidenav.getInstance(sidenav).close();
   
            // Load page when menu clicked
            page = event.target.getAttribute("href").substr(1);
            loadPage(page);
          });
        })
      }
    }
    xhttp.open('GET', 'nav.html', true)
    xhttp.send()
  }

  let page = window.location.hash.substr(1)

  if (page == "") page = "home"
  loadPage(page)

  function loadPage(page) {
    let xhttp = new XMLHttpRequest()
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4) {
        let content = document.querySelector('#root')

        if (this.status == 200) {
          content.innerHTML = xhttp.responseText

          // Get teams
          if (page === 'teams') getTeams()
          if (page === 'matches') getMatches()

        } else if (this.status == 404) {
          content.innerHTML = "<p>Halaman tidak ditemukan</p>"
        } else {
          content.innerHTML = "<p>Ups.. halaman tidak dapat diakses.</p>";
        }
      }
    }
    xhttp.open('GET', 'pages/' + page + '.html', true)
    xhttp.send()
  }

})
