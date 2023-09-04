/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthCreateApplicationLanguageHandler } from '@api/app-health/application-language';
import { appHealthMockApplicationLanguageData } from '@app/app-health/application-language';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthCreateApplicationLanguageHandler', () =>
{
    let handler: AppHealthCreateApplicationLanguageHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthCreateApplicationLanguageHandler,
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

        handler = module.get<AppHealthCreateApplicationLanguageHandler>(AppHealthCreateApplicationLanguageHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    describe('main', () =>
    {
        test('AppHealthCreateApplicationLanguageHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an applicationLanguage created', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApplicationLanguageData[0])));
            expect(
                await handler.main(
                    appHealthMockApplicationLanguageData[0],
                    'Europe/Madrid',
                ),
            )
                .toBe(appHealthMockApplicationLanguageData[0]);
        });
    });
});
