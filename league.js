(async () => {
  let leagueData = []
  let loading = false
  const club = 748
  const og = 28

  const renderWeeks = () => {
    let render = ''
    Object.keys(leagueData.menu.dt.list).map(value => {
      render += `<option value="${value}" ${(leagueData.menu.dt.selected === value) ? 'selected' : ''}>${leagueData.menu.dt.list[value]}</option>`
    })
    document.querySelector('#game-week-select').innerHTML = render
    document.querySelector('#game-week-select').style = null
  }

  const renderGames = () => {
    let render = ''
    leagueData.content.classes.map(league => {
      if (league.games && league.games.length) {
        render += `<div class="league-list"><div><h2><span class="calendar-icon"></span> ${league.gClassSname}</h2>
          <small class="game-count">(${league.games.length} ${(league.games.length === 1) ? 'Spiel' : 'Spiele'})</small></div><ul>`
        league.games.map(game => {
          render += `<li><div class="league-item">
            <div class="header">
              <div class="game-teams">
                <strong>${game.gHomeTeam} - ${game.gGuestTeam}</strong>
              </div>
              <div class="game-date">
                <span class="clock-icon"></span> <span>${game.gWDay} ${game.gDate} ${game.gDate}, ${game.gTime}</span>
              </div>
            </div>
            <div class="referee">
              <span class="referee-icon"></span> ${game.gReferee}
            </div>
            <div class="game-info">
              <span class="game-no">
                <strong>Nr.</strong>
                <h3>${game.gNo}</h3>
              </span>
              <span class="game-location">
                <strong>Hallo</strong>
                <h3>${game.gGymnasiumNo}</h3>
              </span>
              <span class="game-result">
                <strong>Ergebnis</strong>
                <h3>${game.gHomeGoals} : ${game.gGuestGoals}</h3>
              </span>
            </div>
          </div></li>`
        })
        render += '</ul></div>'
      } else {
        render += `<div class="league-list is-empty"><div><h2><span class="calendar-icon"></span> ${league.gClassSname}</h2>
          <small class="game-count">(${league.games.length} ${(league.games.length === 1) ? 'Spiel' : 'Spiele'})</small></div></div>`
      }
    })
    document.querySelector('#league').innerHTML = render
  }

  const fetchLeagueData = async (club, og, date) => {
    document.querySelector('#league').classList.add('is-loading')

    leagueData = await fetch(`https://spo.handball4all.de/service/if_g_json.php?c=${club}&cmd=pcu&og=${og}&do=${date}`)
      .then(res => res.json())
      .then(data => data[0])

    renderGames()
    renderWeeks()

    document.querySelector('#league').classList.remove('is-loading')
  }

  await fetchLeagueData(club, og)

  document.querySelector('#game-week-select').addEventListener('change', async e => {
    await fetchLeagueData(club, og, e.target.value)
  })
})()
