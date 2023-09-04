/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthDeleteApplicationAuthenticationsHandler, AppHealthDeleteApplicationAuthenticationsResolver } from '@api/app-health/application-authentication';
import { appHealthMockApplicationAuthenticationData } from '@app/app-health/application-authentication';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthDeleteApplicationAuthenticationsResolver', () =>
{
    let resolver: AppHealthDeleteApplicationAuthenticationsResolver;
    let handler: AppHealthDeleteApplicationAuthenticationsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthDeleteApplicationAuthenticationsResolver,
                {
                    provide : AppHealthDeleteApplicationAuthenticationsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<AppHealthDeleteApplicationAuthenticationsResolver>(AppHealthDeleteApplicationAuthenticationsResolver);
        handler = module.get<AppHealthDeleteApplicationAuthenticationsHandler>(AppHealthDeleteApplicationAuthenticationsHandler);
    });

    test('AppHealthDeleteApplicationAuthenticationsResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthDeleteApplicationAuthenticationsResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an appHealthMockApplicationAuthenticationData deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApplicationAuthenticationData)));
            expect(await resolver.main()).toBe(appHealthMockApplicationAuthenticationData);
        });
    });
});
