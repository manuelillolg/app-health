import { AppHealthCreateApplicationsController, AppHealthCreateApplicationsHandler } from '@api/app-health/application';
import { appHealthMockApplicationData } from '@app/app-health/application';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthCreateApplicationsController', () =>
{
    let controller: AppHealthCreateApplicationsController;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                AppHealthCreateApplicationsController,
            ],
            providers: [
                {
                    provide : AppHealthCreateApplicationsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthCreateApplicationsController>(AppHealthCreateApplicationsController);
    });

    describe('main', () =>
    {
        test('AppHealthCreateApplicationsController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an appHealthMockApplicationData created', async () =>
        {
            expect(
                await controller.main(
                    appHealthMockApplicationData,
                ),
            )
                .toBe(undefined);
        });
    });
});
