/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthCreateApplicationAuthorizationHandler, AppHealthCreateApplicationAuthorizationResolver } from '@api/app-health/application-authorization';
import { AppHealthCreateApplicationAuthorizationInput } from '@api/graphql';
import { appHealthMockApplicationAuthorizationData } from '@app/app-health/application-authorization';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthCreateApplicationAuthorizationResolver', () =>
{
    let resolver: AppHealthCreateApplicationAuthorizationResolver;
    let handler: AppHealthCreateApplicationAuthorizationHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthCreateApplicationAuthorizationResolver,
                {
                    provide : AppHealthCreateApplicationAuthorizationHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<AppHealthCreateApplicationAuthorizationResolver>(AppHealthCreateApplicationAuthorizationResolver);
        handler = module.get<AppHealthCreateApplicationAuthorizationHandler>(AppHealthCreateApplicationAuthorizationHandler);
    });

    test('AppHealthCreateApplicationAuthorizationResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthCreateApplicationAuthorizationResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an applicationAuthorization created', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApplicationAuthorizationData[0])));
            expect(await resolver.main(<AppHealthCreateApplicationAuthorizationInput>appHealthMockApplicationAuthorizationData[0])).toBe(appHealthMockApplicationAuthorizationData[0]);
        });
    });
});
