/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthUpsertApplicationInfrastructureServiceHandler, AppHealthUpsertApplicationInfrastructureServiceResolver } from '@api/app-health/application-infrastructure-service';
import { AppHealthUpdateApplicationInfrastructureServiceByIdInput } from '@api/graphql';
import { appHealthMockApplicationInfrastructureServiceData } from '@app/app-health/application-infrastructure-service';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthUpsertApplicationInfrastructureServiceResolver', () =>
{
    let resolver: AppHealthUpsertApplicationInfrastructureServiceResolver;
    let handler: AppHealthUpsertApplicationInfrastructureServiceHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthUpsertApplicationInfrastructureServiceResolver,
                {
                    provide : AppHealthUpsertApplicationInfrastructureServiceHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<AppHealthUpsertApplicationInfrastructureServiceResolver>(AppHealthUpsertApplicationInfrastructureServiceResolver);
        handler = module.get<AppHealthUpsertApplicationInfrastructureServiceHandler>(AppHealthUpsertApplicationInfrastructureServiceHandler);
    });

    test('AppHealthUpsertApplicationInfrastructureServiceResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthUpsertApplicationInfrastructureServiceResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an applicationInfrastructureService upserted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApplicationInfrastructureServiceData[0])));
            expect(await resolver.main(<AppHealthUpdateApplicationInfrastructureServiceByIdInput>appHealthMockApplicationInfrastructureServiceData[0])).toBe(appHealthMockApplicationInfrastructureServiceData[0]);
        });
    });
});
