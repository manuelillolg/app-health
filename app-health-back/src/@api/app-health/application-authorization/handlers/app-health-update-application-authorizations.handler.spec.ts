/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthUpdateApplicationAuthorizationsHandler } from '@api/app-health/application-authorization';
import { AppHealthUpdateApplicationAuthorizationsInput } from '@api/graphql';
import { appHealthMockApplicationAuthorizationData } from '@app/app-health/application-authorization';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthUpdateApplicationAuthorizationsHandler', () =>
{
    let handler: AppHealthUpdateApplicationAuthorizationsHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthUpdateApplicationAuthorizationsHandler,
                {
                    provide : IQueryBus,
                    useValue: {
                        ask: () => { /**/ },
                    },
                },
                {
                    provide : ICommandBus,
                    useValue: {
                        dispatch: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        handler = module.get<AppHealthUpdateApplicationAuthorizationsHandler>(AppHealthUpdateApplicationAuthorizationsHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('AppHealthUpdateApplicationAuthorizationsHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthUpdateApplicationAuthorizationsHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a applicationAuthorizations updated', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApplicationAuthorizationData[0])));
            expect(
                await handler.main(
                    <AppHealthUpdateApplicationAuthorizationsInput>appHealthMockApplicationAuthorizationData[0],
                    {},
                    {},
                    'Europe/Madrid',
                ),
            )
                .toBe(appHealthMockApplicationAuthorizationData[0]);
        });
    });
});
