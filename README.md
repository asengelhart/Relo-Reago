# Relo-Reago - Esperanto-angla vortaro / Esperanto-English dictionary

## About
This is an English-Esperanto dictionary based off of the wordlist provided by <a href="http://reta-vortaro.de">Reta Vortaro.</a>, using a Rails backend and a React/Redux frontend.  Along with displaying basic definitions, this app can support user-generated comments attached to individual definitions, which can be up- or downvoted by other users.

Future versions of this software will include auto-update functionality, enabling the app to automatically include updates posted by Reta Vortaro.

## Installation
1. Clone this repository.
2. From `backend/`, run `rails db:migrate` and `rails db:seed` to initialize the database.  This may take a while.
3. Run `rails s` to start the server.
4. From `frontend/`, run `yarn start` to start the React development server.  By default, this will run on localhost:8000 - this can be changed from package.json.
  Note that you will need to run this from a Linux console.