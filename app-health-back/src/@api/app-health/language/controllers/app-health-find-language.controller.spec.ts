import { AppHealthFindLanguageController, AppHealthFindLanguageHandler } from '@api/app-health/language';
import { appHealthMockLanguageData } from '@app/app-health/language';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthFindLanguageController', () =>
{
    let controller: AppHealthFindLanguageController;
    let handler: AppHealthFindLanguageHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AppHealthFindLanguageController,
            ],
            providers: [
                {
                    provide : AppHealthFindLanguageHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthFindLanguageController>(AppHealthFindLanguageController);
        handler = module.get<AppHealthFindLanguageHandler>(AppHealthFindLanguageHandler);
    });

    describe('main', () =>
    {
        test('AppHealthFindLanguageController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a language', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockLanguageData[0])));
            expect(await controller.main()).toBe(appHealthMockLanguageData[0]);
        });
    });
});
