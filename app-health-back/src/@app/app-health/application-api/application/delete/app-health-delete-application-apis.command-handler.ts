import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AppHealthDeleteApplicationApisCommand } from './app-health-delete-application-apis.command';
import { AppHealthDeleteApplicationApisService } from './app-health-delete-application-apis.service';

@CommandHandler(AppHealthDeleteApplicationApisCommand)
export class AppHealthDeleteApplicationApisCommandHandler implements ICommandHandler<AppHealthDeleteApplicationApisCommand>
{
    constructor(
        private readonly deleteApplicationApisService: AppHealthDeleteApplicationApisService,
    ) {}

    async execute(command: AppHealthDeleteApplicationApisCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deleteApplicationApisService.main(
            command.queryStatement,
            command.constraint,
            command.cQMetadata,
        );
    }
}
