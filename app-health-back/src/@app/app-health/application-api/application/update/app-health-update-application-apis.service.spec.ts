/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { appHealthMockApplicationApiData } from '@app/app-health/application-api/infrastructure/mock/app-health-mock-application-api.data';
import { AppHealthUpdateApplicationApisService } from './app-health-update-application-apis.service';
import {
    AppHealthApplicationApiId,
    AppHealthApplicationApiApplicationId,
    AppHealthApplicationApiApiInterfaceTypeId,
    AppHealthApplicationApiScore,
    AppHealthApplicationApiDocumentations,
    AppHealthApplicationApiRequestsPerDay,
    AppHealthApplicationApiApplicationInfrastructureServiceId,
    AppHealthApplicationApiCreatedAt,
    AppHealthApplicationApiUpdatedAt,
    AppHealthApplicationApiDeletedAt,
} from '../../domain/value-objects';
import { AppHealthIApplicationApiRepository } from '../../domain/app-health-application-api.repository';
import { AppHealthMockApplicationApiRepository } from '../../infrastructure/mock/app-health-mock-application-api.repository';

describe('AppHealthUpdateApplicationApisService', () =>
{
    let service: AppHealthUpdateApplicationApisService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                AppHealthUpdateApplicationApisService,
                AppHealthMockApplicationApiRepository,
                {
                    provide : AppHealthIApplicationApiRepository,
                    useValue: {
                        update: () => { /**/ },
                        get   : () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(AppHealthUpdateApplicationApisService);
    });

    describe('main', () =>
    {
        test('UpdateApplicationApisService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should update a applicationApis and emit event', async () =>
        {
            expect(
                await service.main(
                    {
                        id: new AppHealthApplicationApiId(appHealthMockApplicationApiData[0].id),
                        applicationId: new AppHealthApplicationApiApplicationId(appHealthMockApplicationApiData[0].applicationId),
                        apiInterfaceTypeId: new AppHealthApplicationApiApiInterfaceTypeId(appHealthMockApplicationApiData[0].apiInterfaceTypeId),
                        score: new AppHealthApplicationApiScore(appHealthMockApplicationApiData[0].score),
                        documentations: new AppHealthApplicationApiDocumentations(appHealthMockApplicationApiData[0].documentations),
                        requestsPerDay: new AppHealthApplicationApiRequestsPerDay(appHealthMockApplicationApiData[0].requestsPerDay),
                        applicationInfrastructureServiceId: new AppHealthApplicationApiApplicationInfrastructureServiceId(appHealthMockApplicationApiData[0].applicationInfrastructureServiceId),
                    },
                    {},
                    {},
                ),
            )
                .toBe(undefined);
        });
    });
});
