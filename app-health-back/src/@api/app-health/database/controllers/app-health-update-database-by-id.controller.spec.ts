import { AppHealthUpdateDatabaseByIdController, AppHealthUpdateDatabaseByIdHandler } from '@api/app-health/database';
import { appHealthMockDatabaseData } from '@app/app-health/database';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthUpdateDatabaseByIdController', () =>
{
    let controller: AppHealthUpdateDatabaseByIdController;
    let handler: AppHealthUpdateDatabaseByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AppHealthUpdateDatabaseByIdController,
            ],
            providers: [
                {
                    provide : AppHealthUpdateDatabaseByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthUpdateDatabaseByIdController>(AppHealthUpdateDatabaseByIdController);
        handler = module.get<AppHealthUpdateDatabaseByIdHandler>(AppHealthUpdateDatabaseByIdHandler);
    });

    describe('main', () =>
    {
        test('AppHealthUpdateDatabaseByIdController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a database updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockDatabaseData[0])));
            expect(await controller.main(appHealthMockDatabaseData[0])).toBe(appHealthMockDatabaseData[0]);
        });
    });
});
