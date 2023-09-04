/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthDeleteApplicationLanguagesHandler } from '@api/app-health/application-language';
import { appHealthMockApplicationLanguageData } from '@app/app-health/application-language';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthDeleteApplicationLanguagesHandler', () =>
{
    let handler: AppHealthDeleteApplicationLanguagesHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthDeleteApplicationLanguagesHandler,
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

        handler = module.get<AppHealthDeleteApplicationLanguagesHandler>(AppHealthDeleteApplicationLanguagesHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('AppHealthDeleteApplicationLanguagesHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthDeleteApplicationLanguagesHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an appHealthMockApplicationLanguageData deleted', async () =>
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
