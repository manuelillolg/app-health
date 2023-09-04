/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthUpdateLanguagesHandler } from '@api/app-health/language';
import { AppHealthUpdateLanguagesInput } from '@api/graphql';
import { appHealthMockLanguageData } from '@app/app-health/language';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthUpdateLanguagesHandler', () =>
{
    let handler: AppHealthUpdateLanguagesHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthUpdateLanguagesHandler,
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

        handler = module.get<AppHealthUpdateLanguagesHandler>(AppHealthUpdateLanguagesHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('AppHealthUpdateLanguagesHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthUpdateLanguagesHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a languages updated', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(appHealthMockLanguageData[0])));
            expect(
                await handler.main(
                    <AppHealthUpdateLanguagesInput>appHealthMockLanguageData[0],
                    {},
                    {},
                    'Europe/Madrid',
                ),
            )
                .toBe(appHealthMockLanguageData[0]);
        });
    });
});
