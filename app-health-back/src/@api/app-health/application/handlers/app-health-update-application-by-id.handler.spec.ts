/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthUpdateApplicationByIdHandler } from '@api/app-health/application';
import { AppHealthUpdateApplicationByIdInput } from '@api/graphql';
import { appHealthMockApplicationData } from '@app/app-health/application';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthUpdateApplicationByIdHandler', () =>
{
    let handler: AppHealthUpdateApplicationByIdHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthUpdateApplicationByIdHandler,
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

        handler = module.get<AppHealthUpdateApplicationByIdHandler>(AppHealthUpdateApplicationByIdHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('AppHealthUpdateApplicationByIdHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthUpdateApplicationByIdHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a application updated', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApplicationData[0])));
            expect(
                await handler.main(
                    <AppHealthUpdateApplicationByIdInput>appHealthMockApplicationData[0],
                    {},
                    'Europe/Madrid',
                ))
                .toBe(appHealthMockApplicationData[0]);
        });
    });
});
