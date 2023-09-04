/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AppHealthUpsertApplicationLanguageCommand } from './app-health-upsert-application-language.command';
import { AppHealthUpsertApplicationLanguageService } from './app-health-upsert-application-language.service';
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

@CommandHandler(AppHealthUpsertApplicationLanguageCommand)
export class AppHealthUpsertApplicationLanguageCommandHandler implements ICommandHandler<AppHealthUpsertApplicationLanguageCommand>
{
    constructor(
        private readonly upsertApplicationLanguageService: AppHealthUpsertApplicationLanguageService,
    ) {}

    async execute(command: AppHealthUpsertApplicationLanguageCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.upsertApplicationLanguageService.main(
            {
                id: new AppHealthApplicationLanguageId(command.payload.id),
                applicationId: new AppHealthApplicationLanguageApplicationId(command.payload.applicationId),
                languageId: new AppHealthApplicationLanguageLanguageId(command.payload.languageId),
                version: new AppHealthApplicationLanguageVersion(command.payload.version),
                score: new AppHealthApplicationLanguageScore(command.payload.score),
                codeQualityScore: new AppHealthApplicationLanguageCodeQualityScore(command.payload.codeQualityScore),
            },
            command.cQMetadata,
        );
    }
}
