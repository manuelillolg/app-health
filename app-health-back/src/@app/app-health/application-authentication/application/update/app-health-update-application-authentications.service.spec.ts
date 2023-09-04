/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { appHealthMockApplicationAuthenticationData } from '@app/app-health/application-authentication/infrastructure/mock/app-health-mock-application-authentication.data';
import { AppHealthUpdateApplicationAuthenticationsService } from './app-health-update-application-authentications.service';
import {
    AppHealthApplicationAuthenticationId,
    AppHealthApplicationAuthenticationApplicationId,
    AppHealthApplicationAuthenticationAuthenticationInterfaceId,
    AppHealthApplicationAuthenticationTotalUsers,
    AppHealthApplicationAuthenticationScore,
    AppHealthApplicationAuthenticationApplicationInfrastructureServiceId,
    AppHealthApplicationAuthenticationCreatedAt,
    AppHealthApplicationAuthenticationUpdatedAt,
    AppHealthApplicationAuthenticationDeletedAt,
} from '../../domain/value-objects';
import { AppHealthIApplicationAuthenticationRepository } from '../../domain/app-health-application-authentication.repository';
import { AppHealthMockApplicationAuthenticationRepository } from '../../infrastructure/mock/app-health-mock-application-authentication.repository';

describe('AppHealthUpdateApplicationAuthenticationsService', () =>
{
    let service: AppHealthUpdateApplicationAuthenticationsService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                AppHealthUpdateApplicationAuthenticationsService,
                AppHealthMockApplicationAuthenticationRepository,
                {
                    provide : AppHealthIApplicationAuthenticationRepository,
                    useValue: {
                        update: () => { /**/ },
                        get   : () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(AppHealthUpdateApplicationAuthenticationsService);
    });

    describe('main', () =>
    {
        test('UpdateApplicationAuthenticationsService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should update a applicationAuthentications and emit event', async () =>
        {
            expect(
                await service.main(
                    {
                        id: new AppHealthApplicationAuthenticationId(appHealthMockApplicationAuthenticationData[0].id),
                        applicationId: new AppHealthApplicationAuthenticationApplicationId(appHealthMockApplicationAuthenticationData[0].applicationId),
                        authenticationInterfaceId: new AppHealthApplicationAuthenticationAuthenticationInterfaceId(appHealthMockApplicationAuthenticationData[0].authenticationInterfaceId),
                        totalUsers: new AppHealthApplicationAuthenticationTotalUsers(appHealthMockApplicationAuthenticationData[0].totalUsers),
                        score: new AppHealthApplicationAuthenticationScore(appHealthMockApplicationAuthenticationData[0].score),
                        applicationInfrastructureServiceId: new AppHealthApplicationAuthenticationApplicationInfrastructureServiceId(appHealthMockApplicationAuthenticationData[0].applicationInfrastructureServiceId),
                    },
                    {},
                    {},
                ),
            )
                .toBe(undefined);
        });
    });
});
