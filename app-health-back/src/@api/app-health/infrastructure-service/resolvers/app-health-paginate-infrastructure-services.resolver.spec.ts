/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthPaginateInfrastructureServicesHandler, AppHealthPaginateInfrastructureServicesResolver } from '@api/app-health/infrastructure-service';
import { appHealthMockInfrastructureServiceData } from '@app/app-health/infrastructure-service';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthPaginateInfrastructureServicesResolver', () =>
{
    let resolver: AppHealthPaginateInfrastructureServicesResolver;
    let handler: AppHealthPaginateInfrastructureServicesHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthPaginateInfrastructureServicesResolver,
                {
                    provide : AppHealthPaginateInfrastructureServicesHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<AppHealthPaginateInfrastructureServicesResolver>(AppHealthPaginateInfrastructureServicesResolver);
        handler = module.get<AppHealthPaginateInfrastructureServicesHandler>(AppHealthPaginateInfrastructureServicesHandler);
    });

    test('AppHealthPaginateInfrastructureServicesResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthPaginateInfrastructureServicesResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a appHealthMockInfrastructureServiceData', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve({
                total: 5,
                count: 5,
                rows : appHealthMockInfrastructureServiceData,
            })));
            expect(await resolver.main()).toStrictEqual({
                total: 5,
                count: 5,
                rows : appHealthMockInfrastructureServiceData,
            });
        });
    });
});
