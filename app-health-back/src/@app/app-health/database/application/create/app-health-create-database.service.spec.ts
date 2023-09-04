/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { appHealthMockDatabaseData } from '@app/app-health/database/infrastructure/mock/app-health-mock-database.data';
import { AppHealthCreateDatabaseService } from './app-health-create-database.service';
import {
    AppHealthDatabaseId,
    AppHealthDatabaseName,
    AppHealthDatabaseType,
    AppHealthDatabaseVersions,
    AppHealthDatabaseCreatedAt,
    AppHealthDatabaseUpdatedAt,
    AppHealthDatabaseDeletedAt,
} from '../../domain/value-objects';
import { AppHealthIDatabaseRepository } from '../../domain/app-health-database.repository';
import { AppHealthMockDatabaseRepository } from '../../infrastructure/mock/app-health-mock-database.repository';

describe('AppHealthCreateDatabaseService', () =>

{
    let service: AppHealthCreateDatabaseService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                AppHealthCreateDatabaseService,
                AppHealthMockDatabaseRepository,
                {
                    provide : AppHealthIDatabaseRepository,
                    useValue: {
                        create: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(AppHealthCreateDatabaseService);
    });

    describe('main', () =>
    {
        test('AppHealthCreateDatabaseService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should create a database and emit event', async () =>
        {
            expect(
                await service.main(
                    {
                        id: new AppHealthDatabaseId(appHealthMockDatabaseData[0].id),
                        name: new AppHealthDatabaseName(appHealthMockDatabaseData[0].name),
                        type: new AppHealthDatabaseType(appHealthMockDatabaseData[0].type),
                        versions: new AppHealthDatabaseVersions(appHealthMockDatabaseData[0].versions),
                    },
                ),
            )
                .toBe(undefined);
        });
    });
});
