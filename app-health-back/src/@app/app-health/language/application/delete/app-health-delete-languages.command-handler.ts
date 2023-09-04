import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AppHealthDeleteLanguagesCommand } from './app-health-delete-languages.command';
import { AppHealthDeleteLanguagesService } from './app-health-delete-languages.service';

@CommandHandler(AppHealthDeleteLanguagesCommand)
export class AppHealthDeleteLanguagesCommandHandler implements ICommandHandler<AppHealthDeleteLanguagesCommand>
{
    constructor(
        private readonly deleteLanguagesService: AppHealthDeleteLanguagesService,
    ) {}

    async execute(command: AppHealthDeleteLanguagesCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deleteLanguagesService.main(
            command.queryStatement,
            command.constraint,
            command.cQMetadata,
        );
    }
}
