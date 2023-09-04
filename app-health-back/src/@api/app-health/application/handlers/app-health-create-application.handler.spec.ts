/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthCreateApplicationHandler } from '@api/app-health/application';
import { appHealthMockApplicationData } from '@app/app-health/application';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthCreateApplicationHandler', () =>
{
    let handler: AppHealthCreateApplicationHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthCreateApplicationHandler,
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

        handler = module.get<AppHealthCreateApplicationHandler>(AppHealthCreateApplicationHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    describe('main', () =>
    {
        test('AppHealthCreateApplicationHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an application created', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApplicationData[0])));
            expect(
                await handler.main(
                    appHealthMockApplicationData[0],
                    'Europe/Madrid',
                ),
            )
                .toBe(appHealthMockApplicationData[0]);
        });
    });
});
