/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthCreateApplicationAuthenticationHandler } from '@api/app-health/application-authentication';
import { appHealthMockApplicationAuthenticationData } from '@app/app-health/application-authentication';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthCreateApplicationAuthenticationHandler', () =>
{
    let handler: AppHealthCreateApplicationAuthenticationHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthCreateApplicationAuthenticationHandler,
                {
                    provide : IQueryBus,
                    useValue: {
                        ask: () => { /**/ },
                    },
                },
                {
                    provide : ICommandBus,
                    useValue: {
                        dispatch: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        handler = module.get<AppHealthCreateApplicationAuthenticationHandler>(AppHealthCreateApplicationAuthenticationHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    describe('main', () =>
    {
        test('AppHealthCreateApplicationAuthenticationHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an applicationAuthentication created', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApplicationAuthenticationData[0])));
            expect(
                await handler.main(
                    appHealthMockApplicationAuthenticationData[0],
                    'Europe/Madrid',
                ),
            )
                .toBe(appHealthMockApplicationAuthenticationData[0]);
        });
    });
});
