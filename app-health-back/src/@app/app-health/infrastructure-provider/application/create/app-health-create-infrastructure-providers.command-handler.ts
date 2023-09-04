/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AppHealthCreateInfrastructureProvidersCommand } from './app-health-create-infrastructure-providers.command';
import { AppHealthCreateInfrastructureProvidersService } from './app-health-create-infrastructure-providers.service';
import {
    AppHealthInfrastructureProviderId,
    AppHealthInfrastructureProviderName,
    AppHealthInfrastructureProviderScore,
    AppHealthInfrastructureProviderCreatedAt,
    AppHealthInfrastructureProviderUpdatedAt,
    AppHealthInfrastructureProviderDeletedAt,
} from '../../domain/value-objects';

@CommandHandler(AppHealthCreateInfrastructureProvidersCommand)
export class AppHealthCreateInfrastructureProvidersCommandHandler implements ICommandHandler<AppHealthCreateInfrastructureProvidersCommand>
{
    constructor(
        private readonly createInfrastructureProvidersService: AppHealthCreateInfrastructureProvidersService,
    ) {}

    async execute(command: AppHealthCreateInfrastructureProvidersCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createInfrastructureProvidersService.main(
            command.payload
                .map(infrastructureProvider =>
                {
                    return {
                        id: new AppHealthInfrastructureProviderId(infrastructureProvider.id),
                        name: new AppHealthInfrastructureProviderName(infrastructureProvider.name),
                        score: new AppHealthInfrastructureProviderScore(infrastructureProvider.score),
                    };
                }),
            command.cQMetadata,
        );
    }
}
