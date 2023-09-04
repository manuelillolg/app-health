/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AppHealthUpdateTechnicalSolutionsCommand } from './app-health-update-technical-solutions.command';
import { AppHealthUpdateTechnicalSolutionsService } from './app-health-update-technical-solutions.service';
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

@CommandHandler(AppHealthUpdateTechnicalSolutionsCommand)
export class AppHealthUpdateTechnicalSolutionsCommandHandler implements ICommandHandler<AppHealthUpdateTechnicalSolutionsCommand>
{
    constructor(
        private readonly updateTechnicalSolutionsService: AppHealthUpdateTechnicalSolutionsService,
    ) {}

    async execute(command: AppHealthUpdateTechnicalSolutionsCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateTechnicalSolutionsService.main(
            {
                id: new AppHealthTechnicalSolutionId(command.payload.id, { undefinable: true }),
                customerId: new AppHealthTechnicalSolutionCustomerId(command.payload.customerId, { undefinable: true }),
                name: new AppHealthTechnicalSolutionName(command.payload.name, { undefinable: true }),
                description: new AppHealthTechnicalSolutionDescription(command.payload.description),
                architectureDiagram: new AppHealthTechnicalSolutionArchitectureDiagram(command.payload.architectureDiagram),
                proposal: new AppHealthTechnicalSolutionProposal(command.payload.proposal),
            },
            command.queryStatement,
            command.constraint,
            command.cQMetadata,
        );
    }
}
