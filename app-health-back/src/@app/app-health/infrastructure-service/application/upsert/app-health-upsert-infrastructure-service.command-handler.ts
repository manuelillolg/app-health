/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AppHealthUpsertInfrastructureServiceCommand } from './app-health-upsert-infrastructure-service.command';
import { AppHealthUpsertInfrastructureServiceService } from './app-health-upsert-infrastructure-service.service';
import {
    AppHealthInfrastructureServiceId,
    AppHealthInfrastructureServiceProviderId,
    AppHealthInfrastructureServiceName,
    AppHealthInfrastructureServiceScore,
    AppHealthInfrastructureServiceCreatedAt,
    AppHealthInfrastructureServiceUpdatedAt,
    AppHealthInfrastructureServiceDeletedAt,
} from '../../domain/value-objects';

@CommandHandler(AppHealthUpsertInfrastructureServiceCommand)
export class AppHealthUpsertInfrastructureServiceCommandHandler implements ICommandHandler<AppHealthUpsertInfrastructureServiceCommand>
{
    constructor(
        private readonly upsertInfrastructureServiceService: AppHealthUpsertInfrastructureServiceService,
    ) {}

    async execute(command: AppHealthUpsertInfrastructureServiceCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.upsertInfrastructureServiceService.main(
            {
                id: new AppHealthInfrastructureServiceId(command.payload.id),
                providerId: new AppHealthInfrastructureServiceProviderId(command.payload.providerId),
                name: new AppHealthInfrastructureServiceName(command.payload.name),
                score: new AppHealthInfrastructureServiceScore(command.payload.score),
            },
            command.cQMetadata,
        );
    }
}
