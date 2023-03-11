import { AttributeValue, DynamoDB } from "@aws-sdk/client-dynamodb";

export const db = new DynamoDB({
    region: 'localhost',
    credentials: {
        accessKeyId: 'fake-key',
        secretAccessKey: 'fake-secret',
    },
    endpoint: 'http://localhost:8000',
});

export enum TableNames {
    Contracts = 'contracts',
    Users = 'users',
}

export const mapObject = (dbObject: Record<string, AttributeValue>): Object => {
    const ret = {};
    for (const key of Object.keys(dbObject)) {
        ret[key] = dbObject[key]['S'];
    }
    return ret;
}