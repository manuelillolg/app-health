/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AppHealthCreateInfrastructureProviderCommand } from './app-health-create-infrastructure-provider.command';
import { AppHealthCreateInfrastructureProviderService } from './app-health-create-infrastructure-provider.service';
import {
    AppHealthInfrastructureProviderId,
    AppHealthInfrastructureProviderName,
    AppHealthInfrastructureProviderScore,
    AppHealthInfrastructureProviderCreatedAt,
    AppHealthInfrastructureProviderUpdatedAt,
    AppHealthInfrastructureProviderDeletedAt,
} from '../../domain/value-objects';

@CommandHandler(AppHealthCreateInfrastructureProviderCommand)
export class AppHealthCreateInfrastructureProviderCommandHandler implements ICommandHandler<AppHealthCreateInfrastructureProviderCommand>
{
    constructor(
        private readonly createInfrastructureProviderService: AppHealthCreateInfrastructureProviderService,
    ) {}

    async execute(command: AppHealthCreateInfrastructureProviderCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createInfrastructureProviderService.main(
            {
                id: new AppHealthInfrastructureProviderId(command.payload.id),
                name: new AppHealthInfrastructureProviderName(command.payload.name),
                score: new AppHealthInfrastructureProviderScore(command.payload.score),
            },
            command.cQMetadata,
        );
    }
}
