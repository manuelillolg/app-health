/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthUpsertInfrastructureServiceHandler, AppHealthUpsertInfrastructureServiceResolver } from '@api/app-health/infrastructure-service';
import { AppHealthUpdateInfrastructureServiceByIdInput } from '@api/graphql';
import { appHealthMockInfrastructureServiceData } from '@app/app-health/infrastructure-service';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthUpsertInfrastructureServiceResolver', () =>
{
    let resolver: AppHealthUpsertInfrastructureServiceResolver;
    let handler: AppHealthUpsertInfrastructureServiceHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthUpsertInfrastructureServiceResolver,
                {
                    provide : AppHealthUpsertInfrastructureServiceHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<AppHealthUpsertInfrastructureServiceResolver>(AppHealthUpsertInfrastructureServiceResolver);
        handler = module.get<AppHealthUpsertInfrastructureServiceHandler>(AppHealthUpsertInfrastructureServiceHandler);
    });

    test('AppHealthUpsertInfrastructureServiceResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthUpsertInfrastructureServiceResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an infrastructureService upserted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockInfrastructureServiceData[0])));
            expect(await resolver.main(<AppHealthUpdateInfrastructureServiceByIdInput>appHealthMockInfrastructureServiceData[0])).toBe(appHealthMockInfrastructureServiceData[0]);
        });
    });
});
