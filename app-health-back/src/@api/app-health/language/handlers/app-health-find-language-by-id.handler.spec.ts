/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthFindLanguageByIdHandler } from '@api/app-health/language';
import { appHealthMockLanguageData } from '@app/app-health/language';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthFindLanguageByIdHandler', () =>
{
    let handler: AppHealthFindLanguageByIdHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthFindLanguageByIdHandler,
                {
                    provide : IQueryBus,
                    useValue: {
                        ask: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        handler = module.get<AppHealthFindLanguageByIdHandler>(AppHealthFindLanguageByIdHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('AppHealthFindLanguageByIdHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthFindLanguageByIdHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an language by id', async () =>
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
