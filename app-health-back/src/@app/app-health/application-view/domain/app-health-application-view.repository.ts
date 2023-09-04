import { CQMetadata, IRepository, LiteralObject, Pagination, QueryStatement } from '@aurorajs.dev/core';
import { AppHealthApplicationView } from './app-health-application-view.aggregate';
import { AppHealthApplicationViewId } from './value-objects';

export abstract class AppHealthIApplicationViewRepository implements IRepository<AppHealthApplicationView>
{
    abstract readonly repository: any;

    // paginate records
    abstract paginate(
        options?: {
            queryStatement?: QueryStatement;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        }
    ): Promise<Pagination<AppHealthApplicationView>>;

    // find a single record
    abstract find(
        options?: {
            queryStatement?: QueryStatement;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        }
    ): Promise<AppHealthApplicationView | null>;

    // find a single record by id
    abstract findById(
        id: AppHealthApplicationViewId,
        options?: {
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        }
    ): Promise<AppHealthApplicationView | null>;

    // get multiple records
    abstract get(
        options?: {
            queryStatement?: QueryStatement;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        }
    ): Promise<AppHealthApplicationView[]>;

    // get records with rawSQL
    abstract rawSQL(
        options?: {
            rawSQL?: string;
            cQMetadata?: CQMetadata;
        }
    ): Promise<AppHealthApplicationView[]>;

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
        applicationView: AppHealthApplicationView,
        options?: {
            createOptions?: LiteralObject;
            dataFactory?: (aggregate: AppHealthApplicationView) => LiteralObject;
            // arguments to find object and check if object is duplicated
            finderQueryStatement?: (aggregate: AppHealthApplicationView) => QueryStatement;
        }
    ): Promise<void>;

    // create a single or multiple records
    abstract insert(
        applicationViews: AppHealthApplicationView[],
        options?: {
            insertOptions?: LiteralObject;
            dataFactory?: (aggregate: AppHealthApplicationView) => LiteralObject;
        }
    ): Promise<void>;

    // update record by id
    abstract updateById(
        applicationView: AppHealthApplicationView,
        options?: {
            updateByIdOptions?: LiteralObject;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
            dataFactory?: (aggregate: AppHealthApplicationView) => LiteralObject;
            // arguments to find object to update, with i18n we use langId and id relationship with parent entity
            findArguments?: LiteralObject;
        }
    ): Promise<void>;

    // update records
    abstract update(
        applicationView: AppHealthApplicationView,
        options?: {
            updateOptions?: LiteralObject;
            queryStatement?: QueryStatement;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
            dataFactory?: (aggregate: AppHealthApplicationView) => LiteralObject;
        }
    ): Promise<void>;

    // insert or update key identification element already existing in the table
    abstract upsert(
        applicationView: AppHealthApplicationView,
        options?: {
            upsertOptions?: LiteralObject;
            dataFactory?: (aggregate: AppHealthApplicationView) => LiteralObject;
        }
    ): Promise<void>;

    // delete record
    abstract deleteById(
        id: AppHealthApplicationViewId,
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
