import { AppHealthFindApplicationDatabaseByIdController, AppHealthFindApplicationDatabaseByIdHandler } from '@api/app-health/application-database';
import { appHealthMockApplicationDatabaseData } from '@app/app-health/application-database';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthFindApplicationDatabaseByIdController', () =>
{
    let controller: AppHealthFindApplicationDatabaseByIdController;
    let handler: AppHealthFindApplicationDatabaseByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AppHealthFindApplicationDatabaseByIdController,
            ],
            providers: [
                {
                    provide : AppHealthFindApplicationDatabaseByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthFindApplicationDatabaseByIdController>(AppHealthFindApplicationDatabaseByIdController);
        handler = module.get<AppHealthFindApplicationDatabaseByIdHandler>(AppHealthFindApplicationDatabaseByIdHandler);
    });

    describe('main', () =>
    {
        test('AppHealthFindApplicationDatabaseByIdController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an applicationDatabase by id', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApplicationDatabaseData[0])));
            expect(await controller.main(appHealthMockApplicationDatabaseData[0].id)).toBe(appHealthMockApplicationDatabaseData[0]);
        });
    });
});
