/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AppHealthUpsertTechnicalSolutionCommand } from './app-health-upsert-technical-solution.command';
import { AppHealthUpsertTechnicalSolutionService } from './app-health-upsert-technical-solution.service';
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

@CommandHandler(AppHealthUpsertTechnicalSolutionCommand)
export class AppHealthUpsertTechnicalSolutionCommandHandler implements ICommandHandler<AppHealthUpsertTechnicalSolutionCommand>
{
    constructor(
        private readonly upsertTechnicalSolutionService: AppHealthUpsertTechnicalSolutionService,
    ) {}

    async execute(command: AppHealthUpsertTechnicalSolutionCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.upsertTechnicalSolutionService.main(
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
