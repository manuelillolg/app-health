import { AppHealthPaginateApplicationLanguagesController, AppHealthPaginateApplicationLanguagesHandler } from '@api/app-health/application-language';
import { appHealthMockApplicationLanguageData } from '@app/app-health/application-language';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthPaginateApplicationLanguagesController', () =>
{
    let controller: AppHealthPaginateApplicationLanguagesController;
    let handler: AppHealthPaginateApplicationLanguagesHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AppHealthPaginateApplicationLanguagesController,
            ],
            providers: [
                {
                    provide : AppHealthPaginateApplicationLanguagesHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthPaginateApplicationLanguagesController>(AppHealthPaginateApplicationLanguagesController);
        handler = module.get<AppHealthPaginateApplicationLanguagesHandler>(AppHealthPaginateApplicationLanguagesHandler);
    });

    describe('main', () =>
    {
        test('AppHealthPaginateApplicationLanguagesController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a appHealthMockApplicationLanguageData', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve({
                total: 5,
                count: 5,
                rows : appHealthMockApplicationLanguageData,
            })));
            expect(await controller.main()).toStrictEqual({
                total: 5,
                count: 5,
                rows : appHealthMockApplicationLanguageData,
            });
        });
    });
});
