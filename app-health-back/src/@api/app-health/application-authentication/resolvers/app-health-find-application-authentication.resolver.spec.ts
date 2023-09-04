/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthFindApplicationAuthenticationHandler, AppHealthFindApplicationAuthenticationResolver } from '@api/app-health/application-authentication';
import { appHealthMockApplicationAuthenticationData } from '@app/app-health/application-authentication';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthFindApplicationAuthenticationResolver', () =>
{
    let resolver: AppHealthFindApplicationAuthenticationResolver;
    let handler: AppHealthFindApplicationAuthenticationHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthFindApplicationAuthenticationResolver,
                {
                    provide : AppHealthFindApplicationAuthenticationHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<AppHealthFindApplicationAuthenticationResolver>(AppHealthFindApplicationAuthenticationResolver);
        handler = module.get<AppHealthFindApplicationAuthenticationHandler>(AppHealthFindApplicationAuthenticationHandler);
    });

    test('AppHealthFindApplicationAuthenticationResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthFindApplicationAuthenticationResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a applicationAuthentication', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApplicationAuthenticationData[0])));
            expect(await resolver.main()).toBe(appHealthMockApplicationAuthenticationData[0]);
        });
    });
});
