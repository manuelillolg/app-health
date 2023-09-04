/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthGetInfrastructureServicesHandler, AppHealthGetInfrastructureServicesResolver } from '@api/app-health/infrastructure-service';
import { appHealthMockInfrastructureServiceData } from '@app/app-health/infrastructure-service';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthGetInfrastructureServicesResolver', () =>
{
    let resolver: AppHealthGetInfrastructureServicesResolver;
    let handler: AppHealthGetInfrastructureServicesHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthGetInfrastructureServicesResolver,
                {
                    provide : AppHealthGetInfrastructureServicesHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<AppHealthGetInfrastructureServicesResolver>(AppHealthGetInfrastructureServicesResolver);
        handler = module.get<AppHealthGetInfrastructureServicesHandler>(AppHealthGetInfrastructureServicesHandler);
    });

    test('AppHealthGetInfrastructureServicesResolver should be defined', () =>
    {
        expect(resolver).   toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthGetInfrastructureServicesResolver should be defined', () =>
        {
            expect(resolver).   toBeDefined();
        });

        test('should return a appHealthMockInfrastructureServiceData', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockInfrastructureServiceData)));
            expect(await resolver.main()).toBe(appHealthMockInfrastructureServiceData);
        });
    });
});
