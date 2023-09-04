import { IMapper, LiteralObject, MapperOptions, CQMetadata } from '@aurorajs.dev/core';
import { AppHealthApplicationIntegration } from './app-health-application-integration.aggregate';
import { AppHealthApplicationIntegrationResponse } from './app-health-application-integration.response';
import {
    AppHealthApplicationIntegrationId,
    AppHealthApplicationIntegrationName,
    AppHealthApplicationIntegrationDescription,
    AppHealthApplicationIntegrationSourceApplicationId,
    AppHealthApplicationIntegrationTargetApplicationId,
    AppHealthApplicationIntegrationApiInterfaceTypeId,
    AppHealthApplicationIntegrationInterfaceNumbers,
    AppHealthApplicationIntegrationModality,
    AppHealthApplicationIntegrationScore,
    AppHealthApplicationIntegrationDocumentations,
    AppHealthApplicationIntegrationCreatedAt,
    AppHealthApplicationIntegrationUpdatedAt,
    AppHealthApplicationIntegrationDeletedAt,
} from './value-objects';
import { AppHealthApplicationMapper } from '@app/app-health/application';
import { AppHealthApiInterfaceTypeMapper } from '@app/app-health/api-interface-type';

export class AppHealthApplicationIntegrationMapper implements IMapper
{
    constructor(
        public options: MapperOptions = { eagerLoading: true },
    ) {}

    /**
     * Map object to aggregate
     * @param applicationIntegration
     */
    mapModelToAggregate(applicationIntegration: LiteralObject, cQMetadata?: CQMetadata): AppHealthApplicationIntegration
    {
        if (!applicationIntegration) return;

        return this.makeAggregate(applicationIntegration, cQMetadata);
    }

    /**
     * Map array of objects to array aggregates
     * @param applicationIntegrations
     */
    mapModelsToAggregates(applicationIntegrations: LiteralObject[], cQMetadata?: CQMetadata): AppHealthApplicationIntegration[]
    {
        if (!Array.isArray(applicationIntegrations)) return;

        return applicationIntegrations.map(applicationIntegration => this.makeAggregate(applicationIntegration, cQMetadata));
    }

    /**
     * Map aggregate to response
     * @param applicationIntegration
     */
    mapAggregateToResponse(applicationIntegration: AppHealthApplicationIntegration): AppHealthApplicationIntegrationResponse
    {
        return this.makeResponse(applicationIntegration);
    }

    /**
     * Map array of aggregates to array responses
     * @param applicationIntegrations
     */
    mapAggregatesToResponses(applicationIntegrations: AppHealthApplicationIntegration[]): AppHealthApplicationIntegrationResponse[]
    {
        if (!Array.isArray(applicationIntegrations)) return;

        return applicationIntegrations.map(applicationIntegration => this.makeResponse(applicationIntegration));
    }

    private makeAggregate(applicationIntegration: LiteralObject, cQMetadata?: CQMetadata): AppHealthApplicationIntegration
    {
        return AppHealthApplicationIntegration.register(
            new AppHealthApplicationIntegrationId(applicationIntegration.id, { undefinable: true }),
            new AppHealthApplicationIntegrationName(applicationIntegration.name, { undefinable: true }),
            new AppHealthApplicationIntegrationDescription(applicationIntegration.description, { undefinable: true }),
            new AppHealthApplicationIntegrationSourceApplicationId(applicationIntegration.sourceApplicationId, { undefinable: true }),
            new AppHealthApplicationIntegrationTargetApplicationId(applicationIntegration.targetApplicationId, { undefinable: true }),
            new AppHealthApplicationIntegrationApiInterfaceTypeId(applicationIntegration.apiInterfaceTypeId, { undefinable: true }),
            new AppHealthApplicationIntegrationInterfaceNumbers(applicationIntegration.interfaceNumbers, { undefinable: true }),
            new AppHealthApplicationIntegrationModality(applicationIntegration.modality, { undefinable: true }),
            new AppHealthApplicationIntegrationScore(applicationIntegration.score, { undefinable: true }),
            new AppHealthApplicationIntegrationDocumentations(applicationIntegration.documentations, { undefinable: true }),
            new AppHealthApplicationIntegrationCreatedAt(applicationIntegration.createdAt, { undefinable: true }, { addTimezone: cQMetadata?.timezone }),
            new AppHealthApplicationIntegrationUpdatedAt(applicationIntegration.updatedAt, { undefinable: true }, { addTimezone: cQMetadata?.timezone }),
            new AppHealthApplicationIntegrationDeletedAt(applicationIntegration.deletedAt, { undefinable: true }, { addTimezone: cQMetadata?.timezone }),
            this.options.eagerLoading ? new AppHealthApplicationMapper({ eagerLoading: true }).mapModelToAggregate(applicationIntegration.sourceApplication, cQMetadata) : undefined,
            this.options.eagerLoading ? new AppHealthApplicationMapper({ eagerLoading: true }).mapModelToAggregate(applicationIntegration.targetApplication, cQMetadata) : undefined,
            this.options.eagerLoading ? new AppHealthApiInterfaceTypeMapper({ eagerLoading: true }).mapModelToAggregate(applicationIntegration.apiInterfaceType, cQMetadata) : undefined,
        );
    }

    private makeResponse(applicationIntegration: AppHealthApplicationIntegration): AppHealthApplicationIntegrationResponse
    {
        if (!applicationIntegration) return;

        return new AppHealthApplicationIntegrationResponse(
            applicationIntegration.id.value,
            applicationIntegration.name.value,
            applicationIntegration.description.value,
            applicationIntegration.sourceApplicationId.value,
            applicationIntegration.targetApplicationId.value,
            applicationIntegration.apiInterfaceTypeId.value,
            applicationIntegration.interfaceNumbers.value,
            applicationIntegration.modality.value,
            applicationIntegration.score.value,
            applicationIntegration.documentations.value,
            applicationIntegration.createdAt.value,
            applicationIntegration.updatedAt.value,
            applicationIntegration.deletedAt.value,
            this.options.eagerLoading ? new AppHealthApplicationMapper({ eagerLoading: true }).mapAggregateToResponse(applicationIntegration.sourceApplication) : undefined,
            this.options.eagerLoading ? new AppHealthApplicationMapper({ eagerLoading: true }).mapAggregateToResponse(applicationIntegration.targetApplication) : undefined,
            this.options.eagerLoading ? new AppHealthApiInterfaceTypeMapper({ eagerLoading: true }).mapAggregateToResponse(applicationIntegration.apiInterfaceType) : undefined,
        );
    }
}
