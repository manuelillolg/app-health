/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthUpdateApplicationsHandler } from '@api/app-health/application';
import { AppHealthUpdateApplicationsInput } from '@api/graphql';
import { appHealthMockApplicationData } from '@app/app-health/application';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthUpdateApplicationsHandler', () =>
{
    let handler: AppHealthUpdateApplicationsHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthUpdateApplicationsHandler,
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

        handler = module.get<AppHealthUpdateApplicationsHandler>(AppHealthUpdateApplicationsHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('AppHealthUpdateApplicationsHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthUpdateApplicationsHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a applications updated', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApplicationData[0])));
            expect(
                await handler.main(
                    <AppHealthUpdateApplicationsInput>appHealthMockApplicationData[0],
                    {},
                    {},
                    'Europe/Madrid',
                ),
            )
                .toBe(appHealthMockApplicationData[0]);
        });
    });
});
