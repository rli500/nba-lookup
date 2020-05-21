from sportsreference.nba.roster import Player
import json

def main(request):
	request_json = request.get_json()
	if request_json and "firstname" in request_json and "lastname" in request_json:
		firstname, lastname = request_json["firstname"], request_json["lastname"]
	else:
		#fix this, should return some kind of error for user
		return None

	code = lastname[:5] + firstname[:2]
	NN = 1
	player = Player(code + str(0) + str(NN))
	
	while player.name.lower() != firstname + " " + lastname:
		NN += 1
		player = Player(code + str(0) + str(NN))

	data = {
		"points": player('2019-20').points,
		"assists": player('2019-20').assists,
		"blocks": player('2019-20').blocks
	}

	return json.dumps(data)
