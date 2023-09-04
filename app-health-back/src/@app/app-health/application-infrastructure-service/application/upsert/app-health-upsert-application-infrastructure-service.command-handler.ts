/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AppHealthUpsertApplicationInfrastructureServiceCommand } from './app-health-upsert-application-infrastructure-service.command';
import { AppHealthUpsertApplicationInfrastructureServiceService } from './app-health-upsert-application-infrastructure-service.service';
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

@CommandHandler(AppHealthUpsertApplicationInfrastructureServiceCommand)
export class AppHealthUpsertApplicationInfrastructureServiceCommandHandler implements ICommandHandler<AppHealthUpsertApplicationInfrastructureServiceCommand>
{
    constructor(
        private readonly upsertApplicationInfrastructureServiceService: AppHealthUpsertApplicationInfrastructureServiceService,
    ) {}

    async execute(command: AppHealthUpsertApplicationInfrastructureServiceCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.upsertApplicationInfrastructureServiceService.main(
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
