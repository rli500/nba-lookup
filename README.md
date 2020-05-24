# NBA Quick Stats

This chrome extension allows a user to get selected stats from a player in the NBA, useful when reading articles that mention players
you might not have heard of before or need a refresher on.

Click image below for a demo:

[![yo](https://img.youtube.com/vi/a8N35Q8dH_4/0.jpg)](https://www.youtube.com/watch?v=a8N35Q8dH_4)

## Design

When the user highlights a name like "James Harden", they have the option to select "Get Quick Stats", which passes in the player's
firstname ("James") and lastname ("Harden") to my main.py function. I was able to use regex to capture most special characters like 
accidental punctuation, ensuring special names like P.J. Tucker or Kentavious Caldwell-Pope worked.

After selecting and cleaning a name, I sent the firstname and lastname data to my Google Cloud Function (main.py). Hosting this on Google
Cloud servers was easier and faster to deploy. It also allowed anyone to access this (I would have had to constantly host a server otherwise)
This function called the Sports Reference API, letting me get stats such as the player's position or free throw percentage. This data is returned to the client
via a JSON file, allowing easy access to each individual stat.

With the JSON, a popup is opened showing the player's unique stats for this season. The user has the option to look at full stats on
basketball-reference or look at the code on this Github.

## Future steps

The front-end could be beautified in a significant way. I also want to add more functionality, allowing users to switch seasons in the
popup as well as provide popups for historical/retired players. 
