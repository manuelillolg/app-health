/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthFindApplicationHandler } from '@api/app-health/application';
import { appHealthMockApplicationData } from '@app/app-health/application';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthFindApplicationHandler', () =>
{
    let handler: AppHealthFindApplicationHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthFindApplicationHandler,
                {
                    provide : IQueryBus,
                    useValue: {
                        ask: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        handler = module.get<AppHealthFindApplicationHandler>(AppHealthFindApplicationHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('AppHealthFindApplicationHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthFindApplicationHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a application', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApplicationData[0])));
            expect(
                await handler.main(
                    {},
                    {},
                    'Europe/Madrid',
                ),
            )
                .toBe(appHealthMockApplicationData[0]);
        });
    });
});
