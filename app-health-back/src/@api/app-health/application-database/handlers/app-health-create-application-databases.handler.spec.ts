import { AppHealthCreateApplicationDatabasesHandler } from '@api/app-health/application-database';
import { appHealthMockApplicationDatabaseData } from '@app/app-health/application-database';
import { ICommandBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthCreateApplicationDatabasesHandler', () =>
{
    let handler: AppHealthCreateApplicationDatabasesHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthCreateApplicationDatabasesHandler,
                {
                    provide : ICommandBus,
                    useValue: {
                        dispatch: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        handler = module.get<AppHealthCreateApplicationDatabasesHandler>(AppHealthCreateApplicationDatabasesHandler);
    });

    describe('main', () =>
    {
        test('AppHealthCreateApplicationDatabasesHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an appHealthMockApplicationDatabaseData created', async () =>
        {
            expect(await handler.main(appHealthMockApplicationDatabaseData)).toBe(true);
        });
    });
});
