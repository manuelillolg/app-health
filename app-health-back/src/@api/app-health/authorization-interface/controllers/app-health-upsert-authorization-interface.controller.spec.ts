import { AppHealthUpsertAuthorizationInterfaceController, AppHealthUpsertAuthorizationInterfaceHandler } from '@api/app-health/authorization-interface';
import { appHealthMockAuthorizationInterfaceData } from '@app/app-health/authorization-interface';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthUpsertAuthorizationInterfaceController', () =>
{
    let controller: AppHealthUpsertAuthorizationInterfaceController;
    let handler: AppHealthUpsertAuthorizationInterfaceHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AppHealthUpsertAuthorizationInterfaceController,
            ],
            providers: [
                {
                    provide : AppHealthUpsertAuthorizationInterfaceHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthUpsertAuthorizationInterfaceController>(AppHealthUpsertAuthorizationInterfaceController);
        handler = module.get<AppHealthUpsertAuthorizationInterfaceHandler>(AppHealthUpsertAuthorizationInterfaceHandler);
    });

    describe('main', () =>
    {
        test('AppHealthUpsertAuthorizationInterfaceController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an authorizationInterface upserted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockAuthorizationInterfaceData[0])));
            expect(await controller.main(appHealthMockAuthorizationInterfaceData[0])).toBe(appHealthMockAuthorizationInterfaceData[0]);
        });
    });
});
