import { AppHealthUpsertLanguageController, AppHealthUpsertLanguageHandler } from '@api/app-health/language';
import { appHealthMockLanguageData } from '@app/app-health/language';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthUpsertLanguageController', () =>
{
    let controller: AppHealthUpsertLanguageController;
    let handler: AppHealthUpsertLanguageHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AppHealthUpsertLanguageController,
            ],
            providers: [
                {
                    provide : AppHealthUpsertLanguageHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthUpsertLanguageController>(AppHealthUpsertLanguageController);
        handler = module.get<AppHealthUpsertLanguageHandler>(AppHealthUpsertLanguageHandler);
    });

    describe('main', () =>
    {
        test('AppHealthUpsertLanguageController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an language upserted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockLanguageData[0])));
            expect(await controller.main(appHealthMockLanguageData[0])).toBe(appHealthMockLanguageData[0]);
        });
    });
});
