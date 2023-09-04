/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthUpdateApplicationIntegrationByIdHandler, AppHealthUpdateApplicationIntegrationByIdResolver } from '@api/app-health/application-integration';
import { AppHealthUpdateApplicationIntegrationByIdInput } from '@api/graphql';
import { appHealthMockApplicationIntegrationData } from '@app/app-health/application-integration';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthUpdateApplicationIntegrationByIdResolver', () =>
{
    let resolver: AppHealthUpdateApplicationIntegrationByIdResolver;
    let handler: AppHealthUpdateApplicationIntegrationByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthUpdateApplicationIntegrationByIdResolver,
                {
                    provide : AppHealthUpdateApplicationIntegrationByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<AppHealthUpdateApplicationIntegrationByIdResolver>(AppHealthUpdateApplicationIntegrationByIdResolver);
        handler = module.get<AppHealthUpdateApplicationIntegrationByIdHandler>(AppHealthUpdateApplicationIntegrationByIdHandler);
    });

    test('AppHealthUpdateApplicationIntegrationByIdResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthUpdateApplicationIntegrationByIdResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a applicationIntegration by id updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApplicationIntegrationData[0])));
            expect(await resolver.main(<AppHealthUpdateApplicationIntegrationByIdInput>appHealthMockApplicationIntegrationData[0])).toBe(appHealthMockApplicationIntegrationData[0]);
        });
    });
});
