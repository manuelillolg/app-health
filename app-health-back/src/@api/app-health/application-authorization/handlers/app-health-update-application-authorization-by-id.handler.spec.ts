/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthUpdateApplicationAuthorizationByIdHandler } from '@api/app-health/application-authorization';
import { AppHealthUpdateApplicationAuthorizationByIdInput } from '@api/graphql';
import { appHealthMockApplicationAuthorizationData } from '@app/app-health/application-authorization';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthUpdateApplicationAuthorizationByIdHandler', () =>
{
    let handler: AppHealthUpdateApplicationAuthorizationByIdHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                AppHealthUpdateApplicationAuthorizationByIdHandler,
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

        handler = module.get<AppHealthUpdateApplicationAuthorizationByIdHandler>(AppHealthUpdateApplicationAuthorizationByIdHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('AppHealthUpdateApplicationAuthorizationByIdHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('AppHealthUpdateApplicationAuthorizationByIdHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a applicationAuthorization updated', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApplicationAuthorizationData[0])));
            expect(
                await handler.main(
                    <AppHealthUpdateApplicationAuthorizationByIdInput>appHealthMockApplicationAuthorizationData[0],
                    {},
                    'Europe/Madrid',
                ))
                .toBe(appHealthMockApplicationAuthorizationData[0]);
        });
    });
});
