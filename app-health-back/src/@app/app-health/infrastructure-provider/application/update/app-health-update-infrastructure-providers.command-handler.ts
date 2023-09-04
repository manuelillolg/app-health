/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AppHealthUpdateInfrastructureProvidersCommand } from './app-health-update-infrastructure-providers.command';
import { AppHealthUpdateInfrastructureProvidersService } from './app-health-update-infrastructure-providers.service';
import {
    AppHealthInfrastructureProviderId,
    AppHealthInfrastructureProviderName,
    AppHealthInfrastructureProviderScore,
    AppHealthInfrastructureProviderCreatedAt,
    AppHealthInfrastructureProviderUpdatedAt,
    AppHealthInfrastructureProviderDeletedAt,
} from '../../domain/value-objects';

@CommandHandler(AppHealthUpdateInfrastructureProvidersCommand)
export class AppHealthUpdateInfrastructureProvidersCommandHandler implements ICommandHandler<AppHealthUpdateInfrastructureProvidersCommand>
{
    constructor(
        private readonly updateInfrastructureProvidersService: AppHealthUpdateInfrastructureProvidersService,
    ) {}

    async execute(command: AppHealthUpdateInfrastructureProvidersCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateInfrastructureProvidersService.main(
            {
                id: new AppHealthInfrastructureProviderId(command.payload.id, { undefinable: true }),
                name: new AppHealthInfrastructureProviderName(command.payload.name, { undefinable: true }),
                score: new AppHealthInfrastructureProviderScore(command.payload.score, { undefinable: true }),
            },
            command.queryStatement,
            command.constraint,
            command.cQMetadata,
        );
    }
}
