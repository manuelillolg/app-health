/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthCreateApplicationInfrastructureServiceHandler, AppHealthCreateApplicationInfrastructureServiceResolver } from '@api/app-health/application-infrastructure-service';
import { AppHealthCreateApplicationInfrastructureServiceInput } from '@api/graphql';
import { appHealthMockApplicationInfrastructureServiceData } from '@app/app-health/application-infrastructure-service';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthCreateApplicationInfrastructureServiceResolver', () =>
{
    let resolver: AppHealthCreateApplicationInfrastructureServiceResolver;
    let handler: AppHealthCreateApplicationInfrastructureServiceHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthCreateApplicationInfrastructureServiceResolver,
                {
                    provide : AppHealthCreateApplicationInfrastructureServiceHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<AppHealthCreateApplicationInfrastructureServiceResolver>(AppHealthCreateApplicationInfrastructureServiceResolver);
        handler = module.get<AppHealthCreateApplicationInfrastructureServiceHandler>(AppHealthCreateApplicationInfrastructureServiceHandler);
    });

    test('AppHealthCreateApplicationInfrastructureServiceResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthCreateApplicationInfrastructureServiceResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an applicationInfrastructureService created', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApplicationInfrastructureServiceData[0])));
            expect(await resolver.main(<AppHealthCreateApplicationInfrastructureServiceInput>appHealthMockApplicationInfrastructureServiceData[0])).toBe(appHealthMockApplicationInfrastructureServiceData[0]);
        });
    });
});
