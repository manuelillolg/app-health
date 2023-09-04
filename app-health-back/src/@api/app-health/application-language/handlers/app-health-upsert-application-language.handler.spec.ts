/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthUpsertApplicationLanguageHandler } from '@api/app-health/application-language';
import { appHealthMockApplicationLanguageData } from '@app/app-health/application-language';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthUpsertApplicationLanguageHandler', () =>
{
    let handler: AppHealthUpsertApplicationLanguageHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthUpsertApplicationLanguageHandler,
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

        handler = module.get<AppHealthUpsertApplicationLanguageHandler>(AppHealthUpsertApplicationLanguageHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    describe('main', () =>
    {
        test('AppHealthUpsertApplicationLanguageHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an applicationLanguage upserted', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApplicationLanguageData[0])));
            expect(
                await handler.main(
                    appHealthMockApplicationLanguageData[0],
                    'Europe/Madrid',
                ))
                .toBe(appHealthMockApplicationLanguageData[0]);
        });
    });
});
