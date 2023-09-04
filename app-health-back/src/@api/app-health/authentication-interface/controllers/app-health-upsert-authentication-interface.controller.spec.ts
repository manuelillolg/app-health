import { AppHealthUpsertAuthenticationInterfaceController, AppHealthUpsertAuthenticationInterfaceHandler } from '@api/app-health/authentication-interface';
import { appHealthMockAuthenticationInterfaceData } from '@app/app-health/authentication-interface';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthUpsertAuthenticationInterfaceController', () =>
{
    let controller: AppHealthUpsertAuthenticationInterfaceController;
    let handler: AppHealthUpsertAuthenticationInterfaceHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AppHealthUpsertAuthenticationInterfaceController,
            ],
            providers: [
                {
                    provide : AppHealthUpsertAuthenticationInterfaceHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthUpsertAuthenticationInterfaceController>(AppHealthUpsertAuthenticationInterfaceController);
        handler = module.get<AppHealthUpsertAuthenticationInterfaceHandler>(AppHealthUpsertAuthenticationInterfaceHandler);
    });

    describe('main', () =>
    {
        test('AppHealthUpsertAuthenticationInterfaceController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an authenticationInterface upserted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockAuthenticationInterfaceData[0])));
            expect(await controller.main(appHealthMockAuthenticationInterfaceData[0])).toBe(appHealthMockAuthenticationInterfaceData[0]);
        });
    });
});
