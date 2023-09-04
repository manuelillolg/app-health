/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthFindApplicationLanguageByIdHandler } from '@api/app-health/application-language';
import { appHealthMockApplicationLanguageData } from '@app/app-health/application-language';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthFindApplicationLanguageByIdHandler', () =>
{
    let handler: AppHealthFindApplicationLanguageByIdHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthFindApplicationLanguageByIdHandler,
                {
                    provide : IQueryBus,
                    useValue: {
                        ask: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        handler = module.get<AppHealthFindApplicationLanguageByIdHandler>(AppHealthFindApplicationLanguageByIdHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('AppHealthFindApplicationLanguageByIdHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthFindApplicationLanguageByIdHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an applicationLanguage by id', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApplicationLanguageData[0])));
            expect(
                await handler.main(
                    appHealthMockApplicationLanguageData[0].id,
                    {},
                    'Europe/Madrid',
                ),
            )
                .toBe(appHealthMockApplicationLanguageData[0]);
        });
    });
});
