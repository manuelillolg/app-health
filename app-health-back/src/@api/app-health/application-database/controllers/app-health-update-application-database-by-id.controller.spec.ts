import { AppHealthUpdateApplicationDatabaseByIdController, AppHealthUpdateApplicationDatabaseByIdHandler } from '@api/app-health/application-database';
import { appHealthMockApplicationDatabaseData } from '@app/app-health/application-database';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthUpdateApplicationDatabaseByIdController', () =>
{
    let controller: AppHealthUpdateApplicationDatabaseByIdController;
    let handler: AppHealthUpdateApplicationDatabaseByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AppHealthUpdateApplicationDatabaseByIdController,
            ],
            providers: [
                {
                    provide : AppHealthUpdateApplicationDatabaseByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthUpdateApplicationDatabaseByIdController>(AppHealthUpdateApplicationDatabaseByIdController);
        handler = module.get<AppHealthUpdateApplicationDatabaseByIdHandler>(AppHealthUpdateApplicationDatabaseByIdHandler);
    });

    describe('main', () =>
    {
        test('AppHealthUpdateApplicationDatabaseByIdController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a applicationDatabase updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApplicationDatabaseData[0])));
            expect(await controller.main(appHealthMockApplicationDatabaseData[0])).toBe(appHealthMockApplicationDatabaseData[0]);
        });
    });
});
