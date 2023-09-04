/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthUpdateApplicationLanguagesHandler } from '@api/app-health/application-language';
import { AppHealthUpdateApplicationLanguagesInput } from '@api/graphql';
import { appHealthMockApplicationLanguageData } from '@app/app-health/application-language';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthUpdateApplicationLanguagesHandler', () =>
{
    let handler: AppHealthUpdateApplicationLanguagesHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthUpdateApplicationLanguagesHandler,
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

        handler = module.get<AppHealthUpdateApplicationLanguagesHandler>(AppHealthUpdateApplicationLanguagesHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('AppHealthUpdateApplicationLanguagesHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthUpdateApplicationLanguagesHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a applicationLanguages updated', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApplicationLanguageData[0])));
            expect(
                await handler.main(
                    <AppHealthUpdateApplicationLanguagesInput>appHealthMockApplicationLanguageData[0],
                    {},
                    {},
                    'Europe/Madrid',
                ),
            )
                .toBe(appHealthMockApplicationLanguageData[0]);
        });
    });
});
