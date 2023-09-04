/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthDeleteInfrastructureServiceByIdHandler, AppHealthDeleteInfrastructureServiceByIdResolver } from '@api/app-health/infrastructure-service';
import { appHealthMockInfrastructureServiceData } from '@app/app-health/infrastructure-service';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthDeleteInfrastructureServiceByIdResolver', () =>
{
    let resolver: AppHealthDeleteInfrastructureServiceByIdResolver;
    let handler: AppHealthDeleteInfrastructureServiceByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthDeleteInfrastructureServiceByIdResolver,
                {
                    provide : AppHealthDeleteInfrastructureServiceByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<AppHealthDeleteInfrastructureServiceByIdResolver>(AppHealthDeleteInfrastructureServiceByIdResolver);
        handler = module.get<AppHealthDeleteInfrastructureServiceByIdHandler>(AppHealthDeleteInfrastructureServiceByIdHandler);
    });

    test('AppHealthDeleteInfrastructureServiceByIdResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthDeleteInfrastructureServiceByIdResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an infrastructureService deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockInfrastructureServiceData[0])));
            expect(await resolver.main(appHealthMockInfrastructureServiceData[0].id)).toBe(appHealthMockInfrastructureServiceData[0]);
        });
    });
});
