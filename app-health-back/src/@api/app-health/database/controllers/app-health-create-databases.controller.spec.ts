import { AppHealthCreateDatabasesController, AppHealthCreateDatabasesHandler } from '@api/app-health/database';
import { appHealthMockDatabaseData } from '@app/app-health/database';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthCreateDatabasesController', () =>
{
    let controller: AppHealthCreateDatabasesController;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                AppHealthCreateDatabasesController,
            ],
            providers: [
                {
                    provide : AppHealthCreateDatabasesHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthCreateDatabasesController>(AppHealthCreateDatabasesController);
    });

    describe('main', () =>
    {
        test('AppHealthCreateDatabasesController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an appHealthMockDatabaseData created', async () =>
        {
            expect(
                await controller.main(
                    appHealthMockDatabaseData,
                ),
            )
                .toBe(undefined);
        });
    });
});
