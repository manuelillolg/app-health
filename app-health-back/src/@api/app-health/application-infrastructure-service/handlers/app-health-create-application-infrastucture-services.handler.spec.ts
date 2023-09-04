import { AppHealthCreateApplicationInfrastuctureServicesHandler } from '@api/app-health/application-infrastructure-service';
import { appHealthMockApplicationInfrastructureServiceData } from '@app/app-health/application-infrastructure-service';
import { ICommandBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthCreateApplicationInfrastuctureServicesHandler', () =>
{
    let handler: AppHealthCreateApplicationInfrastuctureServicesHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthCreateApplicationInfrastuctureServicesHandler,
                {
                    provide : ICommandBus,
                    useValue: {
                        dispatch: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        handler = module.get<AppHealthCreateApplicationInfrastuctureServicesHandler>(AppHealthCreateApplicationInfrastuctureServicesHandler);
    });

    describe('main', () =>
    {
        test('AppHealthCreateApplicationInfrastuctureServicesHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an appHealthMockApplicationInfrastructureServiceData created', async () =>
        {
            expect(await handler.main(appHealthMockApplicationInfrastructureServiceData)).toBe(true);
        });
    });
});
