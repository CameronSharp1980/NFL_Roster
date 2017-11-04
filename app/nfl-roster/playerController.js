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

    // PUBLIC
    this.getPlayersByPosition = function getPlayersByPosition(position) {
        console.log(playerService.getPlayersByPosition(position))
    }

}

