import { IMapper, LiteralObject, MapperOptions, CQMetadata } from '@aurorajs.dev/core';
import { AppHealthApplicationLanguage } from './app-health-application-language.aggregate';
import { AppHealthApplicationLanguageResponse } from './app-health-application-language.response';
import {
    AppHealthApplicationLanguageId,
    AppHealthApplicationLanguageApplicationId,
    AppHealthApplicationLanguageLanguageId,
    AppHealthApplicationLanguageVersion,
    AppHealthApplicationLanguageScore,
    AppHealthApplicationLanguageCodeQualityScore,
    AppHealthApplicationLanguageCreatedAt,
    AppHealthApplicationLanguageUpdatedAt,
    AppHealthApplicationLanguageDeletedAt,
} from './value-objects';
import { AppHealthApplicationMapper } from '@app/app-health/application';
import { AppHealthLanguageMapper } from '@app/app-health/language';

export class AppHealthApplicationLanguageMapper implements IMapper
{
    constructor(
        public options: MapperOptions = { eagerLoading: true },
    ) {}

    /**
     * Map object to aggregate
     * @param applicationLanguage
     */
    mapModelToAggregate(applicationLanguage: LiteralObject, cQMetadata?: CQMetadata): AppHealthApplicationLanguage
    {
        if (!applicationLanguage) return;

        return this.makeAggregate(applicationLanguage, cQMetadata);
    }

    /**
     * Map array of objects to array aggregates
     * @param applicationLanguages
     */
    mapModelsToAggregates(applicationLanguages: LiteralObject[], cQMetadata?: CQMetadata): AppHealthApplicationLanguage[]
    {
        if (!Array.isArray(applicationLanguages)) return;

        return applicationLanguages.map(applicationLanguage => this.makeAggregate(applicationLanguage, cQMetadata));
    }

    /**
     * Map aggregate to response
     * @param applicationLanguage
     */
    mapAggregateToResponse(applicationLanguage: AppHealthApplicationLanguage): AppHealthApplicationLanguageResponse
    {
        return this.makeResponse(applicationLanguage);
    }

    /**
     * Map array of aggregates to array responses
     * @param applicationLanguages
     */
    mapAggregatesToResponses(applicationLanguages: AppHealthApplicationLanguage[]): AppHealthApplicationLanguageResponse[]
    {
        if (!Array.isArray(applicationLanguages)) return;

        return applicationLanguages.map(applicationLanguage => this.makeResponse(applicationLanguage));
    }

    private makeAggregate(applicationLanguage: LiteralObject, cQMetadata?: CQMetadata): AppHealthApplicationLanguage
    {
        return AppHealthApplicationLanguage.register(
            new AppHealthApplicationLanguageId(applicationLanguage.id, { undefinable: true }),
            new AppHealthApplicationLanguageApplicationId(applicationLanguage.applicationId, { undefinable: true }),
            new AppHealthApplicationLanguageLanguageId(applicationLanguage.languageId, { undefinable: true }),
            new AppHealthApplicationLanguageVersion(applicationLanguage.version, { undefinable: true }),
            new AppHealthApplicationLanguageScore(applicationLanguage.score, { undefinable: true }),
            new AppHealthApplicationLanguageCodeQualityScore(applicationLanguage.codeQualityScore, { undefinable: true }),
            new AppHealthApplicationLanguageCreatedAt(applicationLanguage.createdAt, { undefinable: true }, { addTimezone: cQMetadata?.timezone }),
            new AppHealthApplicationLanguageUpdatedAt(applicationLanguage.updatedAt, { undefinable: true }, { addTimezone: cQMetadata?.timezone }),
            new AppHealthApplicationLanguageDeletedAt(applicationLanguage.deletedAt, { undefinable: true }, { addTimezone: cQMetadata?.timezone }),
            this.options.eagerLoading ? new AppHealthApplicationMapper({ eagerLoading: true }).mapModelToAggregate(applicationLanguage.application, cQMetadata) : undefined,
            this.options.eagerLoading ? new AppHealthLanguageMapper({ eagerLoading: true }).mapModelToAggregate(applicationLanguage.language, cQMetadata) : undefined,
        );
    }

    private makeResponse(applicationLanguage: AppHealthApplicationLanguage): AppHealthApplicationLanguageResponse
    {
        if (!applicationLanguage) return;

        return new AppHealthApplicationLanguageResponse(
            applicationLanguage.id.value,
            applicationLanguage.applicationId.value,
            applicationLanguage.languageId.value,
            applicationLanguage.version.value,
            applicationLanguage.score.value,
            applicationLanguage.codeQualityScore.value,
            applicationLanguage.createdAt.value,
            applicationLanguage.updatedAt.value,
            applicationLanguage.deletedAt.value,
            this.options.eagerLoading ? new AppHealthApplicationMapper({ eagerLoading: true }).mapAggregateToResponse(applicationLanguage.application) : undefined,
            this.options.eagerLoading ? new AppHealthLanguageMapper({ eagerLoading: true }).mapAggregateToResponse(applicationLanguage.language) : undefined,
        );
    }
}
