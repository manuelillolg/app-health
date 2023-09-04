import { AppHealthCreateApplicationDatabasesController, AppHealthCreateApplicationDatabasesHandler } from '@api/app-health/application-database';
import { appHealthMockApplicationDatabaseData } from '@app/app-health/application-database';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthCreateApplicationDatabasesController', () =>
{
    let controller: AppHealthCreateApplicationDatabasesController;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                AppHealthCreateApplicationDatabasesController,
            ],
            providers: [
                {
                    provide : AppHealthCreateApplicationDatabasesHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthCreateApplicationDatabasesController>(AppHealthCreateApplicationDatabasesController);
    });

    describe('main', () =>
    {
        test('AppHealthCreateApplicationDatabasesController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an appHealthMockApplicationDatabaseData created', async () =>
        {
            expect(
                await controller.main(
                    appHealthMockApplicationDatabaseData,
                ),
            )
                .toBe(undefined);
        });
    });
});
