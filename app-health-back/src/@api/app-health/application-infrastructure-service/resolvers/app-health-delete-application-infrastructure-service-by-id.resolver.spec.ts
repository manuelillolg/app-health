/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthDeleteApplicationInfrastructureServiceByIdHandler, AppHealthDeleteApplicationInfrastructureServiceByIdResolver } from '@api/app-health/application-infrastructure-service';
import { appHealthMockApplicationInfrastructureServiceData } from '@app/app-health/application-infrastructure-service';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthDeleteApplicationInfrastructureServiceByIdResolver', () =>
{
    let resolver: AppHealthDeleteApplicationInfrastructureServiceByIdResolver;
    let handler: AppHealthDeleteApplicationInfrastructureServiceByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthDeleteApplicationInfrastructureServiceByIdResolver,
                {
                    provide : AppHealthDeleteApplicationInfrastructureServiceByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<AppHealthDeleteApplicationInfrastructureServiceByIdResolver>(AppHealthDeleteApplicationInfrastructureServiceByIdResolver);
        handler = module.get<AppHealthDeleteApplicationInfrastructureServiceByIdHandler>(AppHealthDeleteApplicationInfrastructureServiceByIdHandler);
    });

    test('AppHealthDeleteApplicationInfrastructureServiceByIdResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthDeleteApplicationInfrastructureServiceByIdResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an applicationInfrastructureService deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApplicationInfrastructureServiceData[0])));
            expect(await resolver.main(appHealthMockApplicationInfrastructureServiceData[0].id)).toBe(appHealthMockApplicationInfrastructureServiceData[0]);
        });
    });
});
