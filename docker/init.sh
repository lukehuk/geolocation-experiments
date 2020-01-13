docker rm -f $(docker ps -aq)
docker-compose up
#TODO
#curl ngrok:4040/api/tunnels
#curl -X PUT https://admin.pubnub.com/api/vault/<subscribe_key>/key/<key_name>
#docker run --name postgis -p 5432:5432 -e POSTGRES_PASSWD=mysecretpassword -d geographica/postgis:latest
#sleep 10
#docker exec -t postgis psql --username=postgres --dbname=postgres --command="CREATE DATABASE pubnubdemo;" -v ON_ERROR_STOP=1
#docker cp ./init.sql postgis:/init.sql
#docker exec -t postgis psql --username=postgres --dbname=pubnubdemo --file=//init.sql -v ON_ERROR_STOP=1
