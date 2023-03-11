
import { randomUUID } from 'node:crypto';
import { register } from '../src/functions/register/handler';
import { createContract } from '../src/functions/createContract/handler';
import { getEvent } from './utils/event';


describe('createContract', () => {

    let token = undefined;

    beforeAll(async () => {
        const randomUser = randomUUID();
        const result = await register(getEvent({
            body: {
                username: randomUser,
                password: 'test'
            }
        }));
        token = JSON.parse(result.body).token;
    })

    test('authorization header missing', async () => {
        const result = await createContract(getEvent({
            body: {
                userId: "uuid",
                contractName: "Another String",
                templateId: "uuid"
            }
        }));
        expect(result.statusCode).not.toBe(200);
    });

    test('create contract', async () => {
        const result = await createContract(getEvent({
            authorization: token,
            body: {
                userId: "uuid",
                contractName: "Another String",
                templateId: "uuid"
            }
        }));
        expect(result.statusCode).toBe(200);
        expect(result.body).toBeDefined();
        const body = JSON.parse(result.body);
        expect(body.contractId).toBeDefined();
        expect(typeof body.contractId).toBe('string');
    });
});