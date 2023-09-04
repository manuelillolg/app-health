import { AppHealthCreateApplicationLanguagesController, AppHealthCreateApplicationLanguagesHandler } from '@api/app-health/application-language';
import { appHealthMockApplicationLanguageData } from '@app/app-health/application-language';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthCreateApplicationLanguagesController', () =>
{
    let controller: AppHealthCreateApplicationLanguagesController;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                AppHealthCreateApplicationLanguagesController,
            ],
            providers: [
                {
                    provide : AppHealthCreateApplicationLanguagesHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthCreateApplicationLanguagesController>(AppHealthCreateApplicationLanguagesController);
    });

    describe('main', () =>
    {
        test('AppHealthCreateApplicationLanguagesController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an appHealthMockApplicationLanguageData created', async () =>
        {
            expect(
                await controller.main(
                    appHealthMockApplicationLanguageData,
                ),
            )
                .toBe(undefined);
        });
    });
});
