/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthUpdateApplicationApisHandler } from '@api/app-health/application-api';
import { AppHealthUpdateApplicationApisInput } from '@api/graphql';
import { appHealthMockApplicationApiData } from '@app/app-health/application-api';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthUpdateApplicationApisHandler', () =>
{
    let handler: AppHealthUpdateApplicationApisHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthUpdateApplicationApisHandler,
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

        handler = module.get<AppHealthUpdateApplicationApisHandler>(AppHealthUpdateApplicationApisHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('AppHealthUpdateApplicationApisHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthUpdateApplicationApisHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a applicationApis updated', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApplicationApiData[0])));
            expect(
                await handler.main(
                    <AppHealthUpdateApplicationApisInput>appHealthMockApplicationApiData[0],
                    {},
                    {},
                    'Europe/Madrid',
                ),
            )
                .toBe(appHealthMockApplicationApiData[0]);
        });
    });
});
