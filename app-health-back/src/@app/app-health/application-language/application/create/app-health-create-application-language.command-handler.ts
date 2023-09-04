/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AppHealthCreateApplicationLanguageCommand } from './app-health-create-application-language.command';
import { AppHealthCreateApplicationLanguageService } from './app-health-create-application-language.service';
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

@CommandHandler(AppHealthCreateApplicationLanguageCommand)
export class AppHealthCreateApplicationLanguageCommandHandler implements ICommandHandler<AppHealthCreateApplicationLanguageCommand>
{
    constructor(
        private readonly createApplicationLanguageService: AppHealthCreateApplicationLanguageService,
    ) {}

    async execute(command: AppHealthCreateApplicationLanguageCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createApplicationLanguageService.main(
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
