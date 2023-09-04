import { IMapper, LiteralObject, MapperOptions, CQMetadata } from '@aurorajs.dev/core';
import { AppHealthLanguage } from './app-health-language.aggregate';
import { AppHealthLanguageResponse } from './app-health-language.response';
import {
    AppHealthLanguageId,
    AppHealthLanguageName,
    AppHealthLanguageVersions,
    AppHealthLanguageCreatedAt,
    AppHealthLanguageUpdatedAt,
    AppHealthLanguageDeletedAt,
} from './value-objects';

export class AppHealthLanguageMapper implements IMapper
{
    constructor(
        public options: MapperOptions = { eagerLoading: true },
    ) {}

    /**
     * Map object to aggregate
     * @param language
     */
    mapModelToAggregate(language: LiteralObject, cQMetadata?: CQMetadata): AppHealthLanguage
    {
        if (!language) return;

        return this.makeAggregate(language, cQMetadata);
    }

    /**
     * Map array of objects to array aggregates
     * @param languages
     */
    mapModelsToAggregates(languages: LiteralObject[], cQMetadata?: CQMetadata): AppHealthLanguage[]
    {
        if (!Array.isArray(languages)) return;

        return languages.map(language => this.makeAggregate(language, cQMetadata));
    }

    /**
     * Map aggregate to response
     * @param language
     */
    mapAggregateToResponse(language: AppHealthLanguage): AppHealthLanguageResponse
    {
        return this.makeResponse(language);
    }

    /**
     * Map array of aggregates to array responses
     * @param languages
     */
    mapAggregatesToResponses(languages: AppHealthLanguage[]): AppHealthLanguageResponse[]
    {
        if (!Array.isArray(languages)) return;

        return languages.map(language => this.makeResponse(language));
    }

    private makeAggregate(language: LiteralObject, cQMetadata?: CQMetadata): AppHealthLanguage
    {
        return AppHealthLanguage.register(
            new AppHealthLanguageId(language.id, { undefinable: true }),
            new AppHealthLanguageName(language.name, { undefinable: true }),
            new AppHealthLanguageVersions(language.versions, { undefinable: true }),
            new AppHealthLanguageCreatedAt(language.createdAt, { undefinable: true }, { addTimezone: cQMetadata?.timezone }),
            new AppHealthLanguageUpdatedAt(language.updatedAt, { undefinable: true }, { addTimezone: cQMetadata?.timezone }),
            new AppHealthLanguageDeletedAt(language.deletedAt, { undefinable: true }, { addTimezone: cQMetadata?.timezone }),
        );
    }

    private makeResponse(language: AppHealthLanguage): AppHealthLanguageResponse
    {
        if (!language) return;

        return new AppHealthLanguageResponse(
            language.id.value,
            language.name.value,
            language.versions.value,
            language.createdAt.value,
            language.updatedAt.value,
            language.deletedAt.value,
        );
    }
}
