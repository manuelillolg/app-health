import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AppHealthDeleteApplicationIntegrationsCommand } from './app-health-delete-application-integrations.command';
import { AppHealthDeleteApplicationIntegrationsService } from './app-health-delete-application-integrations.service';

@CommandHandler(AppHealthDeleteApplicationIntegrationsCommand)
export class AppHealthDeleteApplicationIntegrationsCommandHandler implements ICommandHandler<AppHealthDeleteApplicationIntegrationsCommand>
{
    constructor(
        private readonly deleteApplicationIntegrationsService: AppHealthDeleteApplicationIntegrationsService,
    ) {}

    async execute(command: AppHealthDeleteApplicationIntegrationsCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deleteApplicationIntegrationsService.main(
            command.queryStatement,
            command.constraint,
            command.cQMetadata,
        );
    }
}
