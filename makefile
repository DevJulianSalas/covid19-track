#Commands
run_dev:
	docker-compose -f docker-compose.yml up --build

down_dev:
	docker-compose -f docker-compose.yml down

run_extras_db:
	docker-compose -f docker-compose.yml exec db_mongo bash -c "cd docker-entrypoint-initdb.d && mongo localhost:27017/cov19db *.js"