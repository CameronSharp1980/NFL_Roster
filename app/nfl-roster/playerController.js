function PlayerController() {
    var loading = true; //Start the spinner
    var playerService = new PlayerService(ready);
    var currentFilter = '';
    var currentSelection = '';
    // PRIVATE

    function ready() {
        loading = false; //stop the spinner

        //Now that all of our player data is back we can safely setup bindings for the rest of the view.

    }
    // $('some-button').on('click', function () {
    //     var teamSF = playerService.getPlayersByTeam("SF");
    //     console.log(teamSF)
    // });
    // console.log(playerService.getPlayersByTeam("SF"));

    // EACH DROP DOWN MENU DYNAMICALLY GENERATES ITS SELECTIONS
    function renderLastnamesDropdown() {
        var elem = document.getElementById('lastnames-list');
        var template = '';
        var lastNames = playerService.getLastNames('lastname')
        console.log("All Last Names: ", lastNames)

        for (var key in lastNames) {
            if (lastNames.hasOwnProperty(key)) {
                var lastName = lastNames[key];
                template += `
                <option value="${lastName}">${lastName}</option>
                `
            }
        }
        elem.innerHTML = template;
    }
    renderLastnamesDropdown()

    function renderPositionsDropdown() {
        var elem = document.getElementById('positions-list');
        var template = '';
        var positions = playerService.getPositions('position')
        console.log("All Positions: ", positions)

        for (var key in positions) {
            if (positions.hasOwnProperty(key)) {
                var position = positions[key];
                template += `
                <option value="${position}">${position}</option>
                `
            }
        }
        elem.innerHTML = template;
    }
    renderPositionsDropdown()

    function renderTeamsDropdown() {
        var elem = document.getElementById('teams-list');
        var template = '';
        var teams = playerService.getTeams('pro_team')
        console.log("All Teams: ", teams)
        for (var key in teams) {
            if (teams.hasOwnProperty(key)) {
                var team = teams[key];
                template += `
                <option value="${team}">${team}</option>
                `
            }
        }
        elem.innerHTML = template;
    }
    renderTeamsDropdown()

    function updateRosterDisplay(filteredPlayerList) {
        var elem = document.getElementById('player-roster')
        var template = ''
        for (var key in filteredPlayerList) {
            if (filteredPlayerList.hasOwnProperty(key)) {
                var filteredPlayer = filteredPlayerList[key];
                template += `
                     <div class="player-card">
                          <img src="${filteredPlayer.photo}" alt="Player image placeholder" id="player-image">
                          <h4 class="player-name">${filteredPlayer.fullname}</h4>
                          <h6 class="player-position">${filteredPlayer.position}</h6>
                          <h6 class="player-team">${filteredPlayer.pro_team}</h6>
                          <button class="addButton" id="${filteredPlayer.id}" onclick="playerController.addToRoster(${filteredPlayer.id})">Add to team</button>
                     </div>
                `
            }
        }
        elem.innerHTML = template;

    }

    function refreshTeamDisplay(currentFilter, currentSelection) {
        switch (currentFilter) {
            case 'lastname':
                var tempPlayerList = playerService.getPlayersByLastName(currentSelection);
                // console.log("current selection: ", currentSelection)
                // console.log("current filter: ", currentFilter);
                // console.log("temp player list: ", tempPlayerList)
                updateRosterDisplay(tempPlayerList);
                break;
            case 'position':
                var tempPlayerList = playerService.getPlayersByPosition(currentSelection);
                updateRosterDisplay(tempPlayerList);
                break;
            case 'team':
                var tempPlayerList = playerService.getPlayersByTeam(currentSelection);
                updateRosterDisplay(tempPlayerList);
                break;
        }
    }


    // function renderSortBy(sortBy) { // STALLED ATTEMPT TO RENDER SUB-SEARCH MENU, MAY REVISIT LATER
    //     var elem = document.getElementById('sortByList')
    //     var template = ''
    // var sortedPlayers = playerService.
    // }

    // PUBLIC

    // GET PLAYERS BY SEARCH TYPE (Not sure what I was thinking when I wrote these public.
    // Not in use. leaving here in case it comes back to me.)

    this.renderByLastname = function renderByLastname(lastNameForm) {
        // console.log("Last name form: ", lastNameForm)
        var choiceIndex = lastNameForm.searchByLastnameList.selectedIndex;
        var choiceValue = lastNameForm.searchByLastnameList.options[choiceIndex].value;
        var sortedChoices = playerService.getPlayersByLastName(choiceValue)
        console.log(sortedChoices)
        // START HERE, WRITE A FUNCTION THAT IS CALLED IN EACH OF THESE 3
        // THAT WILL UPDATE THE SCREEN WITH THE SORTED ROSTER
        currentFilter = 'lastname';
        currentSelection = choiceValue;
        // console.log(currentFilter, currentSelection)
        updateRosterDisplay(sortedChoices);
    }

    this.renderByPosition = function renderByPosition(position) {
        console.log("Position form: ", position)
        var choiceIndex = position.searchByPositionList.selectedIndex;
        var choiceValue = position.searchByPositionList.options[choiceIndex].value;
        var sortedChoices = playerService.getPlayersByPosition(choiceValue)
        console.log(sortedChoices)
        currentFilter = 'position';
        currentSelection = choiceValue;
        updateRosterDisplay(sortedChoices);
    }

    this.renderByTeam = function renderByTeam(team) {
        console.log("Team form: ", team)
        var choiceIndex = team.searchByTeamList.selectedIndex;
        var choiceValue = team.searchByTeamList.options[choiceIndex].value;
        var sortedChoices = playerService.getPlayersByTeam(choiceValue)
        console.log(sortedChoices)
        currentFilter = 'team';
        currentSelection = choiceValue;
        updateRosterDisplay(sortedChoices);
    }

    this.addToRoster = function addToRoster(selectedPlayerId) {
        playerService.addToRoster(selectedPlayerId);
        playerService.removeFromRoster(selectedPlayerId);
        refreshTeamDisplay(currentFilter, currentSelection);
    }

    // *** ATTEMPTED TO COMBINE SORT FUNCTION INTO ONE, FELL BACK TO SEPARATE, MAY REVISIT LATER
    // this.getSortedPlayers = function getSortedPlayers(field, sortBy) {
    //     // return playerService.getSortedPlayers(field, sortBy)
    //     console.log(playerService.getSortedPlayers(field, sortBy));
    // }
    // ***

    // KEEPING THIS AS EXAMPLE FOR NOW
    // this.renderSearchMenu = function renderSearchMenu(searchForm) {
    //     var choiceIndex = searchForm.fieldList.selectedIndex; //Gives you the number of the selected index, cannot drill down from here
    //     var selectedValue = searchForm.fieldList.options[choiceIndex].value; //Using the index from above, you can now target the specific option object and drill down for value/name etc.
    //     // console.log(selectedValue)
    //     // console.log(searchFormChoice);
    //     renderSortBy(selectedValue)
    // }

}