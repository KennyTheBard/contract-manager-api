import {
    APIGatewayProxyEvent,
    APIGatewayProxyEventQueryStringParameters,
} from 'aws-lambda';

export function getEvent(data: 
    {
        authorization?: string;
        body?: Object;
        queryStringParameters?: APIGatewayProxyEventQueryStringParameters;
    }
): APIGatewayProxyEvent {
    return {
        headers: data.authorization ? {
            Authorization: data.authorization
        } : {},
        body: data.body,
        queryStringParameters: data.queryStringParameters ?? {}
    } as unknown as APIGatewayProxyEvent;
}
