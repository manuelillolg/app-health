import { Injectable } from '@nestjs/common';
import { MockSeeder } from '@aurorajs.dev/core';
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
} from '../../domain/value-objects';
import { AppHealthTechnicalSolution } from '../../domain/app-health-technical-solution.aggregate';
import { appHealthMockTechnicalSolutionData } from './app-health-mock-technical-solution.data';
import * as _ from 'lodash';

@Injectable()
export class AppHealthMockTechnicalSolutionSeeder extends MockSeeder<AppHealthTechnicalSolution>
{
    public collectionSource: AppHealthTechnicalSolution[];

    constructor()
    {
        super();
        this._createMock();
    }

    private _createMock(): void
    {
        this.collectionSource = [];

        for (const technicalSolution of _.orderBy(appHealthMockTechnicalSolutionData, ['id']))
        {
            this.collectionSource.push(
                AppHealthTechnicalSolution.register(
                    new AppHealthTechnicalSolutionId(technicalSolution.id),
                    new AppHealthTechnicalSolutionCustomerId(technicalSolution.customerId),
                    new AppHealthTechnicalSolutionName(technicalSolution.name),
                    new AppHealthTechnicalSolutionDescription(technicalSolution.description),
                    new AppHealthTechnicalSolutionArchitectureDiagram(technicalSolution.architectureDiagram),
                    new AppHealthTechnicalSolutionProposal(technicalSolution.proposal),
                    new AppHealthTechnicalSolutionCreatedAt({ currentTimestamp: true }),
                    new AppHealthTechnicalSolutionUpdatedAt({ currentTimestamp: true }),
                    new AppHealthTechnicalSolutionDeletedAt(null),
                ),
            );
        }
    }
}
