import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AppHealthDeleteTechnicalSolutionByIdCommand } from './app-health-delete-technical-solution-by-id.command';
import { AppHealthDeleteTechnicalSolutionByIdService } from './app-health-delete-technical-solution-by-id.service';
import {
    AppHealthTechnicalSolutionId
} from '../../domain/value-objects';

@CommandHandler(AppHealthDeleteTechnicalSolutionByIdCommand)
export class AppHealthDeleteTechnicalSolutionByIdCommandHandler implements ICommandHandler<AppHealthDeleteTechnicalSolutionByIdCommand>
{
    constructor(
        private readonly deleteTechnicalSolutionByIdService: AppHealthDeleteTechnicalSolutionByIdService,
    ) {}

    async execute(command: AppHealthDeleteTechnicalSolutionByIdCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deleteTechnicalSolutionByIdService.main(
            new AppHealthTechnicalSolutionId(command.id),
            command.constraint,
            command.cQMetadata,
        );
    }
}
