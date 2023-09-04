import { AppHealthCreateApplicationViewsHandler } from '@api/app-health/application-view';
import { appHealthMockApplicationViewData } from '@app/app-health/application-view';
import { ICommandBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthCreateApplicationViewsHandler', () =>
{
    let handler: AppHealthCreateApplicationViewsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthCreateApplicationViewsHandler,
                {
                    provide : ICommandBus,
                    useValue: {
                        dispatch: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        handler = module.get<AppHealthCreateApplicationViewsHandler>(AppHealthCreateApplicationViewsHandler);
    });

    describe('main', () =>
    {
        test('AppHealthCreateApplicationViewsHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an appHealthMockApplicationViewData created', async () =>
        {
            expect(await handler.main(appHealthMockApplicationViewData)).toBe(true);
        });
    });
});
