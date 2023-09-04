/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthGetApplicationsHandler } from '@api/app-health/application';
import { appHealthMockApplicationData } from '@app/app-health/application';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthGetApplicationsHandler', () =>
{
    let handler: AppHealthGetApplicationsHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthGetApplicationsHandler,
                {
                    provide : IQueryBus,
                    useValue: {
                        ask: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        handler = module.get<AppHealthGetApplicationsHandler>(AppHealthGetApplicationsHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('AppHealthGetApplicationsHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthGetApplicationsHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a appHealthMockApplicationData', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApplicationData)));
            expect(
                await handler.main(
                    {},
                    {},
                    'Europe/Madrid',
                ),
            )
                .toBe(appHealthMockApplicationData);
        });
    });
});
