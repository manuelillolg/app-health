import { CQMetadata, IRepository, LiteralObject, Pagination, QueryStatement } from '@aurorajs.dev/core';
import { AppHealthAuthorizationInterface } from './app-health-authorization-interface.aggregate';
import { AppHealthAuthorizationInterfaceId } from './value-objects';

export abstract class AppHealthIAuthorizationInterfaceRepository implements IRepository<AppHealthAuthorizationInterface>
{
    abstract readonly repository: any;

    // paginate records
    abstract paginate(
        options?: {
            queryStatement?: QueryStatement;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        }
    ): Promise<Pagination<AppHealthAuthorizationInterface>>;

    // find a single record
    abstract find(
        options?: {
            queryStatement?: QueryStatement;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        }
    ): Promise<AppHealthAuthorizationInterface | null>;

    // find a single record by id
    abstract findById(
        id: AppHealthAuthorizationInterfaceId,
        options?: {
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        }
    ): Promise<AppHealthAuthorizationInterface | null>;

    // get multiple records
    abstract get(
        options?: {
            queryStatement?: QueryStatement;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        }
    ): Promise<AppHealthAuthorizationInterface[]>;

    // get records with rawSQL
    abstract rawSQL(
        options?: {
            rawSQL?: string;
            cQMetadata?: CQMetadata;
        }
    ): Promise<AppHealthAuthorizationInterface[]>;

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
        authorizationInterface: AppHealthAuthorizationInterface,
        options?: {
            createOptions?: LiteralObject;
            dataFactory?: (aggregate: AppHealthAuthorizationInterface) => LiteralObject;
            // arguments to find object and check if object is duplicated
            finderQueryStatement?: (aggregate: AppHealthAuthorizationInterface) => QueryStatement;
        }
    ): Promise<void>;

    // create a single or multiple records
    abstract insert(
        authorizationInterfaces: AppHealthAuthorizationInterface[],
        options?: {
            insertOptions?: LiteralObject;
            dataFactory?: (aggregate: AppHealthAuthorizationInterface) => LiteralObject;
        }
    ): Promise<void>;

    // update record by id
    abstract updateById(
        authorizationInterface: AppHealthAuthorizationInterface,
        options?: {
            updateByIdOptions?: LiteralObject;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
            dataFactory?: (aggregate: AppHealthAuthorizationInterface) => LiteralObject;
            // arguments to find object to update, with i18n we use langId and id relationship with parent entity
            findArguments?: LiteralObject;
        }
    ): Promise<void>;

    // update records
    abstract update(
        authorizationInterface: AppHealthAuthorizationInterface,
        options?: {
            updateOptions?: LiteralObject;
            queryStatement?: QueryStatement;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
            dataFactory?: (aggregate: AppHealthAuthorizationInterface) => LiteralObject;
        }
    ): Promise<void>;

    // insert or update key identification element already existing in the table
    abstract upsert(
        authorizationInterface: AppHealthAuthorizationInterface,
        options?: {
            upsertOptions?: LiteralObject;
            dataFactory?: (aggregate: AppHealthAuthorizationInterface) => LiteralObject;
        }
    ): Promise<void>;

    // delete record
    abstract deleteById(
        id: AppHealthAuthorizationInterfaceId,
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
