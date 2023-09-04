/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AppHealthUpdateInfrastructureServicesCommand } from './app-health-update-infrastructure-services.command';
import { AppHealthUpdateInfrastructureServicesService } from './app-health-update-infrastructure-services.service';
import {
    AppHealthInfrastructureServiceId,
    AppHealthInfrastructureServiceProviderId,
    AppHealthInfrastructureServiceName,
    AppHealthInfrastructureServiceScore,
    AppHealthInfrastructureServiceCreatedAt,
    AppHealthInfrastructureServiceUpdatedAt,
    AppHealthInfrastructureServiceDeletedAt,
} from '../../domain/value-objects';

@CommandHandler(AppHealthUpdateInfrastructureServicesCommand)
export class AppHealthUpdateInfrastructureServicesCommandHandler implements ICommandHandler<AppHealthUpdateInfrastructureServicesCommand>
{
    constructor(
        private readonly updateInfrastructureServicesService: AppHealthUpdateInfrastructureServicesService,
    ) {}

    async execute(command: AppHealthUpdateInfrastructureServicesCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateInfrastructureServicesService.main(
            {
                id: new AppHealthInfrastructureServiceId(command.payload.id, { undefinable: true }),
                providerId: new AppHealthInfrastructureServiceProviderId(command.payload.providerId, { undefinable: true }),
                name: new AppHealthInfrastructureServiceName(command.payload.name, { undefinable: true }),
                score: new AppHealthInfrastructureServiceScore(command.payload.score, { undefinable: true }),
            },
            command.queryStatement,
            command.constraint,
            command.cQMetadata,
        );
    }
}
