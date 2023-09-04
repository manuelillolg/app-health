import { AppHealthCreateTechnicalSolutionsHandler } from '@api/app-health/technical-solution';
import { appHealthMockTechnicalSolutionData } from '@app/app-health/technical-solution';
import { ICommandBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppHealthCreateTechnicalSolutionsHandler', () =>
{
    let handler: AppHealthCreateTechnicalSolutionsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthCreateTechnicalSolutionsHandler,
                {
                    provide : ICommandBus,
                    useValue: {
                        dispatch: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        handler = module.get<AppHealthCreateTechnicalSolutionsHandler>(AppHealthCreateTechnicalSolutionsHandler);
    });

    describe('main', () =>
    {
        test('AppHealthCreateTechnicalSolutionsHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an appHealthMockTechnicalSolutionData created', async () =>
        {
            expect(await handler.main(appHealthMockTechnicalSolutionData)).toBe(true);
        });
    });
});
