import { ValidatedEventAPIGatewayProxyEvent, errorJSONResponse } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import {randomUUID} from 'node:crypto';

import schema from './schema';
import { TableNames, db } from '@libs/db';
import { authenticateUser } from '@libs/auth';

export const createContract: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  if (!authenticateUser(event)) {
    return errorJSONResponse('Invalid token');
  }

  const contractId = randomUUID();
  await db
    .putItem({
      TableName: TableNames.Contracts,
      Item: {
        contractId: {
          S: contractId,
        },
        userId: {
          S: event.body.userId
        },
        contractName: {
          S: event.body.contractName
        },
        templateId: {
          S: event.body.templateId
        },
      },
    });

  return formatJSONResponse({
    contractId
  });
};

export const main = middyfy(createContract);
