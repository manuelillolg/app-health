/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AppHealthUpdateLanguagesCommand } from './app-health-update-languages.command';
import { AppHealthUpdateLanguagesService } from './app-health-update-languages.service';
import {
    AppHealthLanguageId,
    AppHealthLanguageName,
    AppHealthLanguageVersions,
    AppHealthLanguageCreatedAt,
    AppHealthLanguageUpdatedAt,
    AppHealthLanguageDeletedAt,
} from '../../domain/value-objects';

@CommandHandler(AppHealthUpdateLanguagesCommand)
export class AppHealthUpdateLanguagesCommandHandler implements ICommandHandler<AppHealthUpdateLanguagesCommand>
{
    constructor(
        private readonly updateLanguagesService: AppHealthUpdateLanguagesService,
    ) {}

    async execute(command: AppHealthUpdateLanguagesCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateLanguagesService.main(
            {
                id: new AppHealthLanguageId(command.payload.id, { undefinable: true }),
                name: new AppHealthLanguageName(command.payload.name, { undefinable: true }),
                versions: new AppHealthLanguageVersions(command.payload.versions, { undefinable: true }),
            },
            command.queryStatement,
            command.constraint,
            command.cQMetadata,
        );
    }
}
