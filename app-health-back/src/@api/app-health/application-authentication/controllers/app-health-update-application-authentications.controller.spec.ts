import { AppHealthUpdateApplicationAuthenticationsController, AppHealthUpdateApplicationAuthenticationsHandler } from '@api/app-health/application-authentication';
import { appHealthMockApplicationAuthenticationData } from '@app/app-health/application-authentication';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthUpdateApplicationAuthenticationsController', () =>
{
    let controller: AppHealthUpdateApplicationAuthenticationsController;
    let handler: AppHealthUpdateApplicationAuthenticationsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AppHealthUpdateApplicationAuthenticationsController,
            ],
            providers: [
                {
                    provide : AppHealthUpdateApplicationAuthenticationsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthUpdateApplicationAuthenticationsController>(AppHealthUpdateApplicationAuthenticationsController);
        handler = module.get<AppHealthUpdateApplicationAuthenticationsHandler>(AppHealthUpdateApplicationAuthenticationsHandler);
    });

    describe('main', () =>
    {
        test('AppHealthUpdateApplicationAuthenticationsController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a applicationAuthentications updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApplicationAuthenticationData[0])));
            expect(await controller.main(appHealthMockApplicationAuthenticationData[0])).toBe(appHealthMockApplicationAuthenticationData[0]);
        });
    });
});
