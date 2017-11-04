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

    function updateRosterDisplay() {
        var elem = document.getElementById('player-roster')
        var template = ''

    }

    // PUBLIC

    // *** Re-wrote these three functions into one. These are no longer called. Keeping for reference.
    // this.getPlayersByTeam = function getPlayersByTeam(teamName) {
    //     return playerService.getPlayersByTeam(teamName)
    // }

    // this.getPlayersByPosition = function getPlayersByPosition(position) {
    //     return playerService.getPlayersByPosition(position)
    // }

    // this.getPlayersByPosition = function getPlayersByPosition(lastName) {
    //     return playerService.getPlayersByPosition(lastName)
    // }
    // ***

    this.getSortedPlayers = function getSortedPlayers(field, sortBy){
        // return playerService.getSortedPlayers(field, sortBy)
        console.log(playerService.getSortedPlayers(field, sortBy));
    }

}

