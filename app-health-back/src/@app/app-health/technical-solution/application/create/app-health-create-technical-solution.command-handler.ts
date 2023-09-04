/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AppHealthCreateTechnicalSolutionCommand } from './app-health-create-technical-solution.command';
import { AppHealthCreateTechnicalSolutionService } from './app-health-create-technical-solution.service';
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

@CommandHandler(AppHealthCreateTechnicalSolutionCommand)
export class AppHealthCreateTechnicalSolutionCommandHandler implements ICommandHandler<AppHealthCreateTechnicalSolutionCommand>
{
    constructor(
        private readonly createTechnicalSolutionService: AppHealthCreateTechnicalSolutionService,
    ) {}

    async execute(command: AppHealthCreateTechnicalSolutionCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createTechnicalSolutionService.main(
            {
                id: new AppHealthTechnicalSolutionId(command.payload.id),
                customerId: new AppHealthTechnicalSolutionCustomerId(command.payload.customerId),
                name: new AppHealthTechnicalSolutionName(command.payload.name),
                description: new AppHealthTechnicalSolutionDescription(command.payload.description),
                architectureDiagram: new AppHealthTechnicalSolutionArchitectureDiagram(command.payload.architectureDiagram),
                proposal: new AppHealthTechnicalSolutionProposal(command.payload.proposal),
            },
            command.cQMetadata,
        );
    }
}
