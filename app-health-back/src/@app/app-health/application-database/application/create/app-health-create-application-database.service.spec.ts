/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { appHealthMockApplicationDatabaseData } from '@app/app-health/application-database/infrastructure/mock/app-health-mock-application-database.data';
import { AppHealthCreateApplicationDatabaseService } from './app-health-create-application-database.service';
import {
    AppHealthApplicationDatabaseId,
    AppHealthApplicationDatabaseApplicationId,
    AppHealthApplicationDatabaseDatabaseId,
    AppHealthApplicationDatabaseVersion,
    AppHealthApplicationDatabaseSize,
    AppHealthApplicationDatabaseScore,
    AppHealthApplicationDatabaseTotalCollectionsTables,
    AppHealthApplicationDatabaseTotalFields,
    AppHealthApplicationDatabaseApplicationInfrastructureServiceId,
    AppHealthApplicationDatabaseCreatedAt,
    AppHealthApplicationDatabaseUpdatedAt,
    AppHealthApplicationDatabaseDeletedAt,
} from '../../domain/value-objects';
import { AppHealthIApplicationDatabaseRepository } from '../../domain/app-health-application-database.repository';
import { AppHealthMockApplicationDatabaseRepository } from '../../infrastructure/mock/app-health-mock-application-database.repository';

describe('AppHealthCreateApplicationDatabaseService', () =>

{
    let service: AppHealthCreateApplicationDatabaseService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                AppHealthCreateApplicationDatabaseService,
                AppHealthMockApplicationDatabaseRepository,
                {
                    provide : AppHealthIApplicationDatabaseRepository,
                    useValue: {
                        create: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(AppHealthCreateApplicationDatabaseService);
    });

    describe('main', () =>
    {
        test('AppHealthCreateApplicationDatabaseService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should create a applicationDatabase and emit event', async () =>
        {
            expect(
                await service.main(
                    {
                        id: new AppHealthApplicationDatabaseId(appHealthMockApplicationDatabaseData[0].id),
                        applicationId: new AppHealthApplicationDatabaseApplicationId(appHealthMockApplicationDatabaseData[0].applicationId),
                        databaseId: new AppHealthApplicationDatabaseDatabaseId(appHealthMockApplicationDatabaseData[0].databaseId),
                        version: new AppHealthApplicationDatabaseVersion(appHealthMockApplicationDatabaseData[0].version),
                        size: new AppHealthApplicationDatabaseSize(appHealthMockApplicationDatabaseData[0].size),
                        score: new AppHealthApplicationDatabaseScore(appHealthMockApplicationDatabaseData[0].score),
                        totalCollectionsTables: new AppHealthApplicationDatabaseTotalCollectionsTables(appHealthMockApplicationDatabaseData[0].totalCollectionsTables),
                        totalFields: new AppHealthApplicationDatabaseTotalFields(appHealthMockApplicationDatabaseData[0].totalFields),
                        applicationInfrastructureServiceId: new AppHealthApplicationDatabaseApplicationInfrastructureServiceId(appHealthMockApplicationDatabaseData[0].applicationInfrastructureServiceId),
                    },
                ),
            )
                .toBe(undefined);
        });
    });
});
