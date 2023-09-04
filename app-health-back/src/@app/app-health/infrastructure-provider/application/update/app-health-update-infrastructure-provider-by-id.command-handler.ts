/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AppHealthUpdateInfrastructureProviderByIdCommand } from './app-health-update-infrastructure-provider-by-id.command';
import { AppHealthUpdateInfrastructureProviderByIdService } from './app-health-update-infrastructure-provider-by-id.service';
import {
    AppHealthInfrastructureProviderId,
    AppHealthInfrastructureProviderName,
    AppHealthInfrastructureProviderScore,
    AppHealthInfrastructureProviderCreatedAt,
    AppHealthInfrastructureProviderUpdatedAt,
    AppHealthInfrastructureProviderDeletedAt,
} from '../../domain/value-objects';

@CommandHandler(AppHealthUpdateInfrastructureProviderByIdCommand)
export class AppHealthUpdateInfrastructureProviderByIdCommandHandler implements ICommandHandler<AppHealthUpdateInfrastructureProviderByIdCommand>
{
    constructor(
        private readonly updateInfrastructureProviderByIdService: AppHealthUpdateInfrastructureProviderByIdService,
    ) {}

    async execute(command: AppHealthUpdateInfrastructureProviderByIdCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateInfrastructureProviderByIdService.main(
            {
                id: new AppHealthInfrastructureProviderId(command.payload.id),
                name: new AppHealthInfrastructureProviderName(command.payload.name, { undefinable: true }),
                score: new AppHealthInfrastructureProviderScore(command.payload.score, { undefinable: true }),
            },
            command.constraint,
            command.cQMetadata,
        );
    }
}
