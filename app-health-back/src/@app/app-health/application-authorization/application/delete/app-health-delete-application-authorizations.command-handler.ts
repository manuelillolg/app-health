import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AppHealthDeleteApplicationAuthorizationsCommand } from './app-health-delete-application-authorizations.command';
import { AppHealthDeleteApplicationAuthorizationsService } from './app-health-delete-application-authorizations.service';

@CommandHandler(AppHealthDeleteApplicationAuthorizationsCommand)
export class AppHealthDeleteApplicationAuthorizationsCommandHandler implements ICommandHandler<AppHealthDeleteApplicationAuthorizationsCommand>
{
    constructor(
        private readonly deleteApplicationAuthorizationsService: AppHealthDeleteApplicationAuthorizationsService,
    ) {}

    async execute(command: AppHealthDeleteApplicationAuthorizationsCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deleteApplicationAuthorizationsService.main(
            command.queryStatement,
            command.constraint,
            command.cQMetadata,
        );
    }
}
