/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthGetApplicationAuthorizationsHandler, AppHealthGetApplicationAuthorizationsResolver } from '@api/app-health/application-authorization';
import { appHealthMockApplicationAuthorizationData } from '@app/app-health/application-authorization';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthGetApplicationAuthorizationsResolver', () =>
{
    let resolver: AppHealthGetApplicationAuthorizationsResolver;
    let handler: AppHealthGetApplicationAuthorizationsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthGetApplicationAuthorizationsResolver,
                {
                    provide : AppHealthGetApplicationAuthorizationsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<AppHealthGetApplicationAuthorizationsResolver>(AppHealthGetApplicationAuthorizationsResolver);
        handler = module.get<AppHealthGetApplicationAuthorizationsHandler>(AppHealthGetApplicationAuthorizationsHandler);
    });

    test('AppHealthGetApplicationAuthorizationsResolver should be defined', () =>
    {
        expect(resolver).   toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthGetApplicationAuthorizationsResolver should be defined', () =>
        {
            expect(resolver).   toBeDefined();
        });

        test('should return a appHealthMockApplicationAuthorizationData', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApplicationAuthorizationData)));
            expect(await resolver.main()).toBe(appHealthMockApplicationAuthorizationData);
        });
    });
});
