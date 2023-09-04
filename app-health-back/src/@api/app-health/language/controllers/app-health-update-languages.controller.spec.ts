import { AppHealthUpdateLanguagesController, AppHealthUpdateLanguagesHandler } from '@api/app-health/language';
import { appHealthMockLanguageData } from '@app/app-health/language';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthUpdateLanguagesController', () =>
{
    let controller: AppHealthUpdateLanguagesController;
    let handler: AppHealthUpdateLanguagesHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AppHealthUpdateLanguagesController,
            ],
            providers: [
                {
                    provide : AppHealthUpdateLanguagesHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthUpdateLanguagesController>(AppHealthUpdateLanguagesController);
        handler = module.get<AppHealthUpdateLanguagesHandler>(AppHealthUpdateLanguagesHandler);
    });

    describe('main', () =>
    {
        test('AppHealthUpdateLanguagesController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a languages updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockLanguageData[0])));
            expect(await controller.main(appHealthMockLanguageData[0])).toBe(appHealthMockLanguageData[0]);
        });
    });
});
