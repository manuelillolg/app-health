/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AppHealthCreateApplicationInfrastructureServiceCommand } from './app-health-create-application-infrastructure-service.command';
import { AppHealthCreateApplicationInfrastructureServiceService } from './app-health-create-application-infrastructure-service.service';
import {
    AppHealthApplicationInfrastructureServiceId,
    AppHealthApplicationInfrastructureServiceApplicationId,
    AppHealthApplicationInfrastructureServiceInfrastructureServiceId,
    AppHealthApplicationInfrastructureServiceAverageCostPerYear,
    AppHealthApplicationInfrastructureServiceScore,
    AppHealthApplicationInfrastructureServiceCreatedAt,
    AppHealthApplicationInfrastructureServiceUpdatedAt,
    AppHealthApplicationInfrastructureServiceDeletedAt,
} from '../../domain/value-objects';

@CommandHandler(AppHealthCreateApplicationInfrastructureServiceCommand)
export class AppHealthCreateApplicationInfrastructureServiceCommandHandler implements ICommandHandler<AppHealthCreateApplicationInfrastructureServiceCommand>
{
    constructor(
        private readonly createApplicationInfrastructureServiceService: AppHealthCreateApplicationInfrastructureServiceService,
    ) {}

    async execute(command: AppHealthCreateApplicationInfrastructureServiceCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createApplicationInfrastructureServiceService.main(
            {
                id: new AppHealthApplicationInfrastructureServiceId(command.payload.id),
                applicationId: new AppHealthApplicationInfrastructureServiceApplicationId(command.payload.applicationId),
                infrastructureServiceId: new AppHealthApplicationInfrastructureServiceInfrastructureServiceId(command.payload.infrastructureServiceId),
                averageCostPerYear: new AppHealthApplicationInfrastructureServiceAverageCostPerYear(command.payload.averageCostPerYear),
                score: new AppHealthApplicationInfrastructureServiceScore(command.payload.score),
            },
            command.cQMetadata,
        );
    }
}
