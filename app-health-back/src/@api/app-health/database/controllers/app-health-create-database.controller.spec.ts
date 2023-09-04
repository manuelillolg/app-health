import { AppHealthCreateDatabaseController, AppHealthCreateDatabaseHandler } from '@api/app-health/database';
import { appHealthMockDatabaseData } from '@app/app-health/database';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthCreateDatabaseController', () =>
{
    let controller: AppHealthCreateDatabaseController;
    let handler: AppHealthCreateDatabaseHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AppHealthCreateDatabaseController,
            ],
            providers: [
                {
                    provide : AppHealthCreateDatabaseHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthCreateDatabaseController>(AppHealthCreateDatabaseController);
        handler = module.get<AppHealthCreateDatabaseHandler>(AppHealthCreateDatabaseHandler);
    });

    describe('main', () =>
    {
        test('AppHealthCreateDatabaseController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an database created', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockDatabaseData[0])));
            expect(
                await controller.main(
                    appHealthMockDatabaseData[0],
                ),
            )
                .toBe(appHealthMockDatabaseData[0]);
        });
    });
});
