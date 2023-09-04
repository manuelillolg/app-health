/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { appHealthMockApplicationViewData } from '@app/app-health/application-view/infrastructure/mock/app-health-mock-application-view.data';
import { AppHealthUpdateApplicationViewsService } from './app-health-update-application-views.service';
import {
    AppHealthApplicationViewId,
    AppHealthApplicationViewApplicationId,
    AppHealthApplicationViewTotalViews,
    AppHealthApplicationViewComplexity,
    AppHealthApplicationViewDescription,
    AppHealthApplicationViewScore,
    AppHealthApplicationViewCreatedAt,
    AppHealthApplicationViewUpdatedAt,
    AppHealthApplicationViewDeletedAt,
} from '../../domain/value-objects';
import { AppHealthIApplicationViewRepository } from '../../domain/app-health-application-view.repository';
import { AppHealthMockApplicationViewRepository } from '../../infrastructure/mock/app-health-mock-application-view.repository';

describe('AppHealthUpdateApplicationViewsService', () =>
{
    let service: AppHealthUpdateApplicationViewsService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                AppHealthUpdateApplicationViewsService,
                AppHealthMockApplicationViewRepository,
                {
                    provide : AppHealthIApplicationViewRepository,
                    useValue: {
                        update: () => { /**/ },
                        get   : () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(AppHealthUpdateApplicationViewsService);
    });

    describe('main', () =>
    {
        test('UpdateApplicationViewsService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should update a applicationViews and emit event', async () =>
        {
            expect(
                await service.main(
                    {
                        id: new AppHealthApplicationViewId(appHealthMockApplicationViewData[0].id),
                        applicationId: new AppHealthApplicationViewApplicationId(appHealthMockApplicationViewData[0].applicationId),
                        totalViews: new AppHealthApplicationViewTotalViews(appHealthMockApplicationViewData[0].totalViews),
                        complexity: new AppHealthApplicationViewComplexity(appHealthMockApplicationViewData[0].complexity),
                        description: new AppHealthApplicationViewDescription(appHealthMockApplicationViewData[0].description),
                        score: new AppHealthApplicationViewScore(appHealthMockApplicationViewData[0].score),
                    },
                    {},
                    {},
                ),
            )
                .toBe(undefined);
        });
    });
});
