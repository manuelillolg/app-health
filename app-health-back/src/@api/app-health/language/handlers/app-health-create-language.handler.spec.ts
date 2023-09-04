/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthCreateLanguageHandler } from '@api/app-health/language';
import { appHealthMockLanguageData } from '@app/app-health/language';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthCreateLanguageHandler', () =>
{
    let handler: AppHealthCreateLanguageHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthCreateLanguageHandler,
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

        handler = module.get<AppHealthCreateLanguageHandler>(AppHealthCreateLanguageHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    describe('main', () =>
    {
        test('AppHealthCreateLanguageHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an language created', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(appHealthMockLanguageData[0])));
            expect(
                await handler.main(
                    appHealthMockLanguageData[0],
                    'Europe/Madrid',
                ),
            )
                .toBe(appHealthMockLanguageData[0]);
        });
    });
});
