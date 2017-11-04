function PlayerController() {
    var loading = true; //Start the spinner
    var playerService = new PlayerService(ready);

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
    function renderLastnamesDropdown(){
        var elem = document.getElementById('lastnames-list');
        var template = '';
        var lastNames = playerService.getLastNames('lastname')
        console.log("All Last Names: ",  lastNames)
        
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

    function renderPositionsDropdown(){
        var elem = document.getElementById('positions-list');
        var template = '';
        var positions = playerService.getPositions('position')
        console.log("All Positions: ",  positions)
        
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

    function renderTeamsDropdown(){
        var elem = document.getElementById('teams-list');
        var template = '';
        var teams = playerService.getTeams('pro_team')
        console.log("All Teams: ",  teams)
        // START HERE WITH TEMPLATES THAT FILL IN YOUR FORM OPTIONS
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


    // function renderSortBy(sortBy) { // STALLED ATTEMPT TO RENDER SUB-SEARCH MENU, MAY REVISIT LATER
    //     var elem = document.getElementById('sortByList')
    //     var template = ''
        // var sortedPlayers = playerService.
    // }

    // PUBLIC

    // GET PLAYERS BY SEARCH TYPE

    this.getPlayersByTeam = function getPlayersByTeam(teamName) {
        return playerService.getPlayersByTeam(teamName)
    }

    this.getPlayersByPosition = function getPlayersByPosition(position) {
        return playerService.getPlayersByPosition(position)
    }

    this.getPlayersByLastName = function getPlayersByLastName(lastName) {
        return playerService.getPlayersByLastName(lastName)
    }

    // this.updateRosterDisplay = function updateRosterDisplay() {
    //     var elem = document.getElementById('player-roster')
    //     var template = ''
    //     console.log("updateRosterDisplay initiated (Need to fill in code)")

    // }

    // *** ATTEMPTED TO COMBINE SORT FUNCTION INTO ONE, FELL BACK TO SEPARATE, MAY REVISIT LATER
    // this.getSortedPlayers = function getSortedPlayers(field, sortBy) {
    //     // return playerService.getSortedPlayers(field, sortBy)
    //     console.log(playerService.getSortedPlayers(field, sortBy));
    // }
    // ***

    this.renderSearchMenu = function renderSearchMenu(searchForm) {
        var choiceIndex = searchForm.fieldList.selectedIndex; //Gives you the number of the selected index, cannot drill down from here
        var selectedValue = searchForm.fieldList.options[choiceIndex].value; //Using the index from above, you can now target the specific option object and drill down for value/name etc.
        // console.log(selectedValue)
        // console.log(searchFormChoice);
        renderSortBy(selectedValue)
    }

}
