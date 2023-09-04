import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AppHealthDeleteApplicationAuthenticationsCommand } from './app-health-delete-application-authentications.command';
import { AppHealthDeleteApplicationAuthenticationsService } from './app-health-delete-application-authentications.service';

@CommandHandler(AppHealthDeleteApplicationAuthenticationsCommand)
export class AppHealthDeleteApplicationAuthenticationsCommandHandler implements ICommandHandler<AppHealthDeleteApplicationAuthenticationsCommand>
{
    constructor(
        private readonly deleteApplicationAuthenticationsService: AppHealthDeleteApplicationAuthenticationsService,
    ) {}

    async execute(command: AppHealthDeleteApplicationAuthenticationsCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deleteApplicationAuthenticationsService.main(
            command.queryStatement,
            command.constraint,
            command.cQMetadata,
        );
    }
}
