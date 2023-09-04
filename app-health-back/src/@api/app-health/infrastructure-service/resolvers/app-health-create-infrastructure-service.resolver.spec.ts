/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthCreateInfrastructureServiceHandler, AppHealthCreateInfrastructureServiceResolver } from '@api/app-health/infrastructure-service';
import { AppHealthCreateInfrastructureServiceInput } from '@api/graphql';
import { appHealthMockInfrastructureServiceData } from '@app/app-health/infrastructure-service';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthCreateInfrastructureServiceResolver', () =>
{
    let resolver: AppHealthCreateInfrastructureServiceResolver;
    let handler: AppHealthCreateInfrastructureServiceHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthCreateInfrastructureServiceResolver,
                {
                    provide : AppHealthCreateInfrastructureServiceHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<AppHealthCreateInfrastructureServiceResolver>(AppHealthCreateInfrastructureServiceResolver);
        handler = module.get<AppHealthCreateInfrastructureServiceHandler>(AppHealthCreateInfrastructureServiceHandler);
    });

    test('AppHealthCreateInfrastructureServiceResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthCreateInfrastructureServiceResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an infrastructureService created', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockInfrastructureServiceData[0])));
            expect(await resolver.main(<AppHealthCreateInfrastructureServiceInput>appHealthMockInfrastructureServiceData[0])).toBe(appHealthMockInfrastructureServiceData[0]);
        });
    });
});
