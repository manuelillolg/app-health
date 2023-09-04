import { AppHealthCreateApiInterfaceTypeController, AppHealthCreateApiInterfaceTypeHandler } from '@api/app-health/api-interface-type';
import { appHealthMockApiInterfaceTypeData } from '@app/app-health/api-interface-type';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthCreateApiInterfaceTypeController', () =>
{
    let controller: AppHealthCreateApiInterfaceTypeController;
    let handler: AppHealthCreateApiInterfaceTypeHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AppHealthCreateApiInterfaceTypeController,
            ],
            providers: [
                {
                    provide : AppHealthCreateApiInterfaceTypeHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthCreateApiInterfaceTypeController>(AppHealthCreateApiInterfaceTypeController);
        handler = module.get<AppHealthCreateApiInterfaceTypeHandler>(AppHealthCreateApiInterfaceTypeHandler);
    });

    describe('main', () =>
    {
        test('AppHealthCreateApiInterfaceTypeController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an apiInterfaceType created', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApiInterfaceTypeData[0])));
            expect(
                await controller.main(
                    appHealthMockApiInterfaceTypeData[0],
                ),
            )
                .toBe(appHealthMockApiInterfaceTypeData[0]);
        });
    });
});
