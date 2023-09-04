import { Injectable } from '@nestjs/common';
import { MockRepository, Utils } from '@aurorajs.dev/core';
import { AppHealthITechnicalSolutionRepository } from '@app/app-health/technical-solution/domain/app-health-technical-solution.repository';
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
} from '@app/app-health/technical-solution/domain/value-objects';
import { AppHealthTechnicalSolution } from '../../domain/app-health-technical-solution.aggregate';
import { appHealthMockTechnicalSolutionData } from './app-health-mock-technical-solution.data';

@Injectable()
export class AppHealthMockTechnicalSolutionRepository extends MockRepository<AppHealthTechnicalSolution> implements AppHealthITechnicalSolutionRepository
{
    public readonly repository: any;
    public readonly aggregateName: string = 'AppHealthTechnicalSolution';
    public collectionSource: AppHealthTechnicalSolution[];
    public deletedAtInstance: AppHealthTechnicalSolutionDeletedAt = new AppHealthTechnicalSolutionDeletedAt(null);

    constructor()
    {
        super();
        this.createSourceMockData();
    }

    public reset(): void
    {
        this.createSourceMockData();
    }

    private createSourceMockData(): void
    {
        this.collectionSource = [];
        const now = Utils.nowTimestamp();

        for (const itemCollection of <any[]>appHealthMockTechnicalSolutionData)
        {
            itemCollection['createdAt'] = now;
            itemCollection['updatedAt'] = now;
            itemCollection['deletedAt'] = null;

            this.collectionSource.push(AppHealthTechnicalSolution.register(
                new AppHealthTechnicalSolutionId(itemCollection.id),
                new AppHealthTechnicalSolutionCustomerId(itemCollection.customerId),
                new AppHealthTechnicalSolutionName(itemCollection.name),
                new AppHealthTechnicalSolutionDescription(itemCollection.description),
                new AppHealthTechnicalSolutionArchitectureDiagram(itemCollection.architectureDiagram),
                new AppHealthTechnicalSolutionProposal(itemCollection.proposal),
                new AppHealthTechnicalSolutionCreatedAt(itemCollection.createdAt),
                new AppHealthTechnicalSolutionUpdatedAt(itemCollection.updatedAt),
                new AppHealthTechnicalSolutionDeletedAt(itemCollection.deletedAt),
            ));
        }
    }
}
