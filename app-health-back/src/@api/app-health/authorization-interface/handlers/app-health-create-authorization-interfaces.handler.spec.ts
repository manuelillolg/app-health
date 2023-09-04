import { AppHealthCreateAuthorizationInterfacesHandler } from '@api/app-health/authorization-interface';
import { appHealthMockAuthorizationInterfaceData } from '@app/app-health/authorization-interface';
import { ICommandBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthCreateAuthorizationInterfacesHandler', () =>
{
    let handler: AppHealthCreateAuthorizationInterfacesHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthCreateAuthorizationInterfacesHandler,
                {
                    provide : ICommandBus,
                    useValue: {
                        dispatch: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        handler = module.get<AppHealthCreateAuthorizationInterfacesHandler>(AppHealthCreateAuthorizationInterfacesHandler);
    });

    describe('main', () =>
    {
        test('AppHealthCreateAuthorizationInterfacesHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an appHealthMockAuthorizationInterfaceData created', async () =>
        {
            expect(await handler.main(appHealthMockAuthorizationInterfaceData)).toBe(true);
        });
    });
});
