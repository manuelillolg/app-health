import { CQMetadata, IRepository, LiteralObject, Pagination, QueryStatement } from '@aurorajs.dev/core';
import { AppHealthInfrastructureService } from './app-health-infrastructure-service.aggregate';
import { AppHealthInfrastructureServiceId } from './value-objects';

export abstract class AppHealthIInfrastructureServiceRepository implements IRepository<AppHealthInfrastructureService>
{
    abstract readonly repository: any;

    // paginate records
    abstract paginate(
        options?: {
            queryStatement?: QueryStatement;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        }
    ): Promise<Pagination<AppHealthInfrastructureService>>;

    // find a single record
    abstract find(
        options?: {
            queryStatement?: QueryStatement;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        }
    ): Promise<AppHealthInfrastructureService | null>;

    // find a single record by id
    abstract findById(
        id: AppHealthInfrastructureServiceId,
        options?: {
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        }
    ): Promise<AppHealthInfrastructureService | null>;

    // get multiple records
    abstract get(
        options?: {
            queryStatement?: QueryStatement;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        }
    ): Promise<AppHealthInfrastructureService[]>;

    // get records with rawSQL
    abstract rawSQL(
        options?: {
            rawSQL?: string;
            cQMetadata?: CQMetadata;
        }
    ): Promise<AppHealthInfrastructureService[]>;

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
        infrastructureService: AppHealthInfrastructureService,
        options?: {
            createOptions?: LiteralObject;
            dataFactory?: (aggregate: AppHealthInfrastructureService) => LiteralObject;
            // arguments to find object and check if object is duplicated
            finderQueryStatement?: (aggregate: AppHealthInfrastructureService) => QueryStatement;
        }
    ): Promise<void>;

    // create a single or multiple records
    abstract insert(
        infrastructureServices: AppHealthInfrastructureService[],
        options?: {
            insertOptions?: LiteralObject;
            dataFactory?: (aggregate: AppHealthInfrastructureService) => LiteralObject;
        }
    ): Promise<void>;

    // update record by id
    abstract updateById(
        infrastructureService: AppHealthInfrastructureService,
        options?: {
            updateByIdOptions?: LiteralObject;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
            dataFactory?: (aggregate: AppHealthInfrastructureService) => LiteralObject;
            // arguments to find object to update, with i18n we use langId and id relationship with parent entity
            findArguments?: LiteralObject;
        }
    ): Promise<void>;

    // update records
    abstract update(
        infrastructureService: AppHealthInfrastructureService,
        options?: {
            updateOptions?: LiteralObject;
            queryStatement?: QueryStatement;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
            dataFactory?: (aggregate: AppHealthInfrastructureService) => LiteralObject;
        }
    ): Promise<void>;

    // insert or update key identification element already existing in the table
    abstract upsert(
        infrastructureService: AppHealthInfrastructureService,
        options?: {
            upsertOptions?: LiteralObject;
            dataFactory?: (aggregate: AppHealthInfrastructureService) => LiteralObject;
        }
    ): Promise<void>;

    // delete record
    abstract deleteById(
        id: AppHealthInfrastructureServiceId,
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
