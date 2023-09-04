import { AppHealthCreateInfrastructureServicesHandler } from '@api/app-health/infrastructure-service';
import { appHealthMockInfrastructureServiceData } from '@app/app-health/infrastructure-service';
import { ICommandBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthCreateInfrastructureServicesHandler', () =>
{
    let handler: AppHealthCreateInfrastructureServicesHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthCreateInfrastructureServicesHandler,
                {
                    provide : ICommandBus,
                    useValue: {
                        dispatch: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        handler = module.get<AppHealthCreateInfrastructureServicesHandler>(AppHealthCreateInfrastructureServicesHandler);
    });

    describe('main', () =>
    {
        test('AppHealthCreateInfrastructureServicesHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an appHealthMockInfrastructureServiceData created', async () =>
        {
            expect(await handler.main(appHealthMockInfrastructureServiceData)).toBe(true);
        });
    });
});
