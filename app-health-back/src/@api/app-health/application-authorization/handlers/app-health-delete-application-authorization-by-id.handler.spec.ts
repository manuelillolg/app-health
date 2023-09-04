/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthDeleteApplicationAuthorizationByIdHandler } from '@api/app-health/application-authorization';
import { appHealthMockApplicationAuthorizationData } from '@app/app-health/application-authorization';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthDeleteApplicationAuthorizationByIdController', () =>
{
    let handler: AppHealthDeleteApplicationAuthorizationByIdHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthDeleteApplicationAuthorizationByIdHandler,
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

        handler = module.get<AppHealthDeleteApplicationAuthorizationByIdHandler>(AppHealthDeleteApplicationAuthorizationByIdHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    describe('main', () =>
    {
        test('AppHealthDeleteApplicationAuthorizationByIdHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an applicationAuthorization deleted', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApplicationAuthorizationData[0])));
            expect(
                await handler.main(
                    appHealthMockApplicationAuthorizationData[0].id,
                    {},
                    'Europe/Madrid',
                ),
            )
                .toBe(appHealthMockApplicationAuthorizationData[0]);
        });
    });
});
