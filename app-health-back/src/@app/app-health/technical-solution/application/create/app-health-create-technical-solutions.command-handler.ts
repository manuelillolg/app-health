/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AppHealthCreateTechnicalSolutionsCommand } from './app-health-create-technical-solutions.command';
import { AppHealthCreateTechnicalSolutionsService } from './app-health-create-technical-solutions.service';
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

@CommandHandler(AppHealthCreateTechnicalSolutionsCommand)
export class AppHealthCreateTechnicalSolutionsCommandHandler implements ICommandHandler<AppHealthCreateTechnicalSolutionsCommand>
{
    constructor(
        private readonly createTechnicalSolutionsService: AppHealthCreateTechnicalSolutionsService,
    ) {}

    async execute(command: AppHealthCreateTechnicalSolutionsCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createTechnicalSolutionsService.main(
            command.payload
                .map(technicalSolution =>
                {
                    return {
                        id: new AppHealthTechnicalSolutionId(technicalSolution.id),
                        customerId: new AppHealthTechnicalSolutionCustomerId(technicalSolution.customerId),
                        name: new AppHealthTechnicalSolutionName(technicalSolution.name),
                        description: new AppHealthTechnicalSolutionDescription(technicalSolution.description),
                        architectureDiagram: new AppHealthTechnicalSolutionArchitectureDiagram(technicalSolution.architectureDiagram),
                        proposal: new AppHealthTechnicalSolutionProposal(technicalSolution.proposal),
                    };
                }),
            command.cQMetadata,
        );
    }
}
