import { AppHealthDeleteLanguagesController, AppHealthDeleteLanguagesHandler } from '@api/app-health/language';
import { appHealthMockLanguageData } from '@app/app-health/language';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthDeleteLanguagesController', () =>
{
    let controller: AppHealthDeleteLanguagesController;
    let handler: AppHealthDeleteLanguagesHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AppHealthDeleteLanguagesController,
            ],
            providers: [
                {
                    provide : AppHealthDeleteLanguagesHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthDeleteLanguagesController>(AppHealthDeleteLanguagesController);
        handler = module.get<AppHealthDeleteLanguagesHandler>(AppHealthDeleteLanguagesHandler);
    });

    describe('main', () =>
    {
        test('AppHealthDeleteLanguagesController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an appHealthMockLanguageData deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockLanguageData)));
            expect(await controller.main()).toBe(appHealthMockLanguageData);
        });
    });
});
