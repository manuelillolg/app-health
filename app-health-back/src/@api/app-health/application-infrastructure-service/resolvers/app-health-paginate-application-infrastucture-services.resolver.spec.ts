/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthPaginateApplicationInfrastuctureServicesHandler, AppHealthPaginateApplicationInfrastuctureServicesResolver } from '@api/app-health/application-infrastructure-service';
import { appHealthMockApplicationInfrastructureServiceData } from '@app/app-health/application-infrastructure-service';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthPaginateApplicationInfrastuctureServicesResolver', () =>
{
    let resolver: AppHealthPaginateApplicationInfrastuctureServicesResolver;
    let handler: AppHealthPaginateApplicationInfrastuctureServicesHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthPaginateApplicationInfrastuctureServicesResolver,
                {
                    provide : AppHealthPaginateApplicationInfrastuctureServicesHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<AppHealthPaginateApplicationInfrastuctureServicesResolver>(AppHealthPaginateApplicationInfrastuctureServicesResolver);
        handler = module.get<AppHealthPaginateApplicationInfrastuctureServicesHandler>(AppHealthPaginateApplicationInfrastuctureServicesHandler);
    });

    test('AppHealthPaginateApplicationInfrastuctureServicesResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthPaginateApplicationInfrastuctureServicesResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a appHealthMockApplicationInfrastructureServiceData', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve({
                total: 5,
                count: 5,
                rows : appHealthMockApplicationInfrastructureServiceData,
            })));
            expect(await resolver.main()).toStrictEqual({
                total: 5,
                count: 5,
                rows : appHealthMockApplicationInfrastructureServiceData,
            });
        });
    });
});
