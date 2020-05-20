from nba_api.stats.static import players
from nba_api.stats.endpoints import playercareerstats
import json

def getID(firstname, lastname=None):
	try:
		if lastname is None:
			dic = players.find_players_by_first_name(firstname)
		else:
			dic = players.find_players_by_full_name(firstname + " " + lastname)
		return dic[0]['id']
	except:
		raise Exception("Couldn't find player")

def main(request):
	request_json = request.get_json()
	if request_json:
		if "lastname" in request_json:
			id = getID(request_json["firstname"], request_json["lastname"])
		else:
			id = getID(request_json["firstname"])
	else:
		#fix this, should return some kind of error for user
		return None
		
	career = playercareerstats.PlayerCareerStats(player_id=id)
	return "Hello"
	data = career.get_dict()
	data = data['resultSets'][5]['rowSet'][0]
	return "hello"
	return str(data)
	return json.dumps(data)