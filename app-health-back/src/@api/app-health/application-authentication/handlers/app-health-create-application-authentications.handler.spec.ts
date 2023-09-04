import { AppHealthCreateApplicationAuthenticationsHandler } from '@api/app-health/application-authentication';
import { appHealthMockApplicationAuthenticationData } from '@app/app-health/application-authentication';
import { ICommandBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthCreateApplicationAuthenticationsHandler', () =>
{
    let handler: AppHealthCreateApplicationAuthenticationsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthCreateApplicationAuthenticationsHandler,
                {
                    provide : ICommandBus,
                    useValue: {
                        dispatch: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        handler = module.get<AppHealthCreateApplicationAuthenticationsHandler>(AppHealthCreateApplicationAuthenticationsHandler);
    });

    describe('main', () =>
    {
        test('AppHealthCreateApplicationAuthenticationsHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an appHealthMockApplicationAuthenticationData created', async () =>
        {
            expect(await handler.main(appHealthMockApplicationAuthenticationData)).toBe(true);
        });
    });
});
