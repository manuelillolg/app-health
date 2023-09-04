/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthDeleteApplicationDatabaseByIdController, AppHealthDeleteApplicationDatabaseByIdHandler } from '@api/app-health/application-database';
import { appHealthMockApplicationDatabaseData } from '@app/app-health/application-database';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthDeleteApplicationDatabaseByIdController', () =>
{
    let controller: AppHealthDeleteApplicationDatabaseByIdController;
    let handler: AppHealthDeleteApplicationDatabaseByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AppHealthDeleteApplicationDatabaseByIdController,
            ],
            providers: [
                {
                    provide : AppHealthDeleteApplicationDatabaseByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthDeleteApplicationDatabaseByIdController>(AppHealthDeleteApplicationDatabaseByIdController);
        handler = module.get<AppHealthDeleteApplicationDatabaseByIdHandler>(AppHealthDeleteApplicationDatabaseByIdHandler);
    });

    describe('main', () =>
    {
        test('AppHealthDeleteApplicationDatabaseByIdController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an applicationDatabase deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApplicationDatabaseData[0])));
            expect(await controller.main(appHealthMockApplicationDatabaseData[0].id)).toBe(appHealthMockApplicationDatabaseData[0]);
        });
    });
});
