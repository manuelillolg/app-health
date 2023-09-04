import { AppHealthUpsertApplicationLanguageController, AppHealthUpsertApplicationLanguageHandler } from '@api/app-health/application-language';
import { appHealthMockApplicationLanguageData } from '@app/app-health/application-language';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthUpsertApplicationLanguageController', () =>
{
    let controller: AppHealthUpsertApplicationLanguageController;
    let handler: AppHealthUpsertApplicationLanguageHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AppHealthUpsertApplicationLanguageController,
            ],
            providers: [
                {
                    provide : AppHealthUpsertApplicationLanguageHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthUpsertApplicationLanguageController>(AppHealthUpsertApplicationLanguageController);
        handler = module.get<AppHealthUpsertApplicationLanguageHandler>(AppHealthUpsertApplicationLanguageHandler);
    });

    describe('main', () =>
    {
        test('AppHealthUpsertApplicationLanguageController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an applicationLanguage upserted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApplicationLanguageData[0])));
            expect(await controller.main(appHealthMockApplicationLanguageData[0])).toBe(appHealthMockApplicationLanguageData[0]);
        });
    });
});
