/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { appHealthMockApplicationAuthorizationData } from '@app/app-health/application-authorization/infrastructure/mock/app-health-mock-application-authorization.data';
import { AppHealthCreateApplicationAuthorizationService } from './app-health-create-application-authorization.service';
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

describe('AppHealthCreateApplicationAuthorizationService', () =>

{
    let service: AppHealthCreateApplicationAuthorizationService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                AppHealthCreateApplicationAuthorizationService,
                AppHealthMockApplicationAuthorizationRepository,
                {
                    provide : AppHealthIApplicationAuthorizationRepository,
                    useValue: {
                        create: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(AppHealthCreateApplicationAuthorizationService);
    });

    describe('main', () =>
    {
        test('AppHealthCreateApplicationAuthorizationService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should create a applicationAuthorization and emit event', async () =>
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
                ),
            )
                .toBe(undefined);
        });
    });
});
