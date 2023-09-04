import { AppHealthCreateApplicationApisController, AppHealthCreateApplicationApisHandler } from '@api/app-health/application-api';
import { appHealthMockApplicationApiData } from '@app/app-health/application-api';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthCreateApplicationApisController', () =>
{
    let controller: AppHealthCreateApplicationApisController;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                AppHealthCreateApplicationApisController,
            ],
            providers: [
                {
                    provide : AppHealthCreateApplicationApisHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthCreateApplicationApisController>(AppHealthCreateApplicationApisController);
    });

    describe('main', () =>
    {
        test('AppHealthCreateApplicationApisController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an appHealthMockApplicationApiData created', async () =>
        {
            expect(
                await controller.main(
                    appHealthMockApplicationApiData,
                ),
            )
                .toBe(undefined);
        });
    });
});
