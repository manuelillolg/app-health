/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthUpdateInfrastructureServiceByIdHandler } from '@api/app-health/infrastructure-service';
import { AppHealthUpdateInfrastructureServiceByIdInput } from '@api/graphql';
import { appHealthMockInfrastructureServiceData } from '@app/app-health/infrastructure-service';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthUpdateInfrastructureServiceByIdHandler', () =>
{
    let handler: AppHealthUpdateInfrastructureServiceByIdHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthUpdateInfrastructureServiceByIdHandler,
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

        handler = module.get<AppHealthUpdateInfrastructureServiceByIdHandler>(AppHealthUpdateInfrastructureServiceByIdHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('AppHealthUpdateInfrastructureServiceByIdHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthUpdateInfrastructureServiceByIdHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a infrastructureService updated', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(appHealthMockInfrastructureServiceData[0])));
            expect(
                await handler.main(
                    <AppHealthUpdateInfrastructureServiceByIdInput>appHealthMockInfrastructureServiceData[0],
                    {},
                    'Europe/Madrid',
                ))
                .toBe(appHealthMockInfrastructureServiceData[0]);
        });
    });
});
