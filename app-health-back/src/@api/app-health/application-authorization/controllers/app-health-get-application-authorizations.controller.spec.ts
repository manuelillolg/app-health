import { AppHealthGetApplicationAuthorizationsController, AppHealthGetApplicationAuthorizationsHandler } from '@api/app-health/application-authorization';
import { appHealthMockApplicationAuthorizationData } from '@app/app-health/application-authorization';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthGetApplicationAuthorizationsController', () =>
{
    let controller: AppHealthGetApplicationAuthorizationsController;
    let handler: AppHealthGetApplicationAuthorizationsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AppHealthGetApplicationAuthorizationsController,
            ],
            providers: [
                {
                    provide : AppHealthGetApplicationAuthorizationsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthGetApplicationAuthorizationsController>(AppHealthGetApplicationAuthorizationsController);
        handler = module.get<AppHealthGetApplicationAuthorizationsHandler>(AppHealthGetApplicationAuthorizationsHandler);
    });

    describe('main', () =>
    {
        test('AppHealthGetApplicationAuthorizationsController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a appHealthMockApplicationAuthorizationData', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApplicationAuthorizationData)));
            expect(await controller.main()).toBe(appHealthMockApplicationAuthorizationData);
        });
    });
});
