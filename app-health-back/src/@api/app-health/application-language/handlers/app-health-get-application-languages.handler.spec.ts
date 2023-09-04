/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthGetApplicationLanguagesHandler } from '@api/app-health/application-language';
import { appHealthMockApplicationLanguageData } from '@app/app-health/application-language';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthGetApplicationLanguagesHandler', () =>
{
    let handler: AppHealthGetApplicationLanguagesHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthGetApplicationLanguagesHandler,
                {
                    provide : IQueryBus,
                    useValue: {
                        ask: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        handler = module.get<AppHealthGetApplicationLanguagesHandler>(AppHealthGetApplicationLanguagesHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('AppHealthGetApplicationLanguagesHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthGetApplicationLanguagesHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a appHealthMockApplicationLanguageData', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApplicationLanguageData)));
            expect(
                await handler.main(
                    {},
                    {},
                    'Europe/Madrid',
                ),
            )
                .toBe(appHealthMockApplicationLanguageData);
        });
    });
});
