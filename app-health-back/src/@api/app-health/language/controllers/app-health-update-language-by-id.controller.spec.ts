import { AppHealthUpdateLanguageByIdController, AppHealthUpdateLanguageByIdHandler } from '@api/app-health/language';
import { appHealthMockLanguageData } from '@app/app-health/language';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthUpdateLanguageByIdController', () =>
{
    let controller: AppHealthUpdateLanguageByIdController;
    let handler: AppHealthUpdateLanguageByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AppHealthUpdateLanguageByIdController,
            ],
            providers: [
                {
                    provide : AppHealthUpdateLanguageByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthUpdateLanguageByIdController>(AppHealthUpdateLanguageByIdController);
        handler = module.get<AppHealthUpdateLanguageByIdHandler>(AppHealthUpdateLanguageByIdHandler);
    });

    describe('main', () =>
    {
        test('AppHealthUpdateLanguageByIdController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a language updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockLanguageData[0])));
            expect(await controller.main(appHealthMockLanguageData[0])).toBe(appHealthMockLanguageData[0]);
        });
    });
});
