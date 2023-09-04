import { AppHealthCreateInfrastructureProvidersHandler } from '@api/app-health/infrastructure-provider';
import { appHealthMockInfrastructureProviderData } from '@app/app-health/infrastructure-provider';
import { ICommandBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthCreateInfrastructureProvidersHandler', () =>
{
    let handler: AppHealthCreateInfrastructureProvidersHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthCreateInfrastructureProvidersHandler,
                {
                    provide : ICommandBus,
                    useValue: {
                        dispatch: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        handler = module.get<AppHealthCreateInfrastructureProvidersHandler>(AppHealthCreateInfrastructureProvidersHandler);
    });

    describe('main', () =>
    {
        test('AppHealthCreateInfrastructureProvidersHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an appHealthMockInfrastructureProviderData created', async () =>
        {
            expect(await handler.main(appHealthMockInfrastructureProviderData)).toBe(true);
        });
    });
});
