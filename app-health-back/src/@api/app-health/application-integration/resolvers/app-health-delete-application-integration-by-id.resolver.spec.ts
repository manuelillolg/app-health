/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthDeleteApplicationIntegrationByIdHandler, AppHealthDeleteApplicationIntegrationByIdResolver } from '@api/app-health/application-integration';
import { appHealthMockApplicationIntegrationData } from '@app/app-health/application-integration';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthDeleteApplicationIntegrationByIdResolver', () =>
{
    let resolver: AppHealthDeleteApplicationIntegrationByIdResolver;
    let handler: AppHealthDeleteApplicationIntegrationByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthDeleteApplicationIntegrationByIdResolver,
                {
                    provide : AppHealthDeleteApplicationIntegrationByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<AppHealthDeleteApplicationIntegrationByIdResolver>(AppHealthDeleteApplicationIntegrationByIdResolver);
        handler = module.get<AppHealthDeleteApplicationIntegrationByIdHandler>(AppHealthDeleteApplicationIntegrationByIdHandler);
    });

    test('AppHealthDeleteApplicationIntegrationByIdResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthDeleteApplicationIntegrationByIdResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an applicationIntegration deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApplicationIntegrationData[0])));
            expect(await resolver.main(appHealthMockApplicationIntegrationData[0].id)).toBe(appHealthMockApplicationIntegrationData[0]);
        });
    });
});
