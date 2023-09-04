/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthUpdateApplicationLanguageByIdHandler } from '@api/app-health/application-language';
import { AppHealthUpdateApplicationLanguageByIdInput } from '@api/graphql';
import { appHealthMockApplicationLanguageData } from '@app/app-health/application-language';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthUpdateApplicationLanguageByIdHandler', () =>
{
    let handler: AppHealthUpdateApplicationLanguageByIdHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthUpdateApplicationLanguageByIdHandler,
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

        handler = module.get<AppHealthUpdateApplicationLanguageByIdHandler>(AppHealthUpdateApplicationLanguageByIdHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('AppHealthUpdateApplicationLanguageByIdHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthUpdateApplicationLanguageByIdHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a applicationLanguage updated', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApplicationLanguageData[0])));
            expect(
                await handler.main(
                    <AppHealthUpdateApplicationLanguageByIdInput>appHealthMockApplicationLanguageData[0],
                    {},
                    'Europe/Madrid',
                ))
                .toBe(appHealthMockApplicationLanguageData[0]);
        });
    });
});
