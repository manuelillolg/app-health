import { AppHealthCreateApplicationAuthorizationsHandler } from '@api/app-health/application-authorization';
import { appHealthMockApplicationAuthorizationData } from '@app/app-health/application-authorization';
import { ICommandBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthCreateApplicationAuthorizationsHandler', () =>
{
    let handler: AppHealthCreateApplicationAuthorizationsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthCreateApplicationAuthorizationsHandler,
                {
                    provide : ICommandBus,
                    useValue: {
                        dispatch: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        handler = module.get<AppHealthCreateApplicationAuthorizationsHandler>(AppHealthCreateApplicationAuthorizationsHandler);
    });

    describe('main', () =>
    {
        test('AppHealthCreateApplicationAuthorizationsHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an appHealthMockApplicationAuthorizationData created', async () =>
        {
            expect(await handler.main(appHealthMockApplicationAuthorizationData)).toBe(true);
        });
    });
});
