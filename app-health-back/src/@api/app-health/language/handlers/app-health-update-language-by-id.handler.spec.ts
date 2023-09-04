/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthUpdateLanguageByIdHandler } from '@api/app-health/language';
import { AppHealthUpdateLanguageByIdInput } from '@api/graphql';
import { appHealthMockLanguageData } from '@app/app-health/language';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthUpdateLanguageByIdHandler', () =>
{
    let handler: AppHealthUpdateLanguageByIdHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthUpdateLanguageByIdHandler,
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

        handler = module.get<AppHealthUpdateLanguageByIdHandler>(AppHealthUpdateLanguageByIdHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('AppHealthUpdateLanguageByIdHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthUpdateLanguageByIdHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a language updated', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(appHealthMockLanguageData[0])));
            expect(
                await handler.main(
                    <AppHealthUpdateLanguageByIdInput>appHealthMockLanguageData[0],
                    {},
                    'Europe/Madrid',
                ))
                .toBe(appHealthMockLanguageData[0]);
        });
    });
});
