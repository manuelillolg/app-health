/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { appHealthMockApplicationAuthorizationData } from '@app/app-health/application-authorization/infrastructure/mock/app-health-mock-application-authorization.data';
import { AppHealthUpdateApplicationAuthorizationsService } from './app-health-update-application-authorizations.service';
import {
    AppHealthApplicationAuthorizationId,
    AppHealthApplicationAuthorizationApplicationId,
    AppHealthApplicationAuthorizationAuthorizationInterfaceId,
    AppHealthApplicationAuthorizationTotalUsers,
    AppHealthApplicationAuthorizationScore,
    AppHealthApplicationAuthorizationApplicationInfrastructureServiceId,
    AppHealthApplicationAuthorizationCreatedAt,
    AppHealthApplicationAuthorizationUpdatedAt,
    AppHealthApplicationAuthorizationDeletedAt,
} from '../../domain/value-objects';
import { AppHealthIApplicationAuthorizationRepository } from '../../domain/app-health-application-authorization.repository';
import { AppHealthMockApplicationAuthorizationRepository } from '../../infrastructure/mock/app-health-mock-application-authorization.repository';

describe('AppHealthUpdateApplicationAuthorizationsService', () =>
{
    let service: AppHealthUpdateApplicationAuthorizationsService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                AppHealthUpdateApplicationAuthorizationsService,
                AppHealthMockApplicationAuthorizationRepository,
                {
                    provide : AppHealthIApplicationAuthorizationRepository,
                    useValue: {
                        update: () => { /**/ },
                        get   : () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(AppHealthUpdateApplicationAuthorizationsService);
    });

    describe('main', () =>
    {
        test('UpdateApplicationAuthorizationsService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should update a applicationAuthorizations and emit event', async () =>
        {
            expect(
                await service.main(
                    {
                        id: new AppHealthApplicationAuthorizationId(appHealthMockApplicationAuthorizationData[0].id),
                        applicationId: new AppHealthApplicationAuthorizationApplicationId(appHealthMockApplicationAuthorizationData[0].applicationId),
                        authorizationInterfaceId: new AppHealthApplicationAuthorizationAuthorizationInterfaceId(appHealthMockApplicationAuthorizationData[0].authorizationInterfaceId),
                        totalUsers: new AppHealthApplicationAuthorizationTotalUsers(appHealthMockApplicationAuthorizationData[0].totalUsers),
                        score: new AppHealthApplicationAuthorizationScore(appHealthMockApplicationAuthorizationData[0].score),
                        applicationInfrastructureServiceId: new AppHealthApplicationAuthorizationApplicationInfrastructureServiceId(appHealthMockApplicationAuthorizationData[0].applicationInfrastructureServiceId),
                    },
                    {},
                    {},
                ),
            )
                .toBe(undefined);
        });
    });
});
