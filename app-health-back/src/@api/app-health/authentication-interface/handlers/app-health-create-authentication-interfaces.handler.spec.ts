import { AppHealthCreateAuthenticationInterfacesHandler } from '@api/app-health/authentication-interface';
import { appHealthMockAuthenticationInterfaceData } from '@app/app-health/authentication-interface';
import { ICommandBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthCreateAuthenticationInterfacesHandler', () =>
{
    let handler: AppHealthCreateAuthenticationInterfacesHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthCreateAuthenticationInterfacesHandler,
                {
                    provide : ICommandBus,
                    useValue: {
                        dispatch: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        handler = module.get<AppHealthCreateAuthenticationInterfacesHandler>(AppHealthCreateAuthenticationInterfacesHandler);
    });

    describe('main', () =>
    {
        test('AppHealthCreateAuthenticationInterfacesHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an appHealthMockAuthenticationInterfaceData created', async () =>
        {
            expect(await handler.main(appHealthMockAuthenticationInterfaceData)).toBe(true);
        });
    });
});
