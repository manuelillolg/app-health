import { AppHealthFindDatabaseByIdController, AppHealthFindDatabaseByIdHandler } from '@api/app-health/database';
import { appHealthMockDatabaseData } from '@app/app-health/database';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthFindDatabaseByIdController', () =>
{
    let controller: AppHealthFindDatabaseByIdController;
    let handler: AppHealthFindDatabaseByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AppHealthFindDatabaseByIdController,
            ],
            providers: [
                {
                    provide : AppHealthFindDatabaseByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthFindDatabaseByIdController>(AppHealthFindDatabaseByIdController);
        handler = module.get<AppHealthFindDatabaseByIdHandler>(AppHealthFindDatabaseByIdHandler);
    });

    describe('main', () =>
    {
        test('AppHealthFindDatabaseByIdController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an database by id', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockDatabaseData[0])));
            expect(await controller.main(appHealthMockDatabaseData[0].id)).toBe(appHealthMockDatabaseData[0]);
        });
    });
});
