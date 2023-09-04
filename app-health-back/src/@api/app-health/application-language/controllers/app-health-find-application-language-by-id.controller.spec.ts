import { AppHealthFindApplicationLanguageByIdController, AppHealthFindApplicationLanguageByIdHandler } from '@api/app-health/application-language';
import { appHealthMockApplicationLanguageData } from '@app/app-health/application-language';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthFindApplicationLanguageByIdController', () =>
{
    let controller: AppHealthFindApplicationLanguageByIdController;
    let handler: AppHealthFindApplicationLanguageByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AppHealthFindApplicationLanguageByIdController,
            ],
            providers: [
                {
                    provide : AppHealthFindApplicationLanguageByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthFindApplicationLanguageByIdController>(AppHealthFindApplicationLanguageByIdController);
        handler = module.get<AppHealthFindApplicationLanguageByIdHandler>(AppHealthFindApplicationLanguageByIdHandler);
    });

    describe('main', () =>
    {
        test('AppHealthFindApplicationLanguageByIdController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an applicationLanguage by id', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApplicationLanguageData[0])));
            expect(await controller.main(appHealthMockApplicationLanguageData[0].id)).toBe(appHealthMockApplicationLanguageData[0]);
        });
    });
});
