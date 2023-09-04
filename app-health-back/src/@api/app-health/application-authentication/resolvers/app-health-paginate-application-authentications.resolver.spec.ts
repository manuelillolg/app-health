/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthPaginateApplicationAuthenticationsHandler, AppHealthPaginateApplicationAuthenticationsResolver } from '@api/app-health/application-authentication';
import { appHealthMockApplicationAuthenticationData } from '@app/app-health/application-authentication';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthPaginateApplicationAuthenticationsResolver', () =>
{
    let resolver: AppHealthPaginateApplicationAuthenticationsResolver;
    let handler: AppHealthPaginateApplicationAuthenticationsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthPaginateApplicationAuthenticationsResolver,
                {
                    provide : AppHealthPaginateApplicationAuthenticationsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<AppHealthPaginateApplicationAuthenticationsResolver>(AppHealthPaginateApplicationAuthenticationsResolver);
        handler = module.get<AppHealthPaginateApplicationAuthenticationsHandler>(AppHealthPaginateApplicationAuthenticationsHandler);
    });

    test('AppHealthPaginateApplicationAuthenticationsResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthPaginateApplicationAuthenticationsResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a appHealthMockApplicationAuthenticationData', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve({
                total: 5,
                count: 5,
                rows : appHealthMockApplicationAuthenticationData,
            })));
            expect(await resolver.main()).toStrictEqual({
                total: 5,
                count: 5,
                rows : appHealthMockApplicationAuthenticationData,
            });
        });
    });
});
