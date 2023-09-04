import { AppHealthCreateLanguageController, AppHealthCreateLanguageHandler } from '@api/app-health/language';
import { appHealthMockLanguageData } from '@app/app-health/language';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthCreateLanguageController', () =>
{
    let controller: AppHealthCreateLanguageController;
    let handler: AppHealthCreateLanguageHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AppHealthCreateLanguageController,
            ],
            providers: [
                {
                    provide : AppHealthCreateLanguageHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthCreateLanguageController>(AppHealthCreateLanguageController);
        handler = module.get<AppHealthCreateLanguageHandler>(AppHealthCreateLanguageHandler);
    });

    describe('main', () =>
    {
        test('AppHealthCreateLanguageController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an language created', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockLanguageData[0])));
            expect(
                await controller.main(
                    appHealthMockLanguageData[0],
                ),
            )
                .toBe(appHealthMockLanguageData[0]);
        });
    });
});
