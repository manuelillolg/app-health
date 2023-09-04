/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthPaginateApplicationAuthorizationsHandler, AppHealthPaginateApplicationAuthorizationsResolver } from '@api/app-health/application-authorization';
import { appHealthMockApplicationAuthorizationData } from '@app/app-health/application-authorization';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthPaginateApplicationAuthorizationsResolver', () =>
{
    let resolver: AppHealthPaginateApplicationAuthorizationsResolver;
    let handler: AppHealthPaginateApplicationAuthorizationsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthPaginateApplicationAuthorizationsResolver,
                {
                    provide : AppHealthPaginateApplicationAuthorizationsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<AppHealthPaginateApplicationAuthorizationsResolver>(AppHealthPaginateApplicationAuthorizationsResolver);
        handler = module.get<AppHealthPaginateApplicationAuthorizationsHandler>(AppHealthPaginateApplicationAuthorizationsHandler);
    });

    test('AppHealthPaginateApplicationAuthorizationsResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthPaginateApplicationAuthorizationsResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a appHealthMockApplicationAuthorizationData', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve({
                total: 5,
                count: 5,
                rows : appHealthMockApplicationAuthorizationData,
            })));
            expect(await resolver.main()).toStrictEqual({
                total: 5,
                count: 5,
                rows : appHealthMockApplicationAuthorizationData,
            });
        });
    });
});
