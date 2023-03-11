import { ValidatedEventAPIGatewayProxyEvent, errorJSONResponse } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

import schema from './schema';
import { TableNames, db } from '@libs/db';
import { JWT_SECRET } from '@libs/constants';
import * as jwt from 'jsonwebtoken';


export const login: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  const result = await db
    .scan({
      TableName: TableNames.Users,
      FilterExpression: '#username = :username',
      ExpressionAttributeNames: { '#username': 'username' },
      ExpressionAttributeValues: { ':username': { S: event.body.username } },
    });

  if (result.Count === 0) {
    return errorJSONResponse('User does not exist');
  }

  const user = result.Items[0];
  if (user.password.S !== event.body.password) {
    return errorJSONResponse('Wrong credentials');
  }

  return formatJSONResponse({
    token: jwt.sign({
      id: user.userId.S,
      username: user.username.S
    }, JWT_SECRET),
  });
};

export const main = middyfy(login);
