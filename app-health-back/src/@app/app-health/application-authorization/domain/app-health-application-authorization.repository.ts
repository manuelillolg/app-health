import { CQMetadata, IRepository, LiteralObject, Pagination, QueryStatement } from '@aurorajs.dev/core';
import { AppHealthApplicationAuthorization } from './app-health-application-authorization.aggregate';
import { AppHealthApplicationAuthorizationId } from './value-objects';

export abstract class AppHealthIApplicationAuthorizationRepository implements IRepository<AppHealthApplicationAuthorization>
{
    abstract readonly repository: any;

    // paginate records
    abstract paginate(
        options?: {
            queryStatement?: QueryStatement;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        }
    ): Promise<Pagination<AppHealthApplicationAuthorization>>;

    // find a single record
    abstract find(
        options?: {
            queryStatement?: QueryStatement;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        }
    ): Promise<AppHealthApplicationAuthorization | null>;

    // find a single record by id
    abstract findById(
        id: AppHealthApplicationAuthorizationId,
        options?: {
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        }
    ): Promise<AppHealthApplicationAuthorization | null>;

    // get multiple records
    abstract get(
        options?: {
            queryStatement?: QueryStatement;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        }
    ): Promise<AppHealthApplicationAuthorization[]>;

    // get records with rawSQL
    abstract rawSQL(
        options?: {
            rawSQL?: string;
            cQMetadata?: CQMetadata;
        }
    ): Promise<AppHealthApplicationAuthorization[]>;

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
        applicationAuthorization: AppHealthApplicationAuthorization,
        options?: {
            createOptions?: LiteralObject;
            dataFactory?: (aggregate: AppHealthApplicationAuthorization) => LiteralObject;
            // arguments to find object and check if object is duplicated
            finderQueryStatement?: (aggregate: AppHealthApplicationAuthorization) => QueryStatement;
        }
    ): Promise<void>;

    // create a single or multiple records
    abstract insert(
        applicationAuthorizations: AppHealthApplicationAuthorization[],
        options?: {
            insertOptions?: LiteralObject;
            dataFactory?: (aggregate: AppHealthApplicationAuthorization) => LiteralObject;
        }
    ): Promise<void>;

    // update record by id
    abstract updateById(
        applicationAuthorization: AppHealthApplicationAuthorization,
        options?: {
            updateByIdOptions?: LiteralObject;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
            dataFactory?: (aggregate: AppHealthApplicationAuthorization) => LiteralObject;
            // arguments to find object to update, with i18n we use langId and id relationship with parent entity
            findArguments?: LiteralObject;
        }
    ): Promise<void>;

    // update records
    abstract update(
        applicationAuthorization: AppHealthApplicationAuthorization,
        options?: {
            updateOptions?: LiteralObject;
            queryStatement?: QueryStatement;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
            dataFactory?: (aggregate: AppHealthApplicationAuthorization) => LiteralObject;
        }
    ): Promise<void>;

    // insert or update key identification element already existing in the table
    abstract upsert(
        applicationAuthorization: AppHealthApplicationAuthorization,
        options?: {
            upsertOptions?: LiteralObject;
            dataFactory?: (aggregate: AppHealthApplicationAuthorization) => LiteralObject;
        }
    ): Promise<void>;

    // delete record
    abstract deleteById(
        id: AppHealthApplicationAuthorizationId,
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
