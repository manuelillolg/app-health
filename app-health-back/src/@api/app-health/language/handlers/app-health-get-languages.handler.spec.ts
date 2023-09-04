/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthGetLanguagesHandler } from '@api/app-health/language';
import { appHealthMockLanguageData } from '@app/app-health/language';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthGetLanguagesHandler', () =>
{
    let handler: AppHealthGetLanguagesHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthGetLanguagesHandler,
                {
                    provide : IQueryBus,
                    useValue: {
                        ask: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        handler = module.get<AppHealthGetLanguagesHandler>(AppHealthGetLanguagesHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('AppHealthGetLanguagesHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthGetLanguagesHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a appHealthMockLanguageData', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(appHealthMockLanguageData)));
            expect(
                await handler.main(
                    {},
                    {},
                    'Europe/Madrid',
                ),
            )
                .toBe(appHealthMockLanguageData);
        });
    });
});
