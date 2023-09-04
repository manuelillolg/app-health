import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AppHealthDeleteApplicationViewsCommand } from './app-health-delete-application-views.command';
import { AppHealthDeleteApplicationViewsService } from './app-health-delete-application-views.service';

@CommandHandler(AppHealthDeleteApplicationViewsCommand)
export class AppHealthDeleteApplicationViewsCommandHandler implements ICommandHandler<AppHealthDeleteApplicationViewsCommand>
{
    constructor(
        private readonly deleteApplicationViewsService: AppHealthDeleteApplicationViewsService,
    ) {}

    async execute(command: AppHealthDeleteApplicationViewsCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deleteApplicationViewsService.main(
            command.queryStatement,
            command.constraint,
            command.cQMetadata,
        );
    }
}
