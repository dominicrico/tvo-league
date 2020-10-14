(async () => {
	let leagueData = {}
	let loading = false
	const clubs = [748, 2232]
	const og = 28
  let selected = clubs[0]

  const handleClubChange = async e => {
    const clubToShow = clubs[parseInt(e.currentTarget.getAttribute('data-select'), 10)]
    if (selected !== clubToShow) {
			document.querySelector('.is-active[data-select]').classList.remove('is-active')
      selected = clubToShow
			e.currentTarget.classList.add('is-active')
      document.querySelectorAll('[data-team]').forEach(hide => {
				hide.style = "display:none;"
				if (hide.parentElement.classList.contains('select')) hide.parentElement.style = "display:none;"
			})
      await fetchLeagueData(clubToShow, og, e.target.value)
      document.querySelectorAll(`[data-team="${clubToShow}"]`).forEach(node => node.style = '')
			document.querySelector(`.game-week-select[data-team="${clubToShow}"]`).parentElement.style = ''
    }
  }

	const renderWeeks = club => {
		let render = ''
		Object.keys(leagueData[club].menu.dt.list).map(value => {
			render += `<option value="${value}" ${(leagueData[club].menu.dt.selected === value) ? 'selected' : ''}>${leagueData[club].menu.dt.list[value]}</option>`
		})

		const select = document.createElement('div')
		select.classList.add('select')
		select.style = selected === club ? '' : 'display: none;'
		select.innerHTML = `<select class="game-week-select" style="${selected === club ? '' : 'display: none;'}" data-team="${club}">`
		document.querySelector('.league-wrapper').prepend(select)
		document.querySelector(`.game-week-select[data-team="${club}"]`).innerHTML = render

		document.querySelector(`.game-week-select[data-team="${club}"]`).addEventListener('change', async e => {
	    const club = e.currentTarget.getAttribute('data-team')
			await fetchLeagueData(club, og, e.target.value)
		})

	}

	const renderGames = club => {
		let render = ``
		leagueData[club].content.classes.map(league => {
			if (league.games && league.games.length) {
				render += `<div class="league-list"><div><h2><span class="calendar-icon"></span> ${league.gClassSname}</h2>
					<small class="game-count">(${league.games.length} ${(league.games.length === 1) ? 'Spiel' : 'Spiele'})</small></div><ul>`
				league.games.map(game => {
					render += `<li><div class="league-item">
						<div class="header">
							<div class="game-teams">
								<strong>${game.gHomeTeam} - ${game.gGuestTeam}</strong>
							</div>
							${game.gToken ? (`<div class="game-live">
								<a class="live-button" href="https://spo.handball4all.de/service/ticker/index.html?token=${game.gToken}" target="_blank">Live seit ${game.gTime} Uhr</a>
							</div>`) : (`<div class="game-date">
								<span class="clock-icon"></span> <span>${game.gWDay} ${game.gDate} ${game.gDate}, ${game.gTime}</span>
							</div>`)}
						</div>
						${game.gReferee.length > 1 ? (`<div class="referee">
							<span class="referee-icon"></span> ${game.gReferee}
						</div>`) : ''}
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

		document.querySelector(`#league [data-team="${club}"]`).innerHTML = render
	}

	const fetchLeagueData = async (club, og, date, withWeekSelect) => {
		document.querySelector('#league').classList.add('is-loading')

		leagueData[club] = await fetch(`https://spo.handball4all.de/service/if_g_json.php?c=${club}&cmd=pcu&og=${og}&do=${date}`)
			.then(res => res.json())
			.then(data => data[0])

		renderGames(club)
		if (withWeekSelect) renderWeeks(club)

		document.querySelector('#league').classList.remove('is-loading')
	}

  clubs.forEach(async (club) => {
    document.querySelector('#league').innerHTML = `<div data-team="${clubs[0]}"></div><div data-team="${clubs[1]}" style="display:none;"></div>`
    await fetchLeagueData(club, og, null, true)
  })

  document.querySelectorAll('.team-select .button-team').forEach(select =>
    select.addEventListener('click', handleClubChange)
  )
})()
