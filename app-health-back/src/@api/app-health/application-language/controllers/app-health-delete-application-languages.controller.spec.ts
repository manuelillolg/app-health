import { AppHealthDeleteApplicationLanguagesController, AppHealthDeleteApplicationLanguagesHandler } from '@api/app-health/application-language';
import { appHealthMockApplicationLanguageData } from '@app/app-health/application-language';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthDeleteApplicationLanguagesController', () =>
{
    let controller: AppHealthDeleteApplicationLanguagesController;
    let handler: AppHealthDeleteApplicationLanguagesHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AppHealthDeleteApplicationLanguagesController,
            ],
            providers: [
                {
                    provide : AppHealthDeleteApplicationLanguagesHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthDeleteApplicationLanguagesController>(AppHealthDeleteApplicationLanguagesController);
        handler = module.get<AppHealthDeleteApplicationLanguagesHandler>(AppHealthDeleteApplicationLanguagesHandler);
    });

    describe('main', () =>
    {
        test('AppHealthDeleteApplicationLanguagesController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an appHealthMockApplicationLanguageData deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApplicationLanguageData)));
            expect(await controller.main()).toBe(appHealthMockApplicationLanguageData);
        });
    });
});
