import { AppHealthCreateApplicationAuthenticationController, AppHealthCreateApplicationAuthenticationHandler } from '@api/app-health/application-authentication';
import { appHealthMockApplicationAuthenticationData } from '@app/app-health/application-authentication';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthCreateApplicationAuthenticationController', () =>
{
    let controller: AppHealthCreateApplicationAuthenticationController;
    let handler: AppHealthCreateApplicationAuthenticationHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AppHealthCreateApplicationAuthenticationController,
            ],
            providers: [
                {
                    provide : AppHealthCreateApplicationAuthenticationHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthCreateApplicationAuthenticationController>(AppHealthCreateApplicationAuthenticationController);
        handler = module.get<AppHealthCreateApplicationAuthenticationHandler>(AppHealthCreateApplicationAuthenticationHandler);
    });

    describe('main', () =>
    {
        test('AppHealthCreateApplicationAuthenticationController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an applicationAuthentication created', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApplicationAuthenticationData[0])));
            expect(
                await controller.main(
                    appHealthMockApplicationAuthenticationData[0],
                ),
            )
                .toBe(appHealthMockApplicationAuthenticationData[0]);
        });
    });
});
