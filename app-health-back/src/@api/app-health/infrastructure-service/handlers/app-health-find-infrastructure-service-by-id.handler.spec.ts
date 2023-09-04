/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthFindInfrastructureServiceByIdHandler } from '@api/app-health/infrastructure-service';
import { appHealthMockInfrastructureServiceData } from '@app/app-health/infrastructure-service';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthFindInfrastructureServiceByIdHandler', () =>
{
    let handler: AppHealthFindInfrastructureServiceByIdHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthFindInfrastructureServiceByIdHandler,
                {
                    provide : IQueryBus,
                    useValue: {
                        ask: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        handler = module.get<AppHealthFindInfrastructureServiceByIdHandler>(AppHealthFindInfrastructureServiceByIdHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('AppHealthFindInfrastructureServiceByIdHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthFindInfrastructureServiceByIdHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an infrastructureService by id', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(appHealthMockInfrastructureServiceData[0])));
            expect(
                await handler.main(
                    appHealthMockInfrastructureServiceData[0].id,
                    {},
                    'Europe/Madrid',
                ),
            )
                .toBe(appHealthMockInfrastructureServiceData[0]);
        });
    });
});
