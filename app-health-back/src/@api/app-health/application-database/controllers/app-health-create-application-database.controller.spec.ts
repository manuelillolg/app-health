import { AppHealthCreateApplicationDatabaseController, AppHealthCreateApplicationDatabaseHandler } from '@api/app-health/application-database';
import { appHealthMockApplicationDatabaseData } from '@app/app-health/application-database';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthCreateApplicationDatabaseController', () =>
{
    let controller: AppHealthCreateApplicationDatabaseController;
    let handler: AppHealthCreateApplicationDatabaseHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AppHealthCreateApplicationDatabaseController,
            ],
            providers: [
                {
                    provide : AppHealthCreateApplicationDatabaseHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthCreateApplicationDatabaseController>(AppHealthCreateApplicationDatabaseController);
        handler = module.get<AppHealthCreateApplicationDatabaseHandler>(AppHealthCreateApplicationDatabaseHandler);
    });

    describe('main', () =>
    {
        test('AppHealthCreateApplicationDatabaseController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an applicationDatabase created', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApplicationDatabaseData[0])));
            expect(
                await controller.main(
                    appHealthMockApplicationDatabaseData[0],
                ),
            )
                .toBe(appHealthMockApplicationDatabaseData[0]);
        });
    });
});
