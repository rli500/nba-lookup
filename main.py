from sportsreference.nba.roster import Player
import string
import json

def main(request):
	request_json = request.get_json()
	if request_json and "firstname" in request_json and "lastname" in request_json:
		firstname, lastname = request_json["firstname"], request_json["lastname"]
	else:
		return None

	code = lastname[:5] + firstname[:2]
	NN = 1
	player = Player(code + str(0) + str(NN))

	# changes names like P.J. Tucker to pj tucker
	tempname = player.name.lower().translate(str.maketrans('','',string.punctuation))
	
	while tempname != firstname + " " + lastname:
		NN += 1
		player = Player(code + str(0) + str(NN))

	data = {
		"name": player.name,
		"url": "https://www.basketball-reference.com/players/" + str(lastname[0]) 
			+ "/" + code + str(0) + str(NN) + ".html",
		"position": player('2019-20').position,
		"points": player('2019-20').points,
		"assists": player('2019-20').assists,
		"blocks": player('2019-20').blocks,
		"free_throw_percentage": round(player('2019-20').free_throw_percentage * 100, 3),
		"three_point_percentage": round(player('2019-20').three_point_percentage * 100, 3),
		"usage_percentage": round(player('2019-20').usage_percentage, 3),
		"team": player('2019-20').team_abbreviation
	}

	return json.dumps(data)
