/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthGetApplicationAuthenticationsHandler, AppHealthGetApplicationAuthenticationsResolver } from '@api/app-health/application-authentication';
import { appHealthMockApplicationAuthenticationData } from '@app/app-health/application-authentication';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthGetApplicationAuthenticationsResolver', () =>
{
    let resolver: AppHealthGetApplicationAuthenticationsResolver;
    let handler: AppHealthGetApplicationAuthenticationsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthGetApplicationAuthenticationsResolver,
                {
                    provide : AppHealthGetApplicationAuthenticationsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<AppHealthGetApplicationAuthenticationsResolver>(AppHealthGetApplicationAuthenticationsResolver);
        handler = module.get<AppHealthGetApplicationAuthenticationsHandler>(AppHealthGetApplicationAuthenticationsHandler);
    });

    test('AppHealthGetApplicationAuthenticationsResolver should be defined', () =>
    {
        expect(resolver).   toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthGetApplicationAuthenticationsResolver should be defined', () =>
        {
            expect(resolver).   toBeDefined();
        });

        test('should return a appHealthMockApplicationAuthenticationData', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApplicationAuthenticationData)));
            expect(await resolver.main()).toBe(appHealthMockApplicationAuthenticationData);
        });
    });
});
