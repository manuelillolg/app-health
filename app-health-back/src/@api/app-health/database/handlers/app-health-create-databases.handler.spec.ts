import { AppHealthCreateDatabasesHandler } from '@api/app-health/database';
import { appHealthMockDatabaseData } from '@app/app-health/database';
import { ICommandBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthCreateDatabasesHandler', () =>
{
    let handler: AppHealthCreateDatabasesHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthCreateDatabasesHandler,
                {
                    provide : ICommandBus,
                    useValue: {
                        dispatch: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        handler = module.get<AppHealthCreateDatabasesHandler>(AppHealthCreateDatabasesHandler);
    });

    describe('main', () =>
    {
        test('AppHealthCreateDatabasesHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an appHealthMockDatabaseData created', async () =>
        {
            expect(await handler.main(appHealthMockDatabaseData)).toBe(true);
        });
    });
});
