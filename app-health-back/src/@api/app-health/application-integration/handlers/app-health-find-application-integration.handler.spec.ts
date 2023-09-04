/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthFindApplicationIntegrationHandler } from '@api/app-health/application-integration';
import { appHealthMockApplicationIntegrationData } from '@app/app-health/application-integration';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthFindApplicationIntegrationHandler', () =>
{
    let handler: AppHealthFindApplicationIntegrationHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthFindApplicationIntegrationHandler,
                {
                    provide : IQueryBus,
                    useValue: {
                        ask: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        handler = module.get<AppHealthFindApplicationIntegrationHandler>(AppHealthFindApplicationIntegrationHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('AppHealthFindApplicationIntegrationHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthFindApplicationIntegrationHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a applicationIntegration', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApplicationIntegrationData[0])));
            expect(
                await handler.main(
                    {},
                    {},
                    'Europe/Madrid',
                ),
            )
                .toBe(appHealthMockApplicationIntegrationData[0]);
        });
    });
});
