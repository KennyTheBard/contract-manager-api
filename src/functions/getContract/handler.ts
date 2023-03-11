import { ValidatedEventAPIGatewayProxyEvent, errorJSONResponse } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

import { TableNames, db, mapObject } from '@libs/db';
import { authenticateUser } from '@libs/auth';

export const getContract: ValidatedEventAPIGatewayProxyEvent<void> = async (event) => {
  if (!authenticateUser(event)) {
    return errorJSONResponse('Invalid token');
  }
  
  const contractId = event.queryStringParameters.id;
  const result = await db.getItem({
    TableName: TableNames.Contracts,
    Key: {
      contractId: {
        S: contractId
      }
    }
  });

  if (!result.Item) {
    return errorJSONResponse('Contract does not exist');
  }

  return formatJSONResponse(mapObject(result.Item));
};

export const main = middyfy(getContract);
