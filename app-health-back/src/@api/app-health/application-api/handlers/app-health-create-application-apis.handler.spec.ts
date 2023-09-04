import { AppHealthCreateApplicationApisHandler } from '@api/app-health/application-api';
import { appHealthMockApplicationApiData } from '@app/app-health/application-api';
import { ICommandBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthCreateApplicationApisHandler', () =>
{
    let handler: AppHealthCreateApplicationApisHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthCreateApplicationApisHandler,
                {
                    provide : ICommandBus,
                    useValue: {
                        dispatch: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        handler = module.get<AppHealthCreateApplicationApisHandler>(AppHealthCreateApplicationApisHandler);
    });

    describe('main', () =>
    {
        test('AppHealthCreateApplicationApisHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an appHealthMockApplicationApiData created', async () =>
        {
            expect(await handler.main(appHealthMockApplicationApiData)).toBe(true);
        });
    });
});
