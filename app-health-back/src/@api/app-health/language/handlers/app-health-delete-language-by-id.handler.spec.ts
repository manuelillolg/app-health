/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthDeleteLanguageByIdHandler } from '@api/app-health/language';
import { appHealthMockLanguageData } from '@app/app-health/language';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthDeleteLanguageByIdController', () =>
{
    let handler: AppHealthDeleteLanguageByIdHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthDeleteLanguageByIdHandler,
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

        handler = module.get<AppHealthDeleteLanguageByIdHandler>(AppHealthDeleteLanguageByIdHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    describe('main', () =>
    {
        test('AppHealthDeleteLanguageByIdHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an language deleted', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(appHealthMockLanguageData[0])));
            expect(
                await handler.main(
                    appHealthMockLanguageData[0].id,
                    {},
                    'Europe/Madrid',
                ),
            )
                .toBe(appHealthMockLanguageData[0]);
        });
    });
});
