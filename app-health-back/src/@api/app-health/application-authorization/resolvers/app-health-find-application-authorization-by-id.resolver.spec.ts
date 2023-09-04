/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthFindApplicationAuthorizationByIdHandler, AppHealthFindApplicationAuthorizationByIdResolver } from '@api/app-health/application-authorization';
import { appHealthMockApplicationAuthorizationData } from '@app/app-health/application-authorization';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthFindApplicationAuthorizationByIdResolver', () =>
{
    let resolver: AppHealthFindApplicationAuthorizationByIdResolver;
    let handler: AppHealthFindApplicationAuthorizationByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthFindApplicationAuthorizationByIdResolver,
                {
                    provide : AppHealthFindApplicationAuthorizationByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<AppHealthFindApplicationAuthorizationByIdResolver>(AppHealthFindApplicationAuthorizationByIdResolver);
        handler = module.get<AppHealthFindApplicationAuthorizationByIdHandler>(AppHealthFindApplicationAuthorizationByIdHandler);
    });

    test('AppHealthFindApplicationAuthorizationByIdResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthFindApplicationAuthorizationByIdResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an applicationAuthorization by id', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApplicationAuthorizationData[0])));
            expect(await resolver.main(appHealthMockApplicationAuthorizationData[0].id)).toBe(appHealthMockApplicationAuthorizationData[0]);
        });
    });
});
