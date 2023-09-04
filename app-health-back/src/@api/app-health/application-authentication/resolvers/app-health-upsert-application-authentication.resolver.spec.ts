/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthUpsertApplicationAuthenticationHandler, AppHealthUpsertApplicationAuthenticationResolver } from '@api/app-health/application-authentication';
import { AppHealthUpdateApplicationAuthenticationByIdInput } from '@api/graphql';
import { appHealthMockApplicationAuthenticationData } from '@app/app-health/application-authentication';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthUpsertApplicationAuthenticationResolver', () =>
{
    let resolver: AppHealthUpsertApplicationAuthenticationResolver;
    let handler: AppHealthUpsertApplicationAuthenticationHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthUpsertApplicationAuthenticationResolver,
                {
                    provide : AppHealthUpsertApplicationAuthenticationHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<AppHealthUpsertApplicationAuthenticationResolver>(AppHealthUpsertApplicationAuthenticationResolver);
        handler = module.get<AppHealthUpsertApplicationAuthenticationHandler>(AppHealthUpsertApplicationAuthenticationHandler);
    });

    test('AppHealthUpsertApplicationAuthenticationResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthUpsertApplicationAuthenticationResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an applicationAuthentication upserted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApplicationAuthenticationData[0])));
            expect(await resolver.main(<AppHealthUpdateApplicationAuthenticationByIdInput>appHealthMockApplicationAuthenticationData[0])).toBe(appHealthMockApplicationAuthenticationData[0]);
        });
    });
});
