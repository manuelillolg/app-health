/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthCreateApplicationIntegrationHandler, AppHealthCreateApplicationIntegrationResolver } from '@api/app-health/application-integration';
import { AppHealthCreateApplicationIntegrationInput } from '@api/graphql';
import { appHealthMockApplicationIntegrationData } from '@app/app-health/application-integration';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthCreateApplicationIntegrationResolver', () =>
{
    let resolver: AppHealthCreateApplicationIntegrationResolver;
    let handler: AppHealthCreateApplicationIntegrationHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthCreateApplicationIntegrationResolver,
                {
                    provide : AppHealthCreateApplicationIntegrationHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<AppHealthCreateApplicationIntegrationResolver>(AppHealthCreateApplicationIntegrationResolver);
        handler = module.get<AppHealthCreateApplicationIntegrationHandler>(AppHealthCreateApplicationIntegrationHandler);
    });

    test('AppHealthCreateApplicationIntegrationResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthCreateApplicationIntegrationResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an applicationIntegration created', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApplicationIntegrationData[0])));
            expect(await resolver.main(<AppHealthCreateApplicationIntegrationInput>appHealthMockApplicationIntegrationData[0])).toBe(appHealthMockApplicationIntegrationData[0]);
        });
    });
});
