/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthUpdateApplicationAuthorizationByIdHandler, AppHealthUpdateApplicationAuthorizationByIdResolver } from '@api/app-health/application-authorization';
import { AppHealthUpdateApplicationAuthorizationByIdInput } from '@api/graphql';
import { appHealthMockApplicationAuthorizationData } from '@app/app-health/application-authorization';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthUpdateApplicationAuthorizationByIdResolver', () =>
{
    let resolver: AppHealthUpdateApplicationAuthorizationByIdResolver;
    let handler: AppHealthUpdateApplicationAuthorizationByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthUpdateApplicationAuthorizationByIdResolver,
                {
                    provide : AppHealthUpdateApplicationAuthorizationByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<AppHealthUpdateApplicationAuthorizationByIdResolver>(AppHealthUpdateApplicationAuthorizationByIdResolver);
        handler = module.get<AppHealthUpdateApplicationAuthorizationByIdHandler>(AppHealthUpdateApplicationAuthorizationByIdHandler);
    });

    test('AppHealthUpdateApplicationAuthorizationByIdResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthUpdateApplicationAuthorizationByIdResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a applicationAuthorization by id updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApplicationAuthorizationData[0])));
            expect(await resolver.main(<AppHealthUpdateApplicationAuthorizationByIdInput>appHealthMockApplicationAuthorizationData[0])).toBe(appHealthMockApplicationAuthorizationData[0]);
        });
    });
});
