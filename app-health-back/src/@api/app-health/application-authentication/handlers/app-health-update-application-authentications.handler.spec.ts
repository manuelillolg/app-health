/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthUpdateApplicationAuthenticationsHandler } from '@api/app-health/application-authentication';
import { AppHealthUpdateApplicationAuthenticationsInput } from '@api/graphql';
import { appHealthMockApplicationAuthenticationData } from '@app/app-health/application-authentication';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthUpdateApplicationAuthenticationsHandler', () =>
{
    let handler: AppHealthUpdateApplicationAuthenticationsHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthUpdateApplicationAuthenticationsHandler,
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

        handler = module.get<AppHealthUpdateApplicationAuthenticationsHandler>(AppHealthUpdateApplicationAuthenticationsHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('AppHealthUpdateApplicationAuthenticationsHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthUpdateApplicationAuthenticationsHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a applicationAuthentications updated', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApplicationAuthenticationData[0])));
            expect(
                await handler.main(
                    <AppHealthUpdateApplicationAuthenticationsInput>appHealthMockApplicationAuthenticationData[0],
                    {},
                    {},
                    'Europe/Madrid',
                ),
            )
                .toBe(appHealthMockApplicationAuthenticationData[0]);
        });
    });
});
