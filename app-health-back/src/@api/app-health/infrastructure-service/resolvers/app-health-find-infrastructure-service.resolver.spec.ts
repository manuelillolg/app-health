/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthFindInfrastructureServiceHandler, AppHealthFindInfrastructureServiceResolver } from '@api/app-health/infrastructure-service';
import { appHealthMockInfrastructureServiceData } from '@app/app-health/infrastructure-service';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthFindInfrastructureServiceResolver', () =>
{
    let resolver: AppHealthFindInfrastructureServiceResolver;
    let handler: AppHealthFindInfrastructureServiceHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthFindInfrastructureServiceResolver,
                {
                    provide : AppHealthFindInfrastructureServiceHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<AppHealthFindInfrastructureServiceResolver>(AppHealthFindInfrastructureServiceResolver);
        handler = module.get<AppHealthFindInfrastructureServiceHandler>(AppHealthFindInfrastructureServiceHandler);
    });

    test('AppHealthFindInfrastructureServiceResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthFindInfrastructureServiceResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a infrastructureService', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockInfrastructureServiceData[0])));
            expect(await resolver.main()).toBe(appHealthMockInfrastructureServiceData[0]);
        });
    });
});
