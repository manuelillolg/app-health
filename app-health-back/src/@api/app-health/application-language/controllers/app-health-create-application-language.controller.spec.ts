import { AppHealthCreateApplicationLanguageController, AppHealthCreateApplicationLanguageHandler } from '@api/app-health/application-language';
import { appHealthMockApplicationLanguageData } from '@app/app-health/application-language';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthCreateApplicationLanguageController', () =>
{
    let controller: AppHealthCreateApplicationLanguageController;
    let handler: AppHealthCreateApplicationLanguageHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AppHealthCreateApplicationLanguageController,
            ],
            providers: [
                {
                    provide : AppHealthCreateApplicationLanguageHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthCreateApplicationLanguageController>(AppHealthCreateApplicationLanguageController);
        handler = module.get<AppHealthCreateApplicationLanguageHandler>(AppHealthCreateApplicationLanguageHandler);
    });

    describe('main', () =>
    {
        test('AppHealthCreateApplicationLanguageController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an applicationLanguage created', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApplicationLanguageData[0])));
            expect(
                await controller.main(
                    appHealthMockApplicationLanguageData[0],
                ),
            )
                .toBe(appHealthMockApplicationLanguageData[0]);
        });
    });
});
