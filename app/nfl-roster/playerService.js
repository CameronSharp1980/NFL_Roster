function PlayerService(ready) {
    var endpointUri = "http://api.cbssports.com/fantasy/players/list?version=3.0&SPORT=football&response_format=json";
    var playersData = [];
    var myTeam = [];

    // PRIVATE

    function loadPlayersData() {

        //Lets check the localstorage for the data before making the call.
        //Ideally if a user has already used your site 
        //we can cut down on the load time by saving and pulling from localstorage 

        var localData = localStorage.getItem('playersData');
        if (localData) {
            playersData = JSON.parse(localData);
            return ready();
            //return will short-circuit the loadPlayersData function
            //this will prevent the code below from ever executing
        }

        var url = "https://bcw-getter.herokuapp.com/?url=";
        var endpointUri = "http://api.cbssports.com/fantasy/players/list?version=3.0&SPORT=football&response_format=json";
        var apiUrl = url + encodeURIComponent(endpointUri);

        $.getJSON(apiUrl, function (data) {
            playersData = data.body.players;
            console.log('Player Data Ready')
            console.log('Writing Player Data to localStorage')
            localStorage.setItem('playersData', JSON.stringify(playersData))
            console.log('Finished Writing Player Data to localStorage')
            ready();
        });
    }
    loadPlayersData(); //call the function above every time we create a new service
    console.log("All player data: ", playersData)

    // PUBLIC

    //---------------------------------------------------------
    // GATHER FIELDS FOR EACH SEARCH DROPDOWN
    // CALLED BY YOUR RENDERxDROPDOWN FUNCTIONS
    //---------------------------------------------------------
    this.getLastNames = function getLastNames(lastname) {
        var lastNames = {}
        for (var key in playersData) {
            if (playersData.hasOwnProperty(key)) {
                var player = playersData[key];
                lastNames[player[lastname]] = player[lastname]
            }
        }
        return lastNames
    }

    this.getPositions = function getPositions(position) {
        var positions = {}
        for (var key in playersData) {
            if (playersData.hasOwnProperty(key)) {
                var player = playersData[key];
                positions[player[position]] = player[position];
            }
        }
        return positions
    }

    this.getTeams = function getTeams(team) {
        var teams = {}
        for (var key in playersData) {
            if (playersData.hasOwnProperty(key)) {
                var player = playersData[key];
                teams[player[team]] = player[team];
            }
        }
        return teams
    }

    //---------------------------------------------------------
    // GET PLAYERS BY SEARCH SELECTION
    // EACH TAKES A SINGLE ARGUMENT AND PASSES BACK FILTERED RESULTS
    //---------------------------------------------------------
    this.getPlayersByTeam = function (teamName) {
        return playersData.filter(function (player) {
            if (player.pro_team == teamName) {
                return true;
            }
        });
    }

    this.getPlayersByPosition = function getPlayersByPosition(position) {
        return playersData.filter(function (player) {
            if (player.position == position) {
                return true;
            }
        });
    }

    this.getPlayersByLastName = function (lastName) {
        return playersData.filter(function (player) {
            if (player.lastname == lastName) {
                return true;
            }
        });
    }

    // NOT CURRENTLY USING (Combined filter)
    this.getSortedPlayers = function (field, sortBy) {
        console.log("Sorting By: " + field + "And " + sortBy)
        return playersData.filter(function (player) {
            if (player[field] == sortBy) {
                return true;
            }
        });
    }

    //---------------------------------------------------------
    // ADD TO AND REMOVE FROM ROSTER/TEAM FUNCTIONS
    // ADD AND REMOVE FUNCTIONS USUALLY CALLED IN A PAIR SO AS
    // TO ENSURE THE DATA IS NOT IN TWO PLACES AT ONCE
    //---------------------------------------------------------

    this.addToTeam = function addToTeam(selectedPlayerId) {
        for (var i = 0; i < playersData.length; i++) {
            var player = playersData[i];
            if (player.id == selectedPlayerId) {
                myTeam.push(player)
                console.log("My team: ", myTeam);
            }
        }
    }
    this.removeFromRoster = function removeFromRoster(selectedPlayerId) {
        for (var i = 0; i < playersData.length; i++) {
            var player = playersData[i];
            if (player.id == selectedPlayerId) {
                playersData.splice(i, 1);
            }
        }
    }

    this.addToRoster = function addToRoster(selectedPlayerId){
        for (var i = 0; i < myTeam.length; i++) {
            var teamPlayer = myTeam[i];
            if (teamPlayer.id == selectedPlayerId) {
                playersData.push(teamPlayer);
            }
        }
    }

    this.removeFromTeam = function removeFromTeam(selectedPlayerId){
        for (var i = 0; i < myTeam.length; i++) {
            var teamPlayer = myTeam[i];
            if (teamPlayer.id == selectedPlayerId) {
                myTeam.splice(i, 1);
            }
        }
    }

    this.getCurrentTeam = function getCurrentTeam() {
        return JSON.parse(JSON.stringify(myTeam))
    }
}

