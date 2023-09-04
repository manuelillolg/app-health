import { IMapper, LiteralObject, MapperOptions, CQMetadata } from '@aurorajs.dev/core';
import { AppHealthDatabase } from './app-health-database.aggregate';
import { AppHealthDatabaseResponse } from './app-health-database.response';
import {
    AppHealthDatabaseId,
    AppHealthDatabaseName,
    AppHealthDatabaseType,
    AppHealthDatabaseVersions,
    AppHealthDatabaseCreatedAt,
    AppHealthDatabaseUpdatedAt,
    AppHealthDatabaseDeletedAt,
} from './value-objects';

export class AppHealthDatabaseMapper implements IMapper
{
    constructor(
        public options: MapperOptions = { eagerLoading: true },
    ) {}

    /**
     * Map object to aggregate
     * @param database
     */
    mapModelToAggregate(database: LiteralObject, cQMetadata?: CQMetadata): AppHealthDatabase
    {
        if (!database) return;

        return this.makeAggregate(database, cQMetadata);
    }

    /**
     * Map array of objects to array aggregates
     * @param databases
     */
    mapModelsToAggregates(databases: LiteralObject[], cQMetadata?: CQMetadata): AppHealthDatabase[]
    {
        if (!Array.isArray(databases)) return;

        return databases.map(database => this.makeAggregate(database, cQMetadata));
    }

    /**
     * Map aggregate to response
     * @param database
     */
    mapAggregateToResponse(database: AppHealthDatabase): AppHealthDatabaseResponse
    {
        return this.makeResponse(database);
    }

    /**
     * Map array of aggregates to array responses
     * @param databases
     */
    mapAggregatesToResponses(databases: AppHealthDatabase[]): AppHealthDatabaseResponse[]
    {
        if (!Array.isArray(databases)) return;

        return databases.map(database => this.makeResponse(database));
    }

    private makeAggregate(database: LiteralObject, cQMetadata?: CQMetadata): AppHealthDatabase
    {
        return AppHealthDatabase.register(
            new AppHealthDatabaseId(database.id, { undefinable: true }),
            new AppHealthDatabaseName(database.name, { undefinable: true }),
            new AppHealthDatabaseType(database.type, { undefinable: true }),
            new AppHealthDatabaseVersions(database.versions, { undefinable: true }),
            new AppHealthDatabaseCreatedAt(database.createdAt, { undefinable: true }, { addTimezone: cQMetadata?.timezone }),
            new AppHealthDatabaseUpdatedAt(database.updatedAt, { undefinable: true }, { addTimezone: cQMetadata?.timezone }),
            new AppHealthDatabaseDeletedAt(database.deletedAt, { undefinable: true }, { addTimezone: cQMetadata?.timezone }),
        );
    }

    private makeResponse(database: AppHealthDatabase): AppHealthDatabaseResponse
    {
        if (!database) return;

        return new AppHealthDatabaseResponse(
            database.id.value,
            database.name.value,
            database.type.value,
            database.versions.value,
            database.createdAt.value,
            database.updatedAt.value,
            database.deletedAt.value,
        );
    }
}
