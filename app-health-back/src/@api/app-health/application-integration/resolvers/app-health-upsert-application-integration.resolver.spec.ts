/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthUpsertApplicationIntegrationHandler, AppHealthUpsertApplicationIntegrationResolver } from '@api/app-health/application-integration';
import { AppHealthUpdateApplicationIntegrationByIdInput } from '@api/graphql';
import { appHealthMockApplicationIntegrationData } from '@app/app-health/application-integration';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthUpsertApplicationIntegrationResolver', () =>
{
    let resolver: AppHealthUpsertApplicationIntegrationResolver;
    let handler: AppHealthUpsertApplicationIntegrationHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthUpsertApplicationIntegrationResolver,
                {
                    provide : AppHealthUpsertApplicationIntegrationHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<AppHealthUpsertApplicationIntegrationResolver>(AppHealthUpsertApplicationIntegrationResolver);
        handler = module.get<AppHealthUpsertApplicationIntegrationHandler>(AppHealthUpsertApplicationIntegrationHandler);
    });

    test('AppHealthUpsertApplicationIntegrationResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthUpsertApplicationIntegrationResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an applicationIntegration upserted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApplicationIntegrationData[0])));
            expect(await resolver.main(<AppHealthUpdateApplicationIntegrationByIdInput>appHealthMockApplicationIntegrationData[0])).toBe(appHealthMockApplicationIntegrationData[0]);
        });
    });
});
