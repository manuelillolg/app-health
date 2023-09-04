/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AppHealthUpdateLanguageByIdCommand } from './app-health-update-language-by-id.command';
import { AppHealthUpdateLanguageByIdService } from './app-health-update-language-by-id.service';
import {
    AppHealthLanguageId,
    AppHealthLanguageName,
    AppHealthLanguageVersions,
    AppHealthLanguageCreatedAt,
    AppHealthLanguageUpdatedAt,
    AppHealthLanguageDeletedAt,
} from '../../domain/value-objects';

@CommandHandler(AppHealthUpdateLanguageByIdCommand)
export class AppHealthUpdateLanguageByIdCommandHandler implements ICommandHandler<AppHealthUpdateLanguageByIdCommand>
{
    constructor(
        private readonly updateLanguageByIdService: AppHealthUpdateLanguageByIdService,
    ) {}

    async execute(command: AppHealthUpdateLanguageByIdCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateLanguageByIdService.main(
            {
                id: new AppHealthLanguageId(command.payload.id),
                name: new AppHealthLanguageName(command.payload.name, { undefinable: true }),
                versions: new AppHealthLanguageVersions(command.payload.versions, { undefinable: true }),
            },
            command.constraint,
            command.cQMetadata,
        );
    }
}
