/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthDeleteApplicationInfrastuctureServicesHandler, AppHealthDeleteApplicationInfrastuctureServicesResolver } from '@api/app-health/application-infrastructure-service';
import { appHealthMockApplicationInfrastructureServiceData } from '@app/app-health/application-infrastructure-service';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthDeleteApplicationInfrastuctureServicesResolver', () =>
{
    let resolver: AppHealthDeleteApplicationInfrastuctureServicesResolver;
    let handler: AppHealthDeleteApplicationInfrastuctureServicesHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthDeleteApplicationInfrastuctureServicesResolver,
                {
                    provide : AppHealthDeleteApplicationInfrastuctureServicesHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<AppHealthDeleteApplicationInfrastuctureServicesResolver>(AppHealthDeleteApplicationInfrastuctureServicesResolver);
        handler = module.get<AppHealthDeleteApplicationInfrastuctureServicesHandler>(AppHealthDeleteApplicationInfrastuctureServicesHandler);
    });

    test('AppHealthDeleteApplicationInfrastuctureServicesResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthDeleteApplicationInfrastuctureServicesResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an appHealthMockApplicationInfrastructureServiceData deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApplicationInfrastructureServiceData)));
            expect(await resolver.main()).toBe(appHealthMockApplicationInfrastructureServiceData);
        });
    });
});
