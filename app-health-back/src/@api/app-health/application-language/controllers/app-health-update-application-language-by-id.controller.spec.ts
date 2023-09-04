import { AppHealthUpdateApplicationLanguageByIdController, AppHealthUpdateApplicationLanguageByIdHandler } from '@api/app-health/application-language';
import { appHealthMockApplicationLanguageData } from '@app/app-health/application-language';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthUpdateApplicationLanguageByIdController', () =>
{
    let controller: AppHealthUpdateApplicationLanguageByIdController;
    let handler: AppHealthUpdateApplicationLanguageByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AppHealthUpdateApplicationLanguageByIdController,
            ],
            providers: [
                {
                    provide : AppHealthUpdateApplicationLanguageByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthUpdateApplicationLanguageByIdController>(AppHealthUpdateApplicationLanguageByIdController);
        handler = module.get<AppHealthUpdateApplicationLanguageByIdHandler>(AppHealthUpdateApplicationLanguageByIdHandler);
    });

    describe('main', () =>
    {
        test('AppHealthUpdateApplicationLanguageByIdController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a applicationLanguage updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApplicationLanguageData[0])));
            expect(await controller.main(appHealthMockApplicationLanguageData[0])).toBe(appHealthMockApplicationLanguageData[0]);
        });
    });
});
