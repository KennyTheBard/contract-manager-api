import { ValidatedEventAPIGatewayProxyEvent, errorJSONResponse } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

import { TableNames, db } from '@libs/db';
import { authenticateUser } from '@libs/auth';

export const getContractIds: ValidatedEventAPIGatewayProxyEvent<void> = async (event) => {
  if (!authenticateUser(event)) {
    return errorJSONResponse('Invalid token');
  }
  
  const result = await db
    .scan({
      TableName: TableNames.Contracts,
    })

  return formatJSONResponse(Object.values(result.Items).map(item => ({ contractId: item.contractId.S})));
};

export const main = middyfy(getContractIds);
