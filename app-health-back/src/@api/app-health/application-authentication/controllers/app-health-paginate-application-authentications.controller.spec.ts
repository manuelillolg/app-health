import { AppHealthPaginateApplicationAuthenticationsController, AppHealthPaginateApplicationAuthenticationsHandler } from '@api/app-health/application-authentication';
import { appHealthMockApplicationAuthenticationData } from '@app/app-health/application-authentication';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthPaginateApplicationAuthenticationsController', () =>
{
    let controller: AppHealthPaginateApplicationAuthenticationsController;
    let handler: AppHealthPaginateApplicationAuthenticationsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AppHealthPaginateApplicationAuthenticationsController,
            ],
            providers: [
                {
                    provide : AppHealthPaginateApplicationAuthenticationsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthPaginateApplicationAuthenticationsController>(AppHealthPaginateApplicationAuthenticationsController);
        handler = module.get<AppHealthPaginateApplicationAuthenticationsHandler>(AppHealthPaginateApplicationAuthenticationsHandler);
    });

    describe('main', () =>
    {
        test('AppHealthPaginateApplicationAuthenticationsController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a appHealthMockApplicationAuthenticationData', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve({
                total: 5,
                count: 5,
                rows : appHealthMockApplicationAuthenticationData,
            })));
            expect(await controller.main()).toStrictEqual({
                total: 5,
                count: 5,
                rows : appHealthMockApplicationAuthenticationData,
            });
        });
    });
});
