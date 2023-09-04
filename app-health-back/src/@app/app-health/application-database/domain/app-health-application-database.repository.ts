import { CQMetadata, IRepository, LiteralObject, Pagination, QueryStatement } from '@aurorajs.dev/core';
import { AppHealthApplicationDatabase } from './app-health-application-database.aggregate';
import { AppHealthApplicationDatabaseId } from './value-objects';

export abstract class AppHealthIApplicationDatabaseRepository implements IRepository<AppHealthApplicationDatabase>
{
    abstract readonly repository: any;

    // paginate records
    abstract paginate(
        options?: {
            queryStatement?: QueryStatement;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        }
    ): Promise<Pagination<AppHealthApplicationDatabase>>;

    // find a single record
    abstract find(
        options?: {
            queryStatement?: QueryStatement;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        }
    ): Promise<AppHealthApplicationDatabase | null>;

    // find a single record by id
    abstract findById(
        id: AppHealthApplicationDatabaseId,
        options?: {
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        }
    ): Promise<AppHealthApplicationDatabase | null>;

    // get multiple records
    abstract get(
        options?: {
            queryStatement?: QueryStatement;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        }
    ): Promise<AppHealthApplicationDatabase[]>;

    // get records with rawSQL
    abstract rawSQL(
        options?: {
            rawSQL?: string;
            cQMetadata?: CQMetadata;
        }
    ): Promise<AppHealthApplicationDatabase[]>;

    // count records
    abstract count(
        options?: {
            queryStatement?: QueryStatement;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        }
    ): Promise<number>;

    // ******************
    // ** side effects **
    // ******************

    // create a single record
    abstract create(
        applicationDatabase: AppHealthApplicationDatabase,
        options?: {
            createOptions?: LiteralObject;
            dataFactory?: (aggregate: AppHealthApplicationDatabase) => LiteralObject;
            // arguments to find object and check if object is duplicated
            finderQueryStatement?: (aggregate: AppHealthApplicationDatabase) => QueryStatement;
        }
    ): Promise<void>;

    // create a single or multiple records
    abstract insert(
        applicationDatabases: AppHealthApplicationDatabase[],
        options?: {
            insertOptions?: LiteralObject;
            dataFactory?: (aggregate: AppHealthApplicationDatabase) => LiteralObject;
        }
    ): Promise<void>;

    // update record by id
    abstract updateById(
        applicationDatabase: AppHealthApplicationDatabase,
        options?: {
            updateByIdOptions?: LiteralObject;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
            dataFactory?: (aggregate: AppHealthApplicationDatabase) => LiteralObject;
            // arguments to find object to update, with i18n we use langId and id relationship with parent entity
            findArguments?: LiteralObject;
        }
    ): Promise<void>;

    // update records
    abstract update(
        applicationDatabase: AppHealthApplicationDatabase,
        options?: {
            updateOptions?: LiteralObject;
            queryStatement?: QueryStatement;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
            dataFactory?: (aggregate: AppHealthApplicationDatabase) => LiteralObject;
        }
    ): Promise<void>;

    // insert or update key identification element already existing in the table
    abstract upsert(
        applicationDatabase: AppHealthApplicationDatabase,
        options?: {
            upsertOptions?: LiteralObject;
            dataFactory?: (aggregate: AppHealthApplicationDatabase) => LiteralObject;
        }
    ): Promise<void>;

    // delete record
    abstract deleteById(
        id: AppHealthApplicationDatabaseId,
        options?: {
            deleteOptions?: LiteralObject;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        }
    ): Promise<void>;

    // delete records
    abstract delete(
        options?: {
            deleteOptions?: LiteralObject;
            queryStatement?: QueryStatement;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        }
    ): Promise<void>;
}
