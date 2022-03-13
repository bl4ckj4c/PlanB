# PlanB

The main activity is helping board gamers in choosing one game to be played during the current game session. Types of people to be observed:

occasional players
veteran or habitual players
game organizer, the one who organizes the game session
In our case the original project idea is already self-explanatory. However we would like to remark that different types of people could have different needs in the planning session, according to their habits and/or games owned, but they have in common the need of choosing the game for the current game session.

## Application Routes
- Route `/`: entrypoint of the application
- Route `/login`: page handling login phase
- Route `/register`: page handling registration phase
- Route `/mygames`: page showing the user's game list
- Route `/profile`: page showing the mail used for the login and used for logging out
- Route `/addgame`: page handling the addition of a game from a predefined list to the user's list
- Route `/newsession`: page handling the filter phase on user's game list
- Route `/gamesfound`: page handling the result of the filter phase
- Route `/error`: page handling a device that is using a desktop browser, showing an error message

## Database
The database is implemented using Firebase and its APIs.
### Tables
- Table `Games` is used to store the predefined game list used in the `/addgame` page. It contains `Categories` `Description` `Difficulty` `Duration` `ImageId` `PlayersMax` `PlayersMin` `Rules` `Title`
- Table `SuggestGame` is used to store the suggest game requests. It contains `Description` `Title`
- Table `UserGames` is used to store the users' game lists used in the `/mygames` page. It contains `Games` `UID`. The `Games` field is an array, containing all the user's games: each item of the array has the same fields of the `Games` table

## CORS
In-app PDF loading uses heroku-cors-anywhere proxy to overcome CORS limitations. This solution works most of the times but seems have some problems, especially when using Android platforms. First problem is that not all PDFs can be loaded and second problem is that in order to enable that proxy an HTTP request is needed (it works but it returns 403 status code response, so there is an alert in browser console).
