/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthFindApplicationAuthorizationByIdHandler } from '@api/app-health/application-authorization';
import { appHealthMockApplicationAuthorizationData } from '@app/app-health/application-authorization';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthFindApplicationAuthorizationByIdHandler', () =>
{
    let handler: AppHealthFindApplicationAuthorizationByIdHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthFindApplicationAuthorizationByIdHandler,
                {
                    provide : IQueryBus,
                    useValue: {
                        ask: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        handler = module.get<AppHealthFindApplicationAuthorizationByIdHandler>(AppHealthFindApplicationAuthorizationByIdHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('AppHealthFindApplicationAuthorizationByIdHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthFindApplicationAuthorizationByIdHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an applicationAuthorization by id', async () =>
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
