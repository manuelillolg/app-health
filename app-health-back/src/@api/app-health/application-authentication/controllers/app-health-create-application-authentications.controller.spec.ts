import { AppHealthCreateApplicationAuthenticationsController, AppHealthCreateApplicationAuthenticationsHandler } from '@api/app-health/application-authentication';
import { appHealthMockApplicationAuthenticationData } from '@app/app-health/application-authentication';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthCreateApplicationAuthenticationsController', () =>
{
    let controller: AppHealthCreateApplicationAuthenticationsController;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                AppHealthCreateApplicationAuthenticationsController,
            ],
            providers: [
                {
                    provide : AppHealthCreateApplicationAuthenticationsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthCreateApplicationAuthenticationsController>(AppHealthCreateApplicationAuthenticationsController);
    });

    describe('main', () =>
    {
        test('AppHealthCreateApplicationAuthenticationsController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an appHealthMockApplicationAuthenticationData created', async () =>
        {
            expect(
                await controller.main(
                    appHealthMockApplicationAuthenticationData,
                ),
            )
                .toBe(undefined);
        });
    });
});
