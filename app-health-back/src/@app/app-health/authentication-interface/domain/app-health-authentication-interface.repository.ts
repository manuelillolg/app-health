import { CQMetadata, IRepository, LiteralObject, Pagination, QueryStatement } from '@aurorajs.dev/core';
import { AppHealthAuthenticationInterface } from './app-health-authentication-interface.aggregate';
import { AppHealthAuthenticationInterfaceId } from './value-objects';

export abstract class AppHealthIAuthenticationInterfaceRepository implements IRepository<AppHealthAuthenticationInterface>
{
    abstract readonly repository: any;

    // paginate records
    abstract paginate(
        options?: {
            queryStatement?: QueryStatement;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        }
    ): Promise<Pagination<AppHealthAuthenticationInterface>>;

    // find a single record
    abstract find(
        options?: {
            queryStatement?: QueryStatement;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        }
    ): Promise<AppHealthAuthenticationInterface | null>;

    // find a single record by id
    abstract findById(
        id: AppHealthAuthenticationInterfaceId,
        options?: {
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        }
    ): Promise<AppHealthAuthenticationInterface | null>;

    // get multiple records
    abstract get(
        options?: {
            queryStatement?: QueryStatement;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        }
    ): Promise<AppHealthAuthenticationInterface[]>;

    // get records with rawSQL
    abstract rawSQL(
        options?: {
            rawSQL?: string;
            cQMetadata?: CQMetadata;
        }
    ): Promise<AppHealthAuthenticationInterface[]>;

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
        authenticationInterface: AppHealthAuthenticationInterface,
        options?: {
            createOptions?: LiteralObject;
            dataFactory?: (aggregate: AppHealthAuthenticationInterface) => LiteralObject;
            // arguments to find object and check if object is duplicated
            finderQueryStatement?: (aggregate: AppHealthAuthenticationInterface) => QueryStatement;
        }
    ): Promise<void>;

    // create a single or multiple records
    abstract insert(
        authenticationInterfaces: AppHealthAuthenticationInterface[],
        options?: {
            insertOptions?: LiteralObject;
            dataFactory?: (aggregate: AppHealthAuthenticationInterface) => LiteralObject;
        }
    ): Promise<void>;

    // update record by id
    abstract updateById(
        authenticationInterface: AppHealthAuthenticationInterface,
        options?: {
            updateByIdOptions?: LiteralObject;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
            dataFactory?: (aggregate: AppHealthAuthenticationInterface) => LiteralObject;
            // arguments to find object to update, with i18n we use langId and id relationship with parent entity
            findArguments?: LiteralObject;
        }
    ): Promise<void>;

    // update records
    abstract update(
        authenticationInterface: AppHealthAuthenticationInterface,
        options?: {
            updateOptions?: LiteralObject;
            queryStatement?: QueryStatement;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
            dataFactory?: (aggregate: AppHealthAuthenticationInterface) => LiteralObject;
        }
    ): Promise<void>;

    // insert or update key identification element already existing in the table
    abstract upsert(
        authenticationInterface: AppHealthAuthenticationInterface,
        options?: {
            upsertOptions?: LiteralObject;
            dataFactory?: (aggregate: AppHealthAuthenticationInterface) => LiteralObject;
        }
    ): Promise<void>;

    // delete record
    abstract deleteById(
        id: AppHealthAuthenticationInterfaceId,
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
