import { AppHealthUpsertApiInterfaceTypeController, AppHealthUpsertApiInterfaceTypeHandler } from '@api/app-health/api-interface-type';
import { appHealthMockApiInterfaceTypeData } from '@app/app-health/api-interface-type';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthUpsertApiInterfaceTypeController', () =>
{
    let controller: AppHealthUpsertApiInterfaceTypeController;
    let handler: AppHealthUpsertApiInterfaceTypeHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                AppHealthUpsertApiInterfaceTypeController,
            ],
            providers: [
                {
                    provide : AppHealthUpsertApiInterfaceTypeHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<AppHealthUpsertApiInterfaceTypeController>(AppHealthUpsertApiInterfaceTypeController);
        handler = module.get<AppHealthUpsertApiInterfaceTypeHandler>(AppHealthUpsertApiInterfaceTypeHandler);
    });

    describe('main', () =>
    {
        test('AppHealthUpsertApiInterfaceTypeController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an apiInterfaceType upserted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(appHealthMockApiInterfaceTypeData[0])));
            expect(await controller.main(appHealthMockApiInterfaceTypeData[0])).toBe(appHealthMockApiInterfaceTypeData[0]);
        });
    });
});
