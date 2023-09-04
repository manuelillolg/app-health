import { AppHealthFindApplicationLanguageController, AppHealthFindApplicationLanguageHandler } from '@api/app-health/application-language';
import { appHealthMockApplicationLanguageData } from '@app/app-health/application-language';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthFindApplicationLanguageController', () =>
{
    let controller: AppHealthFindApplicationLanguageController;
    let handler: AppHealthFindApplicationLanguageHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AppHealthFindApplicationLanguageController,
            ],
            providers: [
                {
                    provide : AppHealthFindApplicationLanguageHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthFindApplicationLanguageController>(AppHealthFindApplicationLanguageController);
        handler = module.get<AppHealthFindApplicationLanguageHandler>(AppHealthFindApplicationLanguageHandler);
    });

    describe('main', () =>
    {
        test('AppHealthFindApplicationLanguageController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a applicationLanguage', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApplicationLanguageData[0])));
            expect(await controller.main()).toBe(appHealthMockApplicationLanguageData[0]);
        });
    });
});
