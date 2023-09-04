import { AppHealthCreateApiInterfaceTypesHandler } from '@api/app-health/api-interface-type';
import { appHealthMockApiInterfaceTypeData } from '@app/app-health/api-interface-type';
import { ICommandBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthCreateApiInterfaceTypesHandler', () =>
{
    let handler: AppHealthCreateApiInterfaceTypesHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthCreateApiInterfaceTypesHandler,
                {
                    provide : ICommandBus,
                    useValue: {
                        dispatch: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        handler = module.get<AppHealthCreateApiInterfaceTypesHandler>(AppHealthCreateApiInterfaceTypesHandler);
    });

    describe('main', () =>
    {
        test('AppHealthCreateApiInterfaceTypesHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an appHealthMockApiInterfaceTypeData created', async () =>
        {
            expect(await handler.main(appHealthMockApiInterfaceTypeData)).toBe(true);
        });
    });
});
