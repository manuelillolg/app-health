import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AppHealthDeleteTechnicalSolutionsCommand } from './app-health-delete-technical-solutions.command';
import { AppHealthDeleteTechnicalSolutionsService } from './app-health-delete-technical-solutions.service';

@CommandHandler(AppHealthDeleteTechnicalSolutionsCommand)
export class AppHealthDeleteTechnicalSolutionsCommandHandler implements ICommandHandler<AppHealthDeleteTechnicalSolutionsCommand>
{
    constructor(
        private readonly deleteTechnicalSolutionsService: AppHealthDeleteTechnicalSolutionsService,
    ) {}

    async execute(command: AppHealthDeleteTechnicalSolutionsCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deleteTechnicalSolutionsService.main(
            command.queryStatement,
            command.constraint,
            command.cQMetadata,
        );
    }
}
