/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AppHealthCreateInfrastructureServicesCommand } from './app-health-create-infrastructure-services.command';
import { AppHealthCreateInfrastructureServicesService } from './app-health-create-infrastructure-services.service';
import {
    AppHealthInfrastructureServiceId,
    AppHealthInfrastructureServiceProviderId,
    AppHealthInfrastructureServiceName,
    AppHealthInfrastructureServiceScore,
    AppHealthInfrastructureServiceCreatedAt,
    AppHealthInfrastructureServiceUpdatedAt,
    AppHealthInfrastructureServiceDeletedAt,
} from '../../domain/value-objects';

@CommandHandler(AppHealthCreateInfrastructureServicesCommand)
export class AppHealthCreateInfrastructureServicesCommandHandler implements ICommandHandler<AppHealthCreateInfrastructureServicesCommand>
{
    constructor(
        private readonly createInfrastructureServicesService: AppHealthCreateInfrastructureServicesService,
    ) {}

    async execute(command: AppHealthCreateInfrastructureServicesCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createInfrastructureServicesService.main(
            command.payload
                .map(infrastructureService =>
                {
                    return {
                        id: new AppHealthInfrastructureServiceId(infrastructureService.id),
                        providerId: new AppHealthInfrastructureServiceProviderId(infrastructureService.providerId),
                        name: new AppHealthInfrastructureServiceName(infrastructureService.name),
                        score: new AppHealthInfrastructureServiceScore(infrastructureService.score),
                    };
                }),
            command.cQMetadata,
        );
    }
}
