import { CQMetadata, IRepository, LiteralObject, Pagination, QueryStatement } from '@aurorajs.dev/core';
import { AppHealthApplicationLanguage } from './app-health-application-language.aggregate';
import { AppHealthApplicationLanguageId } from './value-objects';

export abstract class AppHealthIApplicationLanguageRepository implements IRepository<AppHealthApplicationLanguage>
{
    abstract readonly repository: any;

    // paginate records
    abstract paginate(
        options?: {
            queryStatement?: QueryStatement;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        }
    ): Promise<Pagination<AppHealthApplicationLanguage>>;

    // find a single record
    abstract find(
        options?: {
            queryStatement?: QueryStatement;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        }
    ): Promise<AppHealthApplicationLanguage | null>;

    // find a single record by id
    abstract findById(
        id: AppHealthApplicationLanguageId,
        options?: {
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        }
    ): Promise<AppHealthApplicationLanguage | null>;

    // get multiple records
    abstract get(
        options?: {
            queryStatement?: QueryStatement;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        }
    ): Promise<AppHealthApplicationLanguage[]>;

    // get records with rawSQL
    abstract rawSQL(
        options?: {
            rawSQL?: string;
            cQMetadata?: CQMetadata;
        }
    ): Promise<AppHealthApplicationLanguage[]>;

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
        applicationLanguage: AppHealthApplicationLanguage,
        options?: {
            createOptions?: LiteralObject;
            dataFactory?: (aggregate: AppHealthApplicationLanguage) => LiteralObject;
            // arguments to find object and check if object is duplicated
            finderQueryStatement?: (aggregate: AppHealthApplicationLanguage) => QueryStatement;
        }
    ): Promise<void>;

    // create a single or multiple records
    abstract insert(
        applicationLanguages: AppHealthApplicationLanguage[],
        options?: {
            insertOptions?: LiteralObject;
            dataFactory?: (aggregate: AppHealthApplicationLanguage) => LiteralObject;
        }
    ): Promise<void>;

    // update record by id
    abstract updateById(
        applicationLanguage: AppHealthApplicationLanguage,
        options?: {
            updateByIdOptions?: LiteralObject;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
            dataFactory?: (aggregate: AppHealthApplicationLanguage) => LiteralObject;
            // arguments to find object to update, with i18n we use langId and id relationship with parent entity
            findArguments?: LiteralObject;
        }
    ): Promise<void>;

    // update records
    abstract update(
        applicationLanguage: AppHealthApplicationLanguage,
        options?: {
            updateOptions?: LiteralObject;
            queryStatement?: QueryStatement;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
            dataFactory?: (aggregate: AppHealthApplicationLanguage) => LiteralObject;
        }
    ): Promise<void>;

    // insert or update key identification element already existing in the table
    abstract upsert(
        applicationLanguage: AppHealthApplicationLanguage,
        options?: {
            upsertOptions?: LiteralObject;
            dataFactory?: (aggregate: AppHealthApplicationLanguage) => LiteralObject;
        }
    ): Promise<void>;

    // delete record
    abstract deleteById(
        id: AppHealthApplicationLanguageId,
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
