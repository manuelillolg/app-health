/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthDeleteLanguageByIdController, AppHealthDeleteLanguageByIdHandler } from '@api/app-health/language';
import { appHealthMockLanguageData } from '@app/app-health/language';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthDeleteLanguageByIdController', () =>
{
    let controller: AppHealthDeleteLanguageByIdController;
    let handler: AppHealthDeleteLanguageByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AppHealthDeleteLanguageByIdController,
            ],
            providers: [
                {
                    provide : AppHealthDeleteLanguageByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthDeleteLanguageByIdController>(AppHealthDeleteLanguageByIdController);
        handler = module.get<AppHealthDeleteLanguageByIdHandler>(AppHealthDeleteLanguageByIdHandler);
    });

    describe('main', () =>
    {
        test('AppHealthDeleteLanguageByIdController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an language deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockLanguageData[0])));
            expect(await controller.main(appHealthMockLanguageData[0].id)).toBe(appHealthMockLanguageData[0]);
        });
    });
});
