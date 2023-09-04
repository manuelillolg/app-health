/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthPaginateApplicationInfrastuctureServicesHandler } from '@api/app-health/application-infrastructure-service';
import { appHealthMockApplicationInfrastructureServiceData } from '@app/app-health/application-infrastructure-service';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthPaginateApplicationInfrastuctureServicesHandler', () =>
{
    let handler: AppHealthPaginateApplicationInfrastuctureServicesHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthPaginateApplicationInfrastuctureServicesHandler,
                {
                    provide : IQueryBus,
                    useValue: {
                        ask: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        handler = module.get<AppHealthPaginateApplicationInfrastuctureServicesHandler>(AppHealthPaginateApplicationInfrastuctureServicesHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('AppHealthPaginateApplicationInfrastuctureServicesHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthPaginateApplicationInfrastuctureServicesHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a applicationInfrastuctureServices', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve({
                total: appHealthMockApplicationInfrastructureServiceData.length,
                count: appHealthMockApplicationInfrastructureServiceData.length,
                rows : appHealthMockApplicationInfrastructureServiceData,
            })));
            expect(
                await handler.main(
                    {},
                    {},
                ),
            )
                .toEqual({
                    total: appHealthMockApplicationInfrastructureServiceData.length,
                    count: appHealthMockApplicationInfrastructureServiceData.length,
                    rows : appHealthMockApplicationInfrastructureServiceData,
                });
        });
    });
});
