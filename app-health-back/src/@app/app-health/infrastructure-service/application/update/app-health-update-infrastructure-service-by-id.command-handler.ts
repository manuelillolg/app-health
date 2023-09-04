/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AppHealthUpdateInfrastructureServiceByIdCommand } from './app-health-update-infrastructure-service-by-id.command';
import { AppHealthUpdateInfrastructureServiceByIdService } from './app-health-update-infrastructure-service-by-id.service';
import {
    AppHealthInfrastructureServiceId,
    AppHealthInfrastructureServiceProviderId,
    AppHealthInfrastructureServiceName,
    AppHealthInfrastructureServiceScore,
    AppHealthInfrastructureServiceCreatedAt,
    AppHealthInfrastructureServiceUpdatedAt,
    AppHealthInfrastructureServiceDeletedAt,
} from '../../domain/value-objects';

@CommandHandler(AppHealthUpdateInfrastructureServiceByIdCommand)
export class AppHealthUpdateInfrastructureServiceByIdCommandHandler implements ICommandHandler<AppHealthUpdateInfrastructureServiceByIdCommand>
{
    constructor(
        private readonly updateInfrastructureServiceByIdService: AppHealthUpdateInfrastructureServiceByIdService,
    ) {}

    async execute(command: AppHealthUpdateInfrastructureServiceByIdCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateInfrastructureServiceByIdService.main(
            {
                id: new AppHealthInfrastructureServiceId(command.payload.id),
                providerId: new AppHealthInfrastructureServiceProviderId(command.payload.providerId, { undefinable: true }),
                name: new AppHealthInfrastructureServiceName(command.payload.name, { undefinable: true }),
                score: new AppHealthInfrastructureServiceScore(command.payload.score, { undefinable: true }),
            },
            command.constraint,
            command.cQMetadata,
        );
    }
}
