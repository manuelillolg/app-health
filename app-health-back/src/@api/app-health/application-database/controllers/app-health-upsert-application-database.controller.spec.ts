import { AppHealthUpsertApplicationDatabaseController, AppHealthUpsertApplicationDatabaseHandler } from '@api/app-health/application-database';
import { appHealthMockApplicationDatabaseData } from '@app/app-health/application-database';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthUpsertApplicationDatabaseController', () =>
{
    let controller: AppHealthUpsertApplicationDatabaseController;
    let handler: AppHealthUpsertApplicationDatabaseHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AppHealthUpsertApplicationDatabaseController,
            ],
            providers: [
                {
                    provide : AppHealthUpsertApplicationDatabaseHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthUpsertApplicationDatabaseController>(AppHealthUpsertApplicationDatabaseController);
        handler = module.get<AppHealthUpsertApplicationDatabaseHandler>(AppHealthUpsertApplicationDatabaseHandler);
    });

    describe('main', () =>
    {
        test('AppHealthUpsertApplicationDatabaseController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an applicationDatabase upserted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApplicationDatabaseData[0])));
            expect(await controller.main(appHealthMockApplicationDatabaseData[0])).toBe(appHealthMockApplicationDatabaseData[0]);
        });
    });
});
