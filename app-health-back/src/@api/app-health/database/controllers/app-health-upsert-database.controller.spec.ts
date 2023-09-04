import { AppHealthUpsertDatabaseController, AppHealthUpsertDatabaseHandler } from '@api/app-health/database';
import { appHealthMockDatabaseData } from '@app/app-health/database';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthUpsertDatabaseController', () =>
{
    let controller: AppHealthUpsertDatabaseController;
    let handler: AppHealthUpsertDatabaseHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AppHealthUpsertDatabaseController,
            ],
            providers: [
                {
                    provide : AppHealthUpsertDatabaseHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthUpsertDatabaseController>(AppHealthUpsertDatabaseController);
        handler = module.get<AppHealthUpsertDatabaseHandler>(AppHealthUpsertDatabaseHandler);
    });

    describe('main', () =>
    {
        test('AppHealthUpsertDatabaseController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an database upserted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockDatabaseData[0])));
            expect(await controller.main(appHealthMockDatabaseData[0])).toBe(appHealthMockDatabaseData[0]);
        });
    });
});
