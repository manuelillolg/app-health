import { CQMetadata, IRepository, LiteralObject, Pagination, QueryStatement } from '@aurorajs.dev/core';
import { AppHealthApplicationAuthentication } from './app-health-application-authentication.aggregate';
import { AppHealthApplicationAuthenticationId } from './value-objects';

export abstract class AppHealthIApplicationAuthenticationRepository implements IRepository<AppHealthApplicationAuthentication>
{
    abstract readonly repository: any;

    // paginate records
    abstract paginate(
        options?: {
            queryStatement?: QueryStatement;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        }
    ): Promise<Pagination<AppHealthApplicationAuthentication>>;

    // find a single record
    abstract find(
        options?: {
            queryStatement?: QueryStatement;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        }
    ): Promise<AppHealthApplicationAuthentication | null>;

    // find a single record by id
    abstract findById(
        id: AppHealthApplicationAuthenticationId,
        options?: {
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        }
    ): Promise<AppHealthApplicationAuthentication | null>;

    // get multiple records
    abstract get(
        options?: {
            queryStatement?: QueryStatement;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        }
    ): Promise<AppHealthApplicationAuthentication[]>;

    // get records with rawSQL
    abstract rawSQL(
        options?: {
            rawSQL?: string;
            cQMetadata?: CQMetadata;
        }
    ): Promise<AppHealthApplicationAuthentication[]>;

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
        applicationAuthentication: AppHealthApplicationAuthentication,
        options?: {
            createOptions?: LiteralObject;
            dataFactory?: (aggregate: AppHealthApplicationAuthentication) => LiteralObject;
            // arguments to find object and check if object is duplicated
            finderQueryStatement?: (aggregate: AppHealthApplicationAuthentication) => QueryStatement;
        }
    ): Promise<void>;

    // create a single or multiple records
    abstract insert(
        applicationAuthentications: AppHealthApplicationAuthentication[],
        options?: {
            insertOptions?: LiteralObject;
            dataFactory?: (aggregate: AppHealthApplicationAuthentication) => LiteralObject;
        }
    ): Promise<void>;

    // update record by id
    abstract updateById(
        applicationAuthentication: AppHealthApplicationAuthentication,
        options?: {
            updateByIdOptions?: LiteralObject;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
            dataFactory?: (aggregate: AppHealthApplicationAuthentication) => LiteralObject;
            // arguments to find object to update, with i18n we use langId and id relationship with parent entity
            findArguments?: LiteralObject;
        }
    ): Promise<void>;

    // update records
    abstract update(
        applicationAuthentication: AppHealthApplicationAuthentication,
        options?: {
            updateOptions?: LiteralObject;
            queryStatement?: QueryStatement;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
            dataFactory?: (aggregate: AppHealthApplicationAuthentication) => LiteralObject;
        }
    ): Promise<void>;

    // insert or update key identification element already existing in the table
    abstract upsert(
        applicationAuthentication: AppHealthApplicationAuthentication,
        options?: {
            upsertOptions?: LiteralObject;
            dataFactory?: (aggregate: AppHealthApplicationAuthentication) => LiteralObject;
        }
    ): Promise<void>;

    // delete record
    abstract deleteById(
        id: AppHealthApplicationAuthenticationId,
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
