function PlayerService(ready) {
    var endpointUri = "http://api.cbssports.com/fantasy/players/list?version=3.0&SPORT=football&response_format=json";
    var playersData = [];

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
    console.log(playersData)

    // PUBLIC
    
    this.getPlayersByTeam = function (teamName) {
        return playersData.filter(function (player) {
            if (player.pro_team == teamName) {
                return true;
            }
        });
    }
    
    this.getPlayersByPosition = function getPlayersByPosition (position) {
        return playersData.filter(function (player) {
            if (player.position == position) {
                return true;
            }
        });
    }

    this.getPlayersByName = function (lastName){
        return playersData.filter(function(player){
            if (player.lastname == lastName) {
                return true;
            }
        });
    }

    this.getSortedPlayers = function (field, sortBy){
        console.log("Sorting By: " + field + "And " + sortBy)
        return playersData.filter(function(player){
            if (player[field] == sortBy) {
               return true; 
            }
        });
    }
}

