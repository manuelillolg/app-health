/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthUpdateApplicationInfrastructureServiceByIdHandler } from '@api/app-health/application-infrastructure-service';
import { AppHealthUpdateApplicationInfrastructureServiceByIdInput } from '@api/graphql';
import { appHealthMockApplicationInfrastructureServiceData } from '@app/app-health/application-infrastructure-service';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthUpdateApplicationInfrastructureServiceByIdHandler', () =>
{
    let handler: AppHealthUpdateApplicationInfrastructureServiceByIdHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthUpdateApplicationInfrastructureServiceByIdHandler,
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

        handler = module.get<AppHealthUpdateApplicationInfrastructureServiceByIdHandler>(AppHealthUpdateApplicationInfrastructureServiceByIdHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('AppHealthUpdateApplicationInfrastructureServiceByIdHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthUpdateApplicationInfrastructureServiceByIdHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a applicationInfrastructureService updated', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApplicationInfrastructureServiceData[0])));
            expect(
                await handler.main(
                    <AppHealthUpdateApplicationInfrastructureServiceByIdInput>appHealthMockApplicationInfrastructureServiceData[0],
                    {},
                    'Europe/Madrid',
                ))
                .toBe(appHealthMockApplicationInfrastructureServiceData[0]);
        });
    });
});
