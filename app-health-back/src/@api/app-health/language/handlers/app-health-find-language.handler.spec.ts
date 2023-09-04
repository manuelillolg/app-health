/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthFindLanguageHandler } from '@api/app-health/language';
import { appHealthMockLanguageData } from '@app/app-health/language';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthFindLanguageHandler', () =>
{
    let handler: AppHealthFindLanguageHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthFindLanguageHandler,
                {
                    provide : IQueryBus,
                    useValue: {
                        ask: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        handler = module.get<AppHealthFindLanguageHandler>(AppHealthFindLanguageHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('AppHealthFindLanguageHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthFindLanguageHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a language', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(appHealthMockLanguageData[0])));
            expect(
                await handler.main(
                    {},
                    {},
                    'Europe/Madrid',
                ),
            )
                .toBe(appHealthMockLanguageData[0]);
        });
    });
});
