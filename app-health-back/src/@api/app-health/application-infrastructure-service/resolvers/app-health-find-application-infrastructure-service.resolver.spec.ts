/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthFindApplicationInfrastructureServiceHandler, AppHealthFindApplicationInfrastructureServiceResolver } from '@api/app-health/application-infrastructure-service';
import { appHealthMockApplicationInfrastructureServiceData } from '@app/app-health/application-infrastructure-service';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthFindApplicationInfrastructureServiceResolver', () =>
{
    let resolver: AppHealthFindApplicationInfrastructureServiceResolver;
    let handler: AppHealthFindApplicationInfrastructureServiceHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthFindApplicationInfrastructureServiceResolver,
                {
                    provide : AppHealthFindApplicationInfrastructureServiceHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<AppHealthFindApplicationInfrastructureServiceResolver>(AppHealthFindApplicationInfrastructureServiceResolver);
        handler = module.get<AppHealthFindApplicationInfrastructureServiceHandler>(AppHealthFindApplicationInfrastructureServiceHandler);
    });

    test('AppHealthFindApplicationInfrastructureServiceResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthFindApplicationInfrastructureServiceResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a applicationInfrastructureService', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApplicationInfrastructureServiceData[0])));
            expect(await resolver.main()).toBe(appHealthMockApplicationInfrastructureServiceData[0]);
        });
    });
});
