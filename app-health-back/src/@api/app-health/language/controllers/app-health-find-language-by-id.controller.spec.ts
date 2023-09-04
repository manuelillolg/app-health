import { AppHealthFindLanguageByIdController, AppHealthFindLanguageByIdHandler } from '@api/app-health/language';
import { appHealthMockLanguageData } from '@app/app-health/language';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthFindLanguageByIdController', () =>
{
    let controller: AppHealthFindLanguageByIdController;
    let handler: AppHealthFindLanguageByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AppHealthFindLanguageByIdController,
            ],
            providers: [
                {
                    provide : AppHealthFindLanguageByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthFindLanguageByIdController>(AppHealthFindLanguageByIdController);
        handler = module.get<AppHealthFindLanguageByIdHandler>(AppHealthFindLanguageByIdHandler);
    });

    describe('main', () =>
    {
        test('AppHealthFindLanguageByIdController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an language by id', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockLanguageData[0])));
            expect(await controller.main(appHealthMockLanguageData[0].id)).toBe(appHealthMockLanguageData[0]);
        });
    });
});
