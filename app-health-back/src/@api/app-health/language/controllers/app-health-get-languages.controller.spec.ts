import { AppHealthGetLanguagesController, AppHealthGetLanguagesHandler } from '@api/app-health/language';
import { appHealthMockLanguageData } from '@app/app-health/language';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthGetLanguagesController', () =>
{
    let controller: AppHealthGetLanguagesController;
    let handler: AppHealthGetLanguagesHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AppHealthGetLanguagesController,
            ],
            providers: [
                {
                    provide : AppHealthGetLanguagesHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthGetLanguagesController>(AppHealthGetLanguagesController);
        handler = module.get<AppHealthGetLanguagesHandler>(AppHealthGetLanguagesHandler);
    });

    describe('main', () =>
    {
        test('AppHealthGetLanguagesController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a appHealthMockLanguageData', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockLanguageData)));
            expect(await controller.main()).toBe(appHealthMockLanguageData);
        });
    });
});
