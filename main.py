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
		"name": player.name,
		"url": "https://www.basketball-reference.com/players/" + str(lastname[0]) 
			+ "/" + code + str(0) + str(NN) + ".html",
		"points": player('2019-20').points,
		"assists": player('2019-20').assists,
		"blocks": player('2019-20').blocks,
		"field_goal_percentage": player('2019-20').field_goal_percentage,
		"free_throw_percentage": player('2019-20').free_throw_percentage,
		"three_point_percentage": player('2019-20').three_point_percentage,
		"net_plus_minus": player('2019-20').net_plus_minus,
		"team": player('2019-20').team_abbreviation
	}

	return json.dumps(data)
