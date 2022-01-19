# PlanB

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
The database is implemented using Firebase and its APIs. In order to run the project is needed to add the configuration file following the absolute path (starting from the root folder of the repository): `planb/src/firebase-client/config.js`.
The configuration file can be found as a GitHub issue, in order to avoid pushing it directly inside the repository for security reasons.
### Tables
- Table `Games` is used to store the predefined game list used in the `/addgame` page. It contains `Categories` `Description` `Difficulty` `Duration` `ImageId` `PalyersMax` `PlayersMin` `Rules` `Title`
- Table `SuggestGame` is used to store the suggest game requests. It contains `Description` `Title`
- Table `UserGames` is used to store the users' game lists used in the `/mygames` page. It contains `Games` `UID`. The `Games` field is an array, containing all the user's games: each item of the array has the same fields of the `Games` table

## User Credentials
- username: `test@aaa.it`, password: `test123`