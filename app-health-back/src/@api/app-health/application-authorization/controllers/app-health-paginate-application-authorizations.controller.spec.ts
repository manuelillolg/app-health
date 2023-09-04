import { AppHealthPaginateApplicationAuthorizationsController, AppHealthPaginateApplicationAuthorizationsHandler } from '@api/app-health/application-authorization';
import { appHealthMockApplicationAuthorizationData } from '@app/app-health/application-authorization';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthPaginateApplicationAuthorizationsController', () =>
{
    let controller: AppHealthPaginateApplicationAuthorizationsController;
    let handler: AppHealthPaginateApplicationAuthorizationsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AppHealthPaginateApplicationAuthorizationsController,
            ],
            providers: [
                {
                    provide : AppHealthPaginateApplicationAuthorizationsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthPaginateApplicationAuthorizationsController>(AppHealthPaginateApplicationAuthorizationsController);
        handler = module.get<AppHealthPaginateApplicationAuthorizationsHandler>(AppHealthPaginateApplicationAuthorizationsHandler);
    });

    describe('main', () =>
    {
        test('AppHealthPaginateApplicationAuthorizationsController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a appHealthMockApplicationAuthorizationData', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve({
                total: 5,
                count: 5,
                rows : appHealthMockApplicationAuthorizationData,
            })));
            expect(await controller.main()).toStrictEqual({
                total: 5,
                count: 5,
                rows : appHealthMockApplicationAuthorizationData,
            });
        });
    });
});
