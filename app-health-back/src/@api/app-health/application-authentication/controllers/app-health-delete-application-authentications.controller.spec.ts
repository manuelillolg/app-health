import { AppHealthDeleteApplicationAuthenticationsController, AppHealthDeleteApplicationAuthenticationsHandler } from '@api/app-health/application-authentication';
import { appHealthMockApplicationAuthenticationData } from '@app/app-health/application-authentication';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthDeleteApplicationAuthenticationsController', () =>
{
    let controller: AppHealthDeleteApplicationAuthenticationsController;
    let handler: AppHealthDeleteApplicationAuthenticationsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AppHealthDeleteApplicationAuthenticationsController,
            ],
            providers: [
                {
                    provide : AppHealthDeleteApplicationAuthenticationsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthDeleteApplicationAuthenticationsController>(AppHealthDeleteApplicationAuthenticationsController);
        handler = module.get<AppHealthDeleteApplicationAuthenticationsHandler>(AppHealthDeleteApplicationAuthenticationsHandler);
    });

    describe('main', () =>
    {
        test('AppHealthDeleteApplicationAuthenticationsController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an appHealthMockApplicationAuthenticationData deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApplicationAuthenticationData)));
            expect(await controller.main()).toBe(appHealthMockApplicationAuthenticationData);
        });
    });
});
