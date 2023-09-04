import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AppHealthDeleteApplicationsCommand } from './app-health-delete-applications.command';
import { AppHealthDeleteApplicationsService } from './app-health-delete-applications.service';

@CommandHandler(AppHealthDeleteApplicationsCommand)
export class AppHealthDeleteApplicationsCommandHandler implements ICommandHandler<AppHealthDeleteApplicationsCommand>
{
    constructor(
        private readonly deleteApplicationsService: AppHealthDeleteApplicationsService,
    ) {}

    async execute(command: AppHealthDeleteApplicationsCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deleteApplicationsService.main(
            command.queryStatement,
            command.constraint,
            command.cQMetadata,
        );
    }
}
