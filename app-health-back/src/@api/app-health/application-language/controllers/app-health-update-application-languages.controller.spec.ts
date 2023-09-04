import { AppHealthUpdateApplicationLanguagesController, AppHealthUpdateApplicationLanguagesHandler } from '@api/app-health/application-language';
import { appHealthMockApplicationLanguageData } from '@app/app-health/application-language';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthUpdateApplicationLanguagesController', () =>
{
    let controller: AppHealthUpdateApplicationLanguagesController;
    let handler: AppHealthUpdateApplicationLanguagesHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AppHealthUpdateApplicationLanguagesController,
            ],
            providers: [
                {
                    provide : AppHealthUpdateApplicationLanguagesHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthUpdateApplicationLanguagesController>(AppHealthUpdateApplicationLanguagesController);
        handler = module.get<AppHealthUpdateApplicationLanguagesHandler>(AppHealthUpdateApplicationLanguagesHandler);
    });

    describe('main', () =>
    {
        test('AppHealthUpdateApplicationLanguagesController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a applicationLanguages updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApplicationLanguageData[0])));
            expect(await controller.main(appHealthMockApplicationLanguageData[0])).toBe(appHealthMockApplicationLanguageData[0]);
        });
    });
});
