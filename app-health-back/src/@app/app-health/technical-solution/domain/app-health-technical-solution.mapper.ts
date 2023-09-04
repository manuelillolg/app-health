import { IMapper, LiteralObject, MapperOptions, CQMetadata } from '@aurorajs.dev/core';
import { AppHealthTechnicalSolution } from './app-health-technical-solution.aggregate';
import { AppHealthTechnicalSolutionResponse } from './app-health-technical-solution.response';
import {
    AppHealthTechnicalSolutionId,
    AppHealthTechnicalSolutionCustomerId,
    AppHealthTechnicalSolutionName,
    AppHealthTechnicalSolutionDescription,
    AppHealthTechnicalSolutionArchitectureDiagram,
    AppHealthTechnicalSolutionProposal,
    AppHealthTechnicalSolutionCreatedAt,
    AppHealthTechnicalSolutionUpdatedAt,
    AppHealthTechnicalSolutionDeletedAt,
} from './value-objects';
import { AppHealthCustomerMapper } from '@app/app-health/customer';

export class AppHealthTechnicalSolutionMapper implements IMapper
{
    constructor(
        public options: MapperOptions = { eagerLoading: true },
    ) {}

    /**
     * Map object to aggregate
     * @param technicalSolution
     */
    mapModelToAggregate(technicalSolution: LiteralObject, cQMetadata?: CQMetadata): AppHealthTechnicalSolution
    {
        if (!technicalSolution) return;

        return this.makeAggregate(technicalSolution, cQMetadata);
    }

    /**
     * Map array of objects to array aggregates
     * @param technicalSolutions
     */
    mapModelsToAggregates(technicalSolutions: LiteralObject[], cQMetadata?: CQMetadata): AppHealthTechnicalSolution[]
    {
        if (!Array.isArray(technicalSolutions)) return;

        return technicalSolutions.map(technicalSolution => this.makeAggregate(technicalSolution, cQMetadata));
    }

    /**
     * Map aggregate to response
     * @param technicalSolution
     */
    mapAggregateToResponse(technicalSolution: AppHealthTechnicalSolution): AppHealthTechnicalSolutionResponse
    {
        return this.makeResponse(technicalSolution);
    }

    /**
     * Map array of aggregates to array responses
     * @param technicalSolutions
     */
    mapAggregatesToResponses(technicalSolutions: AppHealthTechnicalSolution[]): AppHealthTechnicalSolutionResponse[]
    {
        if (!Array.isArray(technicalSolutions)) return;

        return technicalSolutions.map(technicalSolution => this.makeResponse(technicalSolution));
    }

    private makeAggregate(technicalSolution: LiteralObject, cQMetadata?: CQMetadata): AppHealthTechnicalSolution
    {
        return AppHealthTechnicalSolution.register(
            new AppHealthTechnicalSolutionId(technicalSolution.id, { undefinable: true }),
            new AppHealthTechnicalSolutionCustomerId(technicalSolution.customerId, { undefinable: true }),
            new AppHealthTechnicalSolutionName(technicalSolution.name, { undefinable: true }),
            new AppHealthTechnicalSolutionDescription(technicalSolution.description, { undefinable: true }),
            new AppHealthTechnicalSolutionArchitectureDiagram(technicalSolution.architectureDiagram, { undefinable: true }),
            new AppHealthTechnicalSolutionProposal(technicalSolution.proposal, { undefinable: true }),
            new AppHealthTechnicalSolutionCreatedAt(technicalSolution.createdAt, { undefinable: true }, { addTimezone: cQMetadata?.timezone }),
            new AppHealthTechnicalSolutionUpdatedAt(technicalSolution.updatedAt, { undefinable: true }, { addTimezone: cQMetadata?.timezone }),
            new AppHealthTechnicalSolutionDeletedAt(technicalSolution.deletedAt, { undefinable: true }, { addTimezone: cQMetadata?.timezone }),
            this.options.eagerLoading ? new AppHealthCustomerMapper({ eagerLoading: true }).mapModelToAggregate(technicalSolution.customer, cQMetadata) : undefined,
        );
    }

    private makeResponse(technicalSolution: AppHealthTechnicalSolution): AppHealthTechnicalSolutionResponse
    {
        if (!technicalSolution) return;

        return new AppHealthTechnicalSolutionResponse(
            technicalSolution.id.value,
            technicalSolution.customerId.value,
            technicalSolution.name.value,
            technicalSolution.description.value,
            technicalSolution.architectureDiagram.value,
            technicalSolution.proposal.value,
            technicalSolution.createdAt.value,
            technicalSolution.updatedAt.value,
            technicalSolution.deletedAt.value,
            this.options.eagerLoading ? new AppHealthCustomerMapper({ eagerLoading: true }).mapAggregateToResponse(technicalSolution.customer) : undefined,
        );
    }
}
