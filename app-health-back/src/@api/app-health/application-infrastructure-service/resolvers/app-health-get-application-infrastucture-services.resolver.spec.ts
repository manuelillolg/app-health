/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthGetApplicationInfrastuctureServicesHandler, AppHealthGetApplicationInfrastuctureServicesResolver } from '@api/app-health/application-infrastructure-service';
import { appHealthMockApplicationInfrastructureServiceData } from '@app/app-health/application-infrastructure-service';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthGetApplicationInfrastuctureServicesResolver', () =>
{
    let resolver: AppHealthGetApplicationInfrastuctureServicesResolver;
    let handler: AppHealthGetApplicationInfrastuctureServicesHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthGetApplicationInfrastuctureServicesResolver,
                {
                    provide : AppHealthGetApplicationInfrastuctureServicesHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<AppHealthGetApplicationInfrastuctureServicesResolver>(AppHealthGetApplicationInfrastuctureServicesResolver);
        handler = module.get<AppHealthGetApplicationInfrastuctureServicesHandler>(AppHealthGetApplicationInfrastuctureServicesHandler);
    });

    test('AppHealthGetApplicationInfrastuctureServicesResolver should be defined', () =>
    {
        expect(resolver).   toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthGetApplicationInfrastuctureServicesResolver should be defined', () =>
        {
            expect(resolver).   toBeDefined();
        });

        test('should return a appHealthMockApplicationInfrastructureServiceData', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApplicationInfrastructureServiceData)));
            expect(await resolver.main()).toBe(appHealthMockApplicationInfrastructureServiceData);
        });
    });
});
