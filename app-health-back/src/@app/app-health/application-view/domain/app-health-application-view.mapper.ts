import { IMapper, LiteralObject, MapperOptions, CQMetadata } from '@aurorajs.dev/core';
import { AppHealthApplicationView } from './app-health-application-view.aggregate';
import { AppHealthApplicationViewResponse } from './app-health-application-view.response';
import {
    AppHealthApplicationViewId,
    AppHealthApplicationViewApplicationId,
    AppHealthApplicationViewTotalViews,
    AppHealthApplicationViewComplexity,
    AppHealthApplicationViewDescription,
    AppHealthApplicationViewScore,
    AppHealthApplicationViewCreatedAt,
    AppHealthApplicationViewUpdatedAt,
    AppHealthApplicationViewDeletedAt,
} from './value-objects';
import { AppHealthApplicationMapper } from '@app/app-health/application';

export class AppHealthApplicationViewMapper implements IMapper
{
    constructor(
        public options: MapperOptions = { eagerLoading: true },
    ) {}

    /**
     * Map object to aggregate
     * @param applicationView
     */
    mapModelToAggregate(applicationView: LiteralObject, cQMetadata?: CQMetadata): AppHealthApplicationView
    {
        if (!applicationView) return;

        return this.makeAggregate(applicationView, cQMetadata);
    }

    /**
     * Map array of objects to array aggregates
     * @param applicationViews
     */
    mapModelsToAggregates(applicationViews: LiteralObject[], cQMetadata?: CQMetadata): AppHealthApplicationView[]
    {
        if (!Array.isArray(applicationViews)) return;

        return applicationViews.map(applicationView => this.makeAggregate(applicationView, cQMetadata));
    }

    /**
     * Map aggregate to response
     * @param applicationView
     */
    mapAggregateToResponse(applicationView: AppHealthApplicationView): AppHealthApplicationViewResponse
    {
        return this.makeResponse(applicationView);
    }

    /**
     * Map array of aggregates to array responses
     * @param applicationViews
     */
    mapAggregatesToResponses(applicationViews: AppHealthApplicationView[]): AppHealthApplicationViewResponse[]
    {
        if (!Array.isArray(applicationViews)) return;

        return applicationViews.map(applicationView => this.makeResponse(applicationView));
    }

    private makeAggregate(applicationView: LiteralObject, cQMetadata?: CQMetadata): AppHealthApplicationView
    {
        return AppHealthApplicationView.register(
            new AppHealthApplicationViewId(applicationView.id, { undefinable: true }),
            new AppHealthApplicationViewApplicationId(applicationView.applicationId, { undefinable: true }),
            new AppHealthApplicationViewTotalViews(applicationView.totalViews, { undefinable: true }),
            new AppHealthApplicationViewComplexity(applicationView.complexity, { undefinable: true }),
            new AppHealthApplicationViewDescription(applicationView.description, { undefinable: true }),
            new AppHealthApplicationViewScore(applicationView.score, { undefinable: true }),
            new AppHealthApplicationViewCreatedAt(applicationView.createdAt, { undefinable: true }, { addTimezone: cQMetadata?.timezone }),
            new AppHealthApplicationViewUpdatedAt(applicationView.updatedAt, { undefinable: true }, { addTimezone: cQMetadata?.timezone }),
            new AppHealthApplicationViewDeletedAt(applicationView.deletedAt, { undefinable: true }, { addTimezone: cQMetadata?.timezone }),
            this.options.eagerLoading ? new AppHealthApplicationMapper({ eagerLoading: true }).mapModelToAggregate(applicationView.application, cQMetadata) : undefined,
        );
    }

    private makeResponse(applicationView: AppHealthApplicationView): AppHealthApplicationViewResponse
    {
        if (!applicationView) return;

        return new AppHealthApplicationViewResponse(
            applicationView.id.value,
            applicationView.applicationId.value,
            applicationView.totalViews.value,
            applicationView.complexity.value,
            applicationView.description.value,
            applicationView.score.value,
            applicationView.createdAt.value,
            applicationView.updatedAt.value,
            applicationView.deletedAt.value,
            this.options.eagerLoading ? new AppHealthApplicationMapper({ eagerLoading: true }).mapAggregateToResponse(applicationView.application) : undefined,
        );
    }
}
