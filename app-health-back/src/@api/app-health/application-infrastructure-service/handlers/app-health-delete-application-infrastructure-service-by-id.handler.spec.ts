/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthDeleteApplicationInfrastructureServiceByIdHandler } from '@api/app-health/application-infrastructure-service';
import { appHealthMockApplicationInfrastructureServiceData } from '@app/app-health/application-infrastructure-service';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthDeleteApplicationInfrastructureServiceByIdController', () =>
{
    let handler: AppHealthDeleteApplicationInfrastructureServiceByIdHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthDeleteApplicationInfrastructureServiceByIdHandler,
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

        handler = module.get<AppHealthDeleteApplicationInfrastructureServiceByIdHandler>(AppHealthDeleteApplicationInfrastructureServiceByIdHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    describe('main', () =>
    {
        test('AppHealthDeleteApplicationInfrastructureServiceByIdHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an applicationInfrastructureService deleted', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApplicationInfrastructureServiceData[0])));
            expect(
                await handler.main(
                    appHealthMockApplicationInfrastructureServiceData[0].id,
                    {},
                    'Europe/Madrid',
                ),
            )
                .toBe(appHealthMockApplicationInfrastructureServiceData[0]);
        });
    });
});
