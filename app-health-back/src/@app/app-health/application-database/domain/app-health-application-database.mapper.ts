import { IMapper, LiteralObject, MapperOptions, CQMetadata } from '@aurorajs.dev/core';
import { AppHealthApplicationDatabase } from './app-health-application-database.aggregate';
import { AppHealthApplicationDatabaseResponse } from './app-health-application-database.response';
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
} from './value-objects';
import { AppHealthApplicationMapper } from '@app/app-health/application';
import { AppHealthDatabaseMapper } from '@app/app-health/database';
import { AppHealthApplicationInfrastructureServiceMapper } from '@app/app-health/application-infrastructure-service';

export class AppHealthApplicationDatabaseMapper implements IMapper
{
    constructor(
        public options: MapperOptions = { eagerLoading: true },
    ) {}

    /**
     * Map object to aggregate
     * @param applicationDatabase
     */
    mapModelToAggregate(applicationDatabase: LiteralObject, cQMetadata?: CQMetadata): AppHealthApplicationDatabase
    {
        if (!applicationDatabase) return;

        return this.makeAggregate(applicationDatabase, cQMetadata);
    }

    /**
     * Map array of objects to array aggregates
     * @param applicationDatabases
     */
    mapModelsToAggregates(applicationDatabases: LiteralObject[], cQMetadata?: CQMetadata): AppHealthApplicationDatabase[]
    {
        if (!Array.isArray(applicationDatabases)) return;

        return applicationDatabases.map(applicationDatabase => this.makeAggregate(applicationDatabase, cQMetadata));
    }

    /**
     * Map aggregate to response
     * @param applicationDatabase
     */
    mapAggregateToResponse(applicationDatabase: AppHealthApplicationDatabase): AppHealthApplicationDatabaseResponse
    {
        return this.makeResponse(applicationDatabase);
    }

    /**
     * Map array of aggregates to array responses
     * @param applicationDatabases
     */
    mapAggregatesToResponses(applicationDatabases: AppHealthApplicationDatabase[]): AppHealthApplicationDatabaseResponse[]
    {
        if (!Array.isArray(applicationDatabases)) return;

        return applicationDatabases.map(applicationDatabase => this.makeResponse(applicationDatabase));
    }

    private makeAggregate(applicationDatabase: LiteralObject, cQMetadata?: CQMetadata): AppHealthApplicationDatabase
    {
        return AppHealthApplicationDatabase.register(
            new AppHealthApplicationDatabaseId(applicationDatabase.id, { undefinable: true }),
            new AppHealthApplicationDatabaseApplicationId(applicationDatabase.applicationId, { undefinable: true }),
            new AppHealthApplicationDatabaseDatabaseId(applicationDatabase.databaseId, { undefinable: true }),
            new AppHealthApplicationDatabaseVersion(applicationDatabase.version, { undefinable: true }),
            new AppHealthApplicationDatabaseSize(applicationDatabase.size, { undefinable: true }),
            new AppHealthApplicationDatabaseScore(applicationDatabase.score, { undefinable: true }),
            new AppHealthApplicationDatabaseTotalCollectionsTables(applicationDatabase.totalCollectionsTables, { undefinable: true }),
            new AppHealthApplicationDatabaseTotalFields(applicationDatabase.totalFields, { undefinable: true }),
            new AppHealthApplicationDatabaseApplicationInfrastructureServiceId(applicationDatabase.applicationInfrastructureServiceId, { undefinable: true }),
            new AppHealthApplicationDatabaseCreatedAt(applicationDatabase.createdAt, { undefinable: true }, { addTimezone: cQMetadata?.timezone }),
            new AppHealthApplicationDatabaseUpdatedAt(applicationDatabase.updatedAt, { undefinable: true }, { addTimezone: cQMetadata?.timezone }),
            new AppHealthApplicationDatabaseDeletedAt(applicationDatabase.deletedAt, { undefinable: true }, { addTimezone: cQMetadata?.timezone }),
            this.options.eagerLoading ? new AppHealthApplicationMapper({ eagerLoading: true }).mapModelToAggregate(applicationDatabase.application, cQMetadata) : undefined,
            this.options.eagerLoading ? new AppHealthDatabaseMapper({ eagerLoading: true }).mapModelToAggregate(applicationDatabase.database, cQMetadata) : undefined,
            this.options.eagerLoading ? new AppHealthApplicationInfrastructureServiceMapper({ eagerLoading: true }).mapModelToAggregate(applicationDatabase.applicationInfrastructureService, cQMetadata) : undefined,
        );
    }

    private makeResponse(applicationDatabase: AppHealthApplicationDatabase): AppHealthApplicationDatabaseResponse
    {
        if (!applicationDatabase) return;

        return new AppHealthApplicationDatabaseResponse(
            applicationDatabase.id.value,
            applicationDatabase.applicationId.value,
            applicationDatabase.databaseId.value,
            applicationDatabase.version.value,
            applicationDatabase.size.value,
            applicationDatabase.score.value,
            applicationDatabase.totalCollectionsTables.value,
            applicationDatabase.totalFields.value,
            applicationDatabase.applicationInfrastructureServiceId.value,
            applicationDatabase.createdAt.value,
            applicationDatabase.updatedAt.value,
            applicationDatabase.deletedAt.value,
            this.options.eagerLoading ? new AppHealthApplicationMapper({ eagerLoading: true }).mapAggregateToResponse(applicationDatabase.application) : undefined,
            this.options.eagerLoading ? new AppHealthDatabaseMapper({ eagerLoading: true }).mapAggregateToResponse(applicationDatabase.database) : undefined,
            this.options.eagerLoading ? new AppHealthApplicationInfrastructureServiceMapper({ eagerLoading: true }).mapAggregateToResponse(applicationDatabase.applicationInfrastructureService) : undefined,
        );
    }
}
