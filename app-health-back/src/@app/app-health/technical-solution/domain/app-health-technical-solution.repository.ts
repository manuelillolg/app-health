import { CQMetadata, IRepository, LiteralObject, Pagination, QueryStatement } from '@aurorajs.dev/core';
import { AppHealthTechnicalSolution } from './app-health-technical-solution.aggregate';
import { AppHealthTechnicalSolutionId } from './value-objects';

export abstract class AppHealthITechnicalSolutionRepository implements IRepository<AppHealthTechnicalSolution>
{
    abstract readonly repository: any;

    // paginate records
    abstract paginate(
        options?: {
            queryStatement?: QueryStatement;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        }
    ): Promise<Pagination<AppHealthTechnicalSolution>>;

    // find a single record
    abstract find(
        options?: {
            queryStatement?: QueryStatement;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        }
    ): Promise<AppHealthTechnicalSolution | null>;

    // find a single record by id
    abstract findById(
        id: AppHealthTechnicalSolutionId,
        options?: {
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        }
    ): Promise<AppHealthTechnicalSolution | null>;

    // get multiple records
    abstract get(
        options?: {
            queryStatement?: QueryStatement;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        }
    ): Promise<AppHealthTechnicalSolution[]>;

    // get records with rawSQL
    abstract rawSQL(
        options?: {
            rawSQL?: string;
            cQMetadata?: CQMetadata;
        }
    ): Promise<AppHealthTechnicalSolution[]>;

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
        technicalSolution: AppHealthTechnicalSolution,
        options?: {
            createOptions?: LiteralObject;
            dataFactory?: (aggregate: AppHealthTechnicalSolution) => LiteralObject;
            // arguments to find object and check if object is duplicated
            finderQueryStatement?: (aggregate: AppHealthTechnicalSolution) => QueryStatement;
        }
    ): Promise<void>;

    // create a single or multiple records
    abstract insert(
        technicalSolutions: AppHealthTechnicalSolution[],
        options?: {
            insertOptions?: LiteralObject;
            dataFactory?: (aggregate: AppHealthTechnicalSolution) => LiteralObject;
        }
    ): Promise<void>;

    // update record by id
    abstract updateById(
        technicalSolution: AppHealthTechnicalSolution,
        options?: {
            updateByIdOptions?: LiteralObject;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
            dataFactory?: (aggregate: AppHealthTechnicalSolution) => LiteralObject;
            // arguments to find object to update, with i18n we use langId and id relationship with parent entity
            findArguments?: LiteralObject;
        }
    ): Promise<void>;

    // update records
    abstract update(
        technicalSolution: AppHealthTechnicalSolution,
        options?: {
            updateOptions?: LiteralObject;
            queryStatement?: QueryStatement;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
            dataFactory?: (aggregate: AppHealthTechnicalSolution) => LiteralObject;
        }
    ): Promise<void>;

    // insert or update key identification element already existing in the table
    abstract upsert(
        technicalSolution: AppHealthTechnicalSolution,
        options?: {
            upsertOptions?: LiteralObject;
            dataFactory?: (aggregate: AppHealthTechnicalSolution) => LiteralObject;
        }
    ): Promise<void>;

    // delete record
    abstract deleteById(
        id: AppHealthTechnicalSolutionId,
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
