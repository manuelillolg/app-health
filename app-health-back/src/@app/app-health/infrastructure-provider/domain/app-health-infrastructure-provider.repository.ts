import { CQMetadata, IRepository, LiteralObject, Pagination, QueryStatement } from '@aurorajs.dev/core';
import { AppHealthInfrastructureProvider } from './app-health-infrastructure-provider.aggregate';
import { AppHealthInfrastructureProviderId } from './value-objects';

export abstract class AppHealthIInfrastructureProviderRepository implements IRepository<AppHealthInfrastructureProvider>
{
    abstract readonly repository: any;

    // paginate records
    abstract paginate(
        options?: {
            queryStatement?: QueryStatement;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        }
    ): Promise<Pagination<AppHealthInfrastructureProvider>>;

    // find a single record
    abstract find(
        options?: {
            queryStatement?: QueryStatement;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        }
    ): Promise<AppHealthInfrastructureProvider | null>;

    // find a single record by id
    abstract findById(
        id: AppHealthInfrastructureProviderId,
        options?: {
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        }
    ): Promise<AppHealthInfrastructureProvider | null>;

    // get multiple records
    abstract get(
        options?: {
            queryStatement?: QueryStatement;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        }
    ): Promise<AppHealthInfrastructureProvider[]>;

    // get records with rawSQL
    abstract rawSQL(
        options?: {
            rawSQL?: string;
            cQMetadata?: CQMetadata;
        }
    ): Promise<AppHealthInfrastructureProvider[]>;

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
        infrastructureProvider: AppHealthInfrastructureProvider,
        options?: {
            createOptions?: LiteralObject;
            dataFactory?: (aggregate: AppHealthInfrastructureProvider) => LiteralObject;
            // arguments to find object and check if object is duplicated
            finderQueryStatement?: (aggregate: AppHealthInfrastructureProvider) => QueryStatement;
        }
    ): Promise<void>;

    // create a single or multiple records
    abstract insert(
        infrastructureProviders: AppHealthInfrastructureProvider[],
        options?: {
            insertOptions?: LiteralObject;
            dataFactory?: (aggregate: AppHealthInfrastructureProvider) => LiteralObject;
        }
    ): Promise<void>;

    // update record by id
    abstract updateById(
        infrastructureProvider: AppHealthInfrastructureProvider,
        options?: {
            updateByIdOptions?: LiteralObject;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
            dataFactory?: (aggregate: AppHealthInfrastructureProvider) => LiteralObject;
            // arguments to find object to update, with i18n we use langId and id relationship with parent entity
            findArguments?: LiteralObject;
        }
    ): Promise<void>;

    // update records
    abstract update(
        infrastructureProvider: AppHealthInfrastructureProvider,
        options?: {
            updateOptions?: LiteralObject;
            queryStatement?: QueryStatement;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
            dataFactory?: (aggregate: AppHealthInfrastructureProvider) => LiteralObject;
        }
    ): Promise<void>;

    // insert or update key identification element already existing in the table
    abstract upsert(
        infrastructureProvider: AppHealthInfrastructureProvider,
        options?: {
            upsertOptions?: LiteralObject;
            dataFactory?: (aggregate: AppHealthInfrastructureProvider) => LiteralObject;
        }
    ): Promise<void>;

    // delete record
    abstract deleteById(
        id: AppHealthInfrastructureProviderId,
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
