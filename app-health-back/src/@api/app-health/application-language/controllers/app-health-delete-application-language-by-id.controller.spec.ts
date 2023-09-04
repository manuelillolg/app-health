/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppHealthDeleteApplicationLanguageByIdController, AppHealthDeleteApplicationLanguageByIdHandler } from '@api/app-health/application-language';
import { appHealthMockApplicationLanguageData } from '@app/app-health/application-language';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthDeleteApplicationLanguageByIdController', () =>
{
    let controller: AppHealthDeleteApplicationLanguageByIdController;
    let handler: AppHealthDeleteApplicationLanguageByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AppHealthDeleteApplicationLanguageByIdController,
            ],
            providers: [
                {
                    provide : AppHealthDeleteApplicationLanguageByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthDeleteApplicationLanguageByIdController>(AppHealthDeleteApplicationLanguageByIdController);
        handler = module.get<AppHealthDeleteApplicationLanguageByIdHandler>(AppHealthDeleteApplicationLanguageByIdHandler);
    });

    describe('main', () =>
    {
        test('AppHealthDeleteApplicationLanguageByIdController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an applicationLanguage deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApplicationLanguageData[0])));
            expect(await controller.main(appHealthMockApplicationLanguageData[0].id)).toBe(appHealthMockApplicationLanguageData[0]);
        });
    });
});
