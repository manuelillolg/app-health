/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { appHealthMockDatabaseData } from '@app/app-health/database/infrastructure/mock/app-health-mock-database.data';
import { AppHealthUpdateDatabaseByIdService } from './app-health-update-database-by-id.service';
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

describe('AppHealthUpdateDatabaseByIdService', () =>
{
    let service: AppHealthUpdateDatabaseByIdService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                AppHealthUpdateDatabaseByIdService,
                AppHealthMockDatabaseRepository,
                {
                    provide : AppHealthIDatabaseRepository,
                    useValue: {
                        updateById: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(AppHealthUpdateDatabaseByIdService);
    });

    describe('main', () =>
    {
        test('AppHealthUpdateDatabaseByIdService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should update a database and emit event', async () =>
        {
            expect(
                await service.main(
                    {
                        id: new AppHealthDatabaseId(appHealthMockDatabaseData[0].id),
                        name: new AppHealthDatabaseName(appHealthMockDatabaseData[0].name),
                        type: new AppHealthDatabaseType(appHealthMockDatabaseData[0].type),
                        versions: new AppHealthDatabaseVersions(appHealthMockDatabaseData[0].versions),
                    },
                    {},
                ),
            ).toBe(undefined);
        });
    });
});
