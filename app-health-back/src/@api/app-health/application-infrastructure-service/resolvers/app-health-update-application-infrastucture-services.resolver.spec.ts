/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthUpdateApplicationInfrastuctureServicesHandler, AppHealthUpdateApplicationInfrastuctureServicesResolver } from '@api/app-health/application-infrastructure-service';
import { AppHealthUpdateApplicationInfrastuctureServicesInput } from '@api/graphql';
import { appHealthMockApplicationInfrastructureServiceData } from '@app/app-health/application-infrastructure-service';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthUpdateApplicationInfrastuctureServicesResolver', () =>
{
    let resolver: AppHealthUpdateApplicationInfrastuctureServicesResolver;
    let handler: AppHealthUpdateApplicationInfrastuctureServicesHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthUpdateApplicationInfrastuctureServicesResolver,
                {
                    provide : AppHealthUpdateApplicationInfrastuctureServicesHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<AppHealthUpdateApplicationInfrastuctureServicesResolver>(AppHealthUpdateApplicationInfrastuctureServicesResolver);
        handler = module.get<AppHealthUpdateApplicationInfrastuctureServicesHandler>(AppHealthUpdateApplicationInfrastuctureServicesHandler);
    });

    test('AppHealthUpdateApplicationInfrastuctureServicesResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthUpdateApplicationInfrastuctureServicesResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a applicationInfrastuctureServices updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApplicationInfrastructureServiceData[0])));
            expect(await resolver.main(<AppHealthUpdateApplicationInfrastuctureServicesInput>appHealthMockApplicationInfrastructureServiceData[0])).toBe(appHealthMockApplicationInfrastructureServiceData[0]);
        });
    });
});
