/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthUpdateApplicationInfrastructureServiceByIdHandler, AppHealthUpdateApplicationInfrastructureServiceByIdResolver } from '@api/app-health/application-infrastructure-service';
import { AppHealthUpdateApplicationInfrastructureServiceByIdInput } from '@api/graphql';
import { appHealthMockApplicationInfrastructureServiceData } from '@app/app-health/application-infrastructure-service';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthUpdateApplicationInfrastructureServiceByIdResolver', () =>
{
    let resolver: AppHealthUpdateApplicationInfrastructureServiceByIdResolver;
    let handler: AppHealthUpdateApplicationInfrastructureServiceByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthUpdateApplicationInfrastructureServiceByIdResolver,
                {
                    provide : AppHealthUpdateApplicationInfrastructureServiceByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<AppHealthUpdateApplicationInfrastructureServiceByIdResolver>(AppHealthUpdateApplicationInfrastructureServiceByIdResolver);
        handler = module.get<AppHealthUpdateApplicationInfrastructureServiceByIdHandler>(AppHealthUpdateApplicationInfrastructureServiceByIdHandler);
    });

    test('AppHealthUpdateApplicationInfrastructureServiceByIdResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthUpdateApplicationInfrastructureServiceByIdResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a applicationInfrastructureService by id updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApplicationInfrastructureServiceData[0])));
            expect(await resolver.main(<AppHealthUpdateApplicationInfrastructureServiceByIdInput>appHealthMockApplicationInfrastructureServiceData[0])).toBe(appHealthMockApplicationInfrastructureServiceData[0]);
        });
    });
});
