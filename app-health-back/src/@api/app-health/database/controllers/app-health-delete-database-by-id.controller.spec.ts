/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthDeleteDatabaseByIdController, AppHealthDeleteDatabaseByIdHandler } from '@api/app-health/database';
import { appHealthMockDatabaseData } from '@app/app-health/database';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthDeleteDatabaseByIdController', () =>
{
    let controller: AppHealthDeleteDatabaseByIdController;
    let handler: AppHealthDeleteDatabaseByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AppHealthDeleteDatabaseByIdController,
            ],
            providers: [
                {
                    provide : AppHealthDeleteDatabaseByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthDeleteDatabaseByIdController>(AppHealthDeleteDatabaseByIdController);
        handler = module.get<AppHealthDeleteDatabaseByIdHandler>(AppHealthDeleteDatabaseByIdHandler);
    });

    describe('main', () =>
    {
        test('AppHealthDeleteDatabaseByIdController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an database deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockDatabaseData[0])));
            expect(await controller.main(appHealthMockDatabaseData[0].id)).toBe(appHealthMockDatabaseData[0]);
        });
    });
});
