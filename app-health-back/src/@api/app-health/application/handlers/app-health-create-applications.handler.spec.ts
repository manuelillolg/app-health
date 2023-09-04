import { AppHealthCreateApplicationsHandler } from '@api/app-health/application';
import { appHealthMockApplicationData } from '@app/app-health/application';
import { ICommandBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthCreateApplicationsHandler', () =>
{
    let handler: AppHealthCreateApplicationsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthCreateApplicationsHandler,
                {
                    provide : ICommandBus,
                    useValue: {
                        dispatch: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        handler = module.get<AppHealthCreateApplicationsHandler>(AppHealthCreateApplicationsHandler);
    });

    describe('main', () =>
    {
        test('AppHealthCreateApplicationsHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an appHealthMockApplicationData created', async () =>
        {
            expect(await handler.main(appHealthMockApplicationData)).toBe(true);
        });
    });
});
