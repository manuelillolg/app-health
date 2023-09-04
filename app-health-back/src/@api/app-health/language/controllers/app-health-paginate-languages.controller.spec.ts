import { AppHealthPaginateLanguagesController, AppHealthPaginateLanguagesHandler } from '@api/app-health/language';
import { appHealthMockLanguageData } from '@app/app-health/language';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthPaginateLanguagesController', () =>
{
    let controller: AppHealthPaginateLanguagesController;
    let handler: AppHealthPaginateLanguagesHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AppHealthPaginateLanguagesController,
            ],
            providers: [
                {
                    provide : AppHealthPaginateLanguagesHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthPaginateLanguagesController>(AppHealthPaginateLanguagesController);
        handler = module.get<AppHealthPaginateLanguagesHandler>(AppHealthPaginateLanguagesHandler);
    });

    describe('main', () =>
    {
        test('AppHealthPaginateLanguagesController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a appHealthMockLanguageData', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve({
                total: 5,
                count: 5,
                rows : appHealthMockLanguageData,
            })));
            expect(await controller.main()).toStrictEqual({
                total: 5,
                count: 5,
                rows : appHealthMockLanguageData,
            });
        });
    });
});
