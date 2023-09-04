/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AppHealthUpdateApplicationLanguageByIdCommand } from './app-health-update-application-language-by-id.command';
import { AppHealthUpdateApplicationLanguageByIdService } from './app-health-update-application-language-by-id.service';
import {
    AppHealthApplicationLanguageId,
    AppHealthApplicationLanguageApplicationId,
    AppHealthApplicationLanguageLanguageId,
    AppHealthApplicationLanguageVersion,
    AppHealthApplicationLanguageScore,
    AppHealthApplicationLanguageCodeQualityScore,
    AppHealthApplicationLanguageCreatedAt,
    AppHealthApplicationLanguageUpdatedAt,
    AppHealthApplicationLanguageDeletedAt,
} from '../../domain/value-objects';

@CommandHandler(AppHealthUpdateApplicationLanguageByIdCommand)
export class AppHealthUpdateApplicationLanguageByIdCommandHandler implements ICommandHandler<AppHealthUpdateApplicationLanguageByIdCommand>
{
    constructor(
        private readonly updateApplicationLanguageByIdService: AppHealthUpdateApplicationLanguageByIdService,
    ) {}

    async execute(command: AppHealthUpdateApplicationLanguageByIdCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateApplicationLanguageByIdService.main(
            {
                id: new AppHealthApplicationLanguageId(command.payload.id),
                applicationId: new AppHealthApplicationLanguageApplicationId(command.payload.applicationId, { undefinable: true }),
                languageId: new AppHealthApplicationLanguageLanguageId(command.payload.languageId, { undefinable: true }),
                version: new AppHealthApplicationLanguageVersion(command.payload.version, { undefinable: true }),
                score: new AppHealthApplicationLanguageScore(command.payload.score, { undefinable: true }),
                codeQualityScore: new AppHealthApplicationLanguageCodeQualityScore(command.payload.codeQualityScore, { undefinable: true }),
            },
            command.constraint,
            command.cQMetadata,
        );
    }
}
