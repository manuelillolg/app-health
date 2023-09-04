/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthUpdateApplicationIntegrationByIdHandler } from '@api/app-health/application-integration';
import { AppHealthUpdateApplicationIntegrationByIdInput } from '@api/graphql';
import { appHealthMockApplicationIntegrationData } from '@app/app-health/application-integration';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthUpdateApplicationIntegrationByIdHandler', () =>
{
    let handler: AppHealthUpdateApplicationIntegrationByIdHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthUpdateApplicationIntegrationByIdHandler,
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

        handler = module.get<AppHealthUpdateApplicationIntegrationByIdHandler>(AppHealthUpdateApplicationIntegrationByIdHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('AppHealthUpdateApplicationIntegrationByIdHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthUpdateApplicationIntegrationByIdHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a applicationIntegration updated', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApplicationIntegrationData[0])));
            expect(
                await handler.main(
                    <AppHealthUpdateApplicationIntegrationByIdInput>appHealthMockApplicationIntegrationData[0],
                    {},
                    'Europe/Madrid',
                ))
                .toBe(appHealthMockApplicationIntegrationData[0]);
        });
    });
});
