/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthFindApplicationIntegrationByIdHandler, AppHealthFindApplicationIntegrationByIdResolver } from '@api/app-health/application-integration';
import { appHealthMockApplicationIntegrationData } from '@app/app-health/application-integration';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthFindApplicationIntegrationByIdResolver', () =>
{
    let resolver: AppHealthFindApplicationIntegrationByIdResolver;
    let handler: AppHealthFindApplicationIntegrationByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthFindApplicationIntegrationByIdResolver,
                {
                    provide : AppHealthFindApplicationIntegrationByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<AppHealthFindApplicationIntegrationByIdResolver>(AppHealthFindApplicationIntegrationByIdResolver);
        handler = module.get<AppHealthFindApplicationIntegrationByIdHandler>(AppHealthFindApplicationIntegrationByIdHandler);
    });

    test('AppHealthFindApplicationIntegrationByIdResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthFindApplicationIntegrationByIdResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an applicationIntegration by id', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApplicationIntegrationData[0])));
            expect(await resolver.main(appHealthMockApplicationIntegrationData[0].id)).toBe(appHealthMockApplicationIntegrationData[0]);
        });
    });
});
