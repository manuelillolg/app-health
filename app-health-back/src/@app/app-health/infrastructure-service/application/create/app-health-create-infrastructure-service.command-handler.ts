/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AppHealthCreateInfrastructureServiceCommand } from './app-health-create-infrastructure-service.command';
import { AppHealthCreateInfrastructureServiceService } from './app-health-create-infrastructure-service.service';
import {
    AppHealthInfrastructureServiceId,
    AppHealthInfrastructureServiceProviderId,
    AppHealthInfrastructureServiceName,
    AppHealthInfrastructureServiceScore,
    AppHealthInfrastructureServiceCreatedAt,
    AppHealthInfrastructureServiceUpdatedAt,
    AppHealthInfrastructureServiceDeletedAt,
} from '../../domain/value-objects';

@CommandHandler(AppHealthCreateInfrastructureServiceCommand)
export class AppHealthCreateInfrastructureServiceCommandHandler implements ICommandHandler<AppHealthCreateInfrastructureServiceCommand>
{
    constructor(
        private readonly createInfrastructureServiceService: AppHealthCreateInfrastructureServiceService,
    ) {}

    async execute(command: AppHealthCreateInfrastructureServiceCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createInfrastructureServiceService.main(
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
