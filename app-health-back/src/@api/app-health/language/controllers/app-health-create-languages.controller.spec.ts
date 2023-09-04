import { AppHealthCreateLanguagesController, AppHealthCreateLanguagesHandler } from '@api/app-health/language';
import { appHealthMockLanguageData } from '@app/app-health/language';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthCreateLanguagesController', () =>
{
    let controller: AppHealthCreateLanguagesController;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                AppHealthCreateLanguagesController,
            ],
            providers: [
                {
                    provide : AppHealthCreateLanguagesHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthCreateLanguagesController>(AppHealthCreateLanguagesController);
    });

    describe('main', () =>
    {
        test('AppHealthCreateLanguagesController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an appHealthMockLanguageData created', async () =>
        {
            expect(
                await controller.main(
                    appHealthMockLanguageData,
                ),
            )
                .toBe(undefined);
        });
    });
});
