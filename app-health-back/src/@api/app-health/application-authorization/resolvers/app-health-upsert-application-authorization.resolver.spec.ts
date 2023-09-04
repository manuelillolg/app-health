/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthUpsertApplicationAuthorizationHandler, AppHealthUpsertApplicationAuthorizationResolver } from '@api/app-health/application-authorization';
import { AppHealthUpdateApplicationAuthorizationByIdInput } from '@api/graphql';
import { appHealthMockApplicationAuthorizationData } from '@app/app-health/application-authorization';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthUpsertApplicationAuthorizationResolver', () =>
{
    let resolver: AppHealthUpsertApplicationAuthorizationResolver;
    let handler: AppHealthUpsertApplicationAuthorizationHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthUpsertApplicationAuthorizationResolver,
                {
                    provide : AppHealthUpsertApplicationAuthorizationHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<AppHealthUpsertApplicationAuthorizationResolver>(AppHealthUpsertApplicationAuthorizationResolver);
        handler = module.get<AppHealthUpsertApplicationAuthorizationHandler>(AppHealthUpsertApplicationAuthorizationHandler);
    });

    test('AppHealthUpsertApplicationAuthorizationResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthUpsertApplicationAuthorizationResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an applicationAuthorization upserted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApplicationAuthorizationData[0])));
            expect(await resolver.main(<AppHealthUpdateApplicationAuthorizationByIdInput>appHealthMockApplicationAuthorizationData[0])).toBe(appHealthMockApplicationAuthorizationData[0]);
        });
    });
});
