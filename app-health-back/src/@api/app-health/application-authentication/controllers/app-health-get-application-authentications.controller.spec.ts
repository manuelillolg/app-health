import { AppHealthGetApplicationAuthenticationsController, AppHealthGetApplicationAuthenticationsHandler } from '@api/app-health/application-authentication';
import { appHealthMockApplicationAuthenticationData } from '@app/app-health/application-authentication';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthGetApplicationAuthenticationsController', () =>
{
    let controller: AppHealthGetApplicationAuthenticationsController;
    let handler: AppHealthGetApplicationAuthenticationsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AppHealthGetApplicationAuthenticationsController,
            ],
            providers: [
                {
                    provide : AppHealthGetApplicationAuthenticationsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthGetApplicationAuthenticationsController>(AppHealthGetApplicationAuthenticationsController);
        handler = module.get<AppHealthGetApplicationAuthenticationsHandler>(AppHealthGetApplicationAuthenticationsHandler);
    });

    describe('main', () =>
    {
        test('AppHealthGetApplicationAuthenticationsController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a appHealthMockApplicationAuthenticationData', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApplicationAuthenticationData)));
            expect(await controller.main()).toBe(appHealthMockApplicationAuthenticationData);
        });
    });
});
