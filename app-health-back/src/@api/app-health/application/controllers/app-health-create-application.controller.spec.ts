import { AppHealthCreateApplicationController, AppHealthCreateApplicationHandler } from '@api/app-health/application';
import { appHealthMockApplicationData } from '@app/app-health/application';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthCreateApplicationController', () =>
{
    let controller: AppHealthCreateApplicationController;
    let handler: AppHealthCreateApplicationHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AppHealthCreateApplicationController,
            ],
            providers: [
                {
                    provide : AppHealthCreateApplicationHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthCreateApplicationController>(AppHealthCreateApplicationController);
        handler = module.get<AppHealthCreateApplicationHandler>(AppHealthCreateApplicationHandler);
    });

    describe('main', () =>
    {
        test('AppHealthCreateApplicationController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an application created', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApplicationData[0])));
            expect(
                await controller.main(
                    appHealthMockApplicationData[0],
                ),
            )
                .toBe(appHealthMockApplicationData[0]);
        });
    });
});
