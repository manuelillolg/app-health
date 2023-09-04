import { AppHealthCreateApiInterfaceTypesController, AppHealthCreateApiInterfaceTypesHandler } from '@api/app-health/api-interface-type';
import { appHealthMockApiInterfaceTypeData } from '@app/app-health/api-interface-type';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthCreateApiInterfaceTypesController', () =>
{
    let controller: AppHealthCreateApiInterfaceTypesController;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                AppHealthCreateApiInterfaceTypesController,
            ],
            providers: [
                {
                    provide : AppHealthCreateApiInterfaceTypesHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthCreateApiInterfaceTypesController>(AppHealthCreateApiInterfaceTypesController);
    });

    describe('main', () =>
    {
        test('AppHealthCreateApiInterfaceTypesController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an appHealthMockApiInterfaceTypeData created', async () =>
        {
            expect(
                await controller.main(
                    appHealthMockApiInterfaceTypeData,
                ),
            )
                .toBe(undefined);
        });
    });
});
