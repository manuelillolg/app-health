import { AppHealthUpdateApplicationAuthorizationsController, AppHealthUpdateApplicationAuthorizationsHandler } from '@api/app-health/application-authorization';
import { appHealthMockApplicationAuthorizationData } from '@app/app-health/application-authorization';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthUpdateApplicationAuthorizationsController', () =>
{
    let controller: AppHealthUpdateApplicationAuthorizationsController;
    let handler: AppHealthUpdateApplicationAuthorizationsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AppHealthUpdateApplicationAuthorizationsController,
            ],
            providers: [
                {
                    provide : AppHealthUpdateApplicationAuthorizationsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthUpdateApplicationAuthorizationsController>(AppHealthUpdateApplicationAuthorizationsController);
        handler = module.get<AppHealthUpdateApplicationAuthorizationsHandler>(AppHealthUpdateApplicationAuthorizationsHandler);
    });

    describe('main', () =>
    {
        test('AppHealthUpdateApplicationAuthorizationsController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a applicationAuthorizations updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApplicationAuthorizationData[0])));
            expect(await controller.main(appHealthMockApplicationAuthorizationData[0])).toBe(appHealthMockApplicationAuthorizationData[0]);
        });
    });
});
