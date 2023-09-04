/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AppHealthUpdateTechnicalSolutionByIdCommand } from './app-health-update-technical-solution-by-id.command';
import { AppHealthUpdateTechnicalSolutionByIdService } from './app-health-update-technical-solution-by-id.service';
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

@CommandHandler(AppHealthUpdateTechnicalSolutionByIdCommand)
export class AppHealthUpdateTechnicalSolutionByIdCommandHandler implements ICommandHandler<AppHealthUpdateTechnicalSolutionByIdCommand>
{
    constructor(
        private readonly updateTechnicalSolutionByIdService: AppHealthUpdateTechnicalSolutionByIdService,
    ) {}

    async execute(command: AppHealthUpdateTechnicalSolutionByIdCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateTechnicalSolutionByIdService.main(
            {
                id: new AppHealthTechnicalSolutionId(command.payload.id),
                customerId: new AppHealthTechnicalSolutionCustomerId(command.payload.customerId, { undefinable: true }),
                name: new AppHealthTechnicalSolutionName(command.payload.name, { undefinable: true }),
                description: new AppHealthTechnicalSolutionDescription(command.payload.description),
                architectureDiagram: new AppHealthTechnicalSolutionArchitectureDiagram(command.payload.architectureDiagram),
                proposal: new AppHealthTechnicalSolutionProposal(command.payload.proposal),
            },
            command.constraint,
            command.cQMetadata,
        );
    }
}
