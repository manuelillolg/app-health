import { AppHealthGetApplicationLanguagesController, AppHealthGetApplicationLanguagesHandler } from '@api/app-health/application-language';
import { appHealthMockApplicationLanguageData } from '@app/app-health/application-language';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthGetApplicationLanguagesController', () =>
{
    let controller: AppHealthGetApplicationLanguagesController;
    let handler: AppHealthGetApplicationLanguagesHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AppHealthGetApplicationLanguagesController,
            ],
            providers: [
                {
                    provide : AppHealthGetApplicationLanguagesHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthGetApplicationLanguagesController>(AppHealthGetApplicationLanguagesController);
        handler = module.get<AppHealthGetApplicationLanguagesHandler>(AppHealthGetApplicationLanguagesHandler);
    });

    describe('main', () =>
    {
        test('AppHealthGetApplicationLanguagesController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a appHealthMockApplicationLanguageData', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApplicationLanguageData)));
            expect(await controller.main()).toBe(appHealthMockApplicationLanguageData);
        });
    });
});
