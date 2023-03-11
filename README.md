

## Issues

I've had some problems with the environment. It seems that there are some issues with the the plugin:
https://github.com/99x/serverless-dynamodb-local/issues/294

There were also other problems so I decided to use DynamoDB form a Docker container, instead of installing it and do the setup manually (onstead of using serverless to create the tables).


## Setup

Create a DynamoDB-local instance in a Docker container.
```bash
docker run -p 8000:8000 amazon/dynamodb-local -jar DynamoDBLocal.jar -inMemory -sharedDb
```

Create `contracts` table.
```bash
AWS_ACCESS_KEY_ID=asdsadasdsa AWS_SECRET_ACCESS_KEY=sadasdsada aws dynamodb create-table \
    --endpoint-url http://localhost:8000 \
    --table-name contracts \
    --attribute-definitions AttributeName=contractId,AttributeType=S \
    --key-schema AttributeName=contractId,KeyType=HASH \
    --provisioned-throughput ReadCapacityUnits=5,WriteCapacityUnits=10 \
    --region localhost
```

Create `users` table.
```bash
AWS_ACCESS_KEY_ID=asdsadasdsa AWS_SECRET_ACCESS_KEY=sadasdsada aws dynamodb create-table \
    --endpoint-url http://localhost:8000 \
    --table-name users \
    --attribute-definitions AttributeName=userId,AttributeType=S \
    --key-schema AttributeName=userId,KeyType=HASH \
    --provisioned-throughput ReadCapacityUnits=5,WriteCapacityUnits=10 \
    --region localhost
```

Start the serverless offline:
```bash
sls offline start
```# contract-manager-api
