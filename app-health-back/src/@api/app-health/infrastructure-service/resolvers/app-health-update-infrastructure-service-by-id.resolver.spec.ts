/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthUpdateInfrastructureServiceByIdHandler, AppHealthUpdateInfrastructureServiceByIdResolver } from '@api/app-health/infrastructure-service';
import { AppHealthUpdateInfrastructureServiceByIdInput } from '@api/graphql';
import { appHealthMockInfrastructureServiceData } from '@app/app-health/infrastructure-service';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthUpdateInfrastructureServiceByIdResolver', () =>
{
    let resolver: AppHealthUpdateInfrastructureServiceByIdResolver;
    let handler: AppHealthUpdateInfrastructureServiceByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthUpdateInfrastructureServiceByIdResolver,
                {
                    provide : AppHealthUpdateInfrastructureServiceByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<AppHealthUpdateInfrastructureServiceByIdResolver>(AppHealthUpdateInfrastructureServiceByIdResolver);
        handler = module.get<AppHealthUpdateInfrastructureServiceByIdHandler>(AppHealthUpdateInfrastructureServiceByIdHandler);
    });

    test('AppHealthUpdateInfrastructureServiceByIdResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthUpdateInfrastructureServiceByIdResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a infrastructureService by id updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockInfrastructureServiceData[0])));
            expect(await resolver.main(<AppHealthUpdateInfrastructureServiceByIdInput>appHealthMockInfrastructureServiceData[0])).toBe(appHealthMockInfrastructureServiceData[0]);
        });
    });
});
