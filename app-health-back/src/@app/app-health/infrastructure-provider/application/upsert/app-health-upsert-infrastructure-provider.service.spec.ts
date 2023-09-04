/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { appHealthMockInfrastructureProviderData } from '@app/app-health/infrastructure-provider/infrastructure/mock/app-health-mock-infrastructure-provider.data';
import { AppHealthUpsertInfrastructureProviderService } from './app-health-upsert-infrastructure-provider.service';
import {
    AppHealthInfrastructureProviderId,
    AppHealthInfrastructureProviderName,
    AppHealthInfrastructureProviderScore,
    AppHealthInfrastructureProviderCreatedAt,
    AppHealthInfrastructureProviderUpdatedAt,
    AppHealthInfrastructureProviderDeletedAt,
} from '../../domain/value-objects';
import { AppHealthIInfrastructureProviderRepository } from '../../domain/app-health-infrastructure-provider.repository';
import { AppHealthMockInfrastructureProviderRepository } from '../../infrastructure/mock/app-health-mock-infrastructure-provider.repository';

describe('AppHealthUpsertInfrastructureProviderService', () =>

{
    let service: AppHealthUpsertInfrastructureProviderService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                AppHealthUpsertInfrastructureProviderService,
                AppHealthMockInfrastructureProviderRepository,
                {
                    provide : AppHealthIInfrastructureProviderRepository,
                    useValue: {
                        upsert: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(AppHealthUpsertInfrastructureProviderService);
    });

    describe('main', () =>
    {
        test('AppHealthUpsertInfrastructureProviderService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should upsert a infrastructureProvider and emit event', async () =>
        {
            expect(
                await service.main(
                    {
                        id: new AppHealthInfrastructureProviderId(appHealthMockInfrastructureProviderData[0].id),
                        name: new AppHealthInfrastructureProviderName(appHealthMockInfrastructureProviderData[0].name),
                        score: new AppHealthInfrastructureProviderScore(appHealthMockInfrastructureProviderData[0].score),
                    },
                ),
            )
                .toBe(undefined);
        });
    });
});
