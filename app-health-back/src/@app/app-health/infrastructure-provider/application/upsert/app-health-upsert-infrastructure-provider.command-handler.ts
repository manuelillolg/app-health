/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AppHealthUpsertInfrastructureProviderCommand } from './app-health-upsert-infrastructure-provider.command';
import { AppHealthUpsertInfrastructureProviderService } from './app-health-upsert-infrastructure-provider.service';
import {
    AppHealthInfrastructureProviderId,
    AppHealthInfrastructureProviderName,
    AppHealthInfrastructureProviderScore,
    AppHealthInfrastructureProviderCreatedAt,
    AppHealthInfrastructureProviderUpdatedAt,
    AppHealthInfrastructureProviderDeletedAt,
} from '../../domain/value-objects';

@CommandHandler(AppHealthUpsertInfrastructureProviderCommand)
export class AppHealthUpsertInfrastructureProviderCommandHandler implements ICommandHandler<AppHealthUpsertInfrastructureProviderCommand>
{
    constructor(
        private readonly upsertInfrastructureProviderService: AppHealthUpsertInfrastructureProviderService,
    ) {}

    async execute(command: AppHealthUpsertInfrastructureProviderCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.upsertInfrastructureProviderService.main(
            {
                id: new AppHealthInfrastructureProviderId(command.payload.id),
                name: new AppHealthInfrastructureProviderName(command.payload.name),
                score: new AppHealthInfrastructureProviderScore(command.payload.score),
            },
            command.cQMetadata,
        );
    }
}
