/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthFindApplicationAuthorizationHandler, AppHealthFindApplicationAuthorizationResolver } from '@api/app-health/application-authorization';
import { appHealthMockApplicationAuthorizationData } from '@app/app-health/application-authorization';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthFindApplicationAuthorizationResolver', () =>
{
    let resolver: AppHealthFindApplicationAuthorizationResolver;
    let handler: AppHealthFindApplicationAuthorizationHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthFindApplicationAuthorizationResolver,
                {
                    provide : AppHealthFindApplicationAuthorizationHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<AppHealthFindApplicationAuthorizationResolver>(AppHealthFindApplicationAuthorizationResolver);
        handler = module.get<AppHealthFindApplicationAuthorizationHandler>(AppHealthFindApplicationAuthorizationHandler);
    });

    test('AppHealthFindApplicationAuthorizationResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthFindApplicationAuthorizationResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a applicationAuthorization', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApplicationAuthorizationData[0])));
            expect(await resolver.main()).toBe(appHealthMockApplicationAuthorizationData[0]);
        });
    });
});
