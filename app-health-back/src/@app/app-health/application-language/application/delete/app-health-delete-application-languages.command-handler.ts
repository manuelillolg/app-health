import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AppHealthDeleteApplicationLanguagesCommand } from './app-health-delete-application-languages.command';
import { AppHealthDeleteApplicationLanguagesService } from './app-health-delete-application-languages.service';

@CommandHandler(AppHealthDeleteApplicationLanguagesCommand)
export class AppHealthDeleteApplicationLanguagesCommandHandler implements ICommandHandler<AppHealthDeleteApplicationLanguagesCommand>
{
    constructor(
        private readonly deleteApplicationLanguagesService: AppHealthDeleteApplicationLanguagesService,
    ) {}

    async execute(command: AppHealthDeleteApplicationLanguagesCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deleteApplicationLanguagesService.main(
            command.queryStatement,
            command.constraint,
            command.cQMetadata,
        );
    }
}
