/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthCreateInfrastructureServiceHandler } from '@api/app-health/infrastructure-service';
import { appHealthMockInfrastructureServiceData } from '@app/app-health/infrastructure-service';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthCreateInfrastructureServiceHandler', () =>
{
    let handler: AppHealthCreateInfrastructureServiceHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthCreateInfrastructureServiceHandler,
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

        handler = module.get<AppHealthCreateInfrastructureServiceHandler>(AppHealthCreateInfrastructureServiceHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    describe('main', () =>
    {
        test('AppHealthCreateInfrastructureServiceHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an infrastructureService created', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(appHealthMockInfrastructureServiceData[0])));
            expect(
                await handler.main(
                    appHealthMockInfrastructureServiceData[0],
                    'Europe/Madrid',
                ),
            )
                .toBe(appHealthMockInfrastructureServiceData[0]);
        });
    });
});
