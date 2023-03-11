import { ValidatedEventAPIGatewayProxyEvent, errorJSONResponse } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { randomUUID } from 'node:crypto';

import schema from './schema';
import { TableNames, db } from '@libs/db';
import { JWT_SECRET } from '@libs/constants';
import * as jwt from 'jsonwebtoken';


export const register: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  const existingUsers = await db
    .scan({
      TableName: TableNames.Users,
      FilterExpression: '#username = :username',
      ExpressionAttributeNames: { '#username': 'username' },
      ExpressionAttributeValues: { ':username': { S: event.body.username } },
    });

  if (existingUsers.Count > 0) {
    return errorJSONResponse('User already exists');
  }

  const userId = randomUUID();
  await db
    .putItem({
      TableName: TableNames.Users,
      Item: {
        userId: {
          S: userId,
        },
        username: {
          S: event.body.username
        },
        password: {
          S: event.body.password
        },
      },
    });

  const result = await db
    .getItem({
      TableName: TableNames.Users,
      Key: {
        userId: {
          S: userId,
        }
      },
    });

  return formatJSONResponse({
    token: jwt.sign({
      id: result.Item.userId.S,
      username: result.Item.username.S
    }, JWT_SECRET),
  });
};

export const main = middyfy(register);
