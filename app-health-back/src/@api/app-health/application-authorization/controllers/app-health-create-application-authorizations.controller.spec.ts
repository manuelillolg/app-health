import { AppHealthCreateApplicationAuthorizationsController, AppHealthCreateApplicationAuthorizationsHandler } from '@api/app-health/application-authorization';
import { appHealthMockApplicationAuthorizationData } from '@app/app-health/application-authorization';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthCreateApplicationAuthorizationsController', () =>
{
    let controller: AppHealthCreateApplicationAuthorizationsController;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                AppHealthCreateApplicationAuthorizationsController,
            ],
            providers: [
                {
                    provide : AppHealthCreateApplicationAuthorizationsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthCreateApplicationAuthorizationsController>(AppHealthCreateApplicationAuthorizationsController);
    });

    describe('main', () =>
    {
        test('AppHealthCreateApplicationAuthorizationsController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an appHealthMockApplicationAuthorizationData created', async () =>
        {
            expect(
                await controller.main(
                    appHealthMockApplicationAuthorizationData,
                ),
            )
                .toBe(undefined);
        });
    });
});
