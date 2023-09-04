import { AppHealthDeleteApplicationAuthorizationsController, AppHealthDeleteApplicationAuthorizationsHandler } from '@api/app-health/application-authorization';
import { appHealthMockApplicationAuthorizationData } from '@app/app-health/application-authorization';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthDeleteApplicationAuthorizationsController', () =>
{
    let controller: AppHealthDeleteApplicationAuthorizationsController;
    let handler: AppHealthDeleteApplicationAuthorizationsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AppHealthDeleteApplicationAuthorizationsController,
            ],
            providers: [
                {
                    provide : AppHealthDeleteApplicationAuthorizationsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthDeleteApplicationAuthorizationsController>(AppHealthDeleteApplicationAuthorizationsController);
        handler = module.get<AppHealthDeleteApplicationAuthorizationsHandler>(AppHealthDeleteApplicationAuthorizationsHandler);
    });

    describe('main', () =>
    {
        test('AppHealthDeleteApplicationAuthorizationsController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an appHealthMockApplicationAuthorizationData deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApplicationAuthorizationData)));
            expect(await controller.main()).toBe(appHealthMockApplicationAuthorizationData);
        });
    });
});
