/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthPaginateApplicationAuthorizationsHandler } from '@api/app-health/application-authorization';
import { appHealthMockApplicationAuthorizationData } from '@app/app-health/application-authorization';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthPaginateApplicationAuthorizationsHandler', () =>
{
    let handler: AppHealthPaginateApplicationAuthorizationsHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthPaginateApplicationAuthorizationsHandler,
                {
                    provide : IQueryBus,
                    useValue: {
                        ask: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        handler = module.get<AppHealthPaginateApplicationAuthorizationsHandler>(AppHealthPaginateApplicationAuthorizationsHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('AppHealthPaginateApplicationAuthorizationsHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthPaginateApplicationAuthorizationsHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a applicationAuthorizations', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve({
                total: appHealthMockApplicationAuthorizationData.length,
                count: appHealthMockApplicationAuthorizationData.length,
                rows : appHealthMockApplicationAuthorizationData,
            })));
            expect(
                await handler.main(
                    {},
                    {},
                ),
            )
                .toEqual({
                    total: appHealthMockApplicationAuthorizationData.length,
                    count: appHealthMockApplicationAuthorizationData.length,
                    rows : appHealthMockApplicationAuthorizationData,
                });
        });
    });
});
