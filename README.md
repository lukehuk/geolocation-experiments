# geolocation-experiments

docker run --name postgis -p 5432:5433 -d geographica/postgis:latest

5. Test function with:
SELECT remaining_distance('551e5398-f333-4e90-b9aa-d0ca121091e5'::UUID,'4030f0a1-d670-468a-b63b-1ac2cb60ea2d'::UUID);



4. Run `./postgrest tutorial.conf`
db-uri = "host=localhost user=postgres port=5433 dbname=pubnubdemo password=mysecretpassword"
db-schema = "api"
db-anon-role = "web_anon"



5. Test postgrest with
http://localhost:3000/rpc/remaining_distance?p_trip_id=551e5398-f333-4e90-b9aa-d0ca121091e5&p_user_id=4030f0a1-d670-468a-b63b-1ac2cb60ea2d




{
	"tripId": "551e5398-f333-4e90-b9aa-d0ca121091e5",
	"userId": "4030f0a1-d670-468a-b63b-1ac2cb60ea2d"
}


export default (request) => {
    const xhr = require("xhr");
    const query = require('codec/query_string');
    const query_params = {
	    "p_trip_id": request.tripId,
	    "p_user_id": request.userId
    };

    const url = "http://0464e192.ngrok.io/rpc/remaining_distance_json?" + query.stringify(query_params);

    return xhr.fetch(url).then((x) => {
        const body = JSON.parse(x.body);
		request.resultDistance = body.resultDistance;
		return request.ok();
	});
};