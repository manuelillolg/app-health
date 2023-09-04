/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AppHealthUpdateApplicationInfrastuctureServicesCommand } from './app-health-update-application-infrastucture-services.command';
import { AppHealthUpdateApplicationInfrastuctureServicesService } from './app-health-update-application-infrastucture-services.service';
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

@CommandHandler(AppHealthUpdateApplicationInfrastuctureServicesCommand)
export class AppHealthUpdateApplicationInfrastuctureServicesCommandHandler implements ICommandHandler<AppHealthUpdateApplicationInfrastuctureServicesCommand>
{
    constructor(
        private readonly updateApplicationInfrastuctureServicesService: AppHealthUpdateApplicationInfrastuctureServicesService,
    ) {}

    async execute(command: AppHealthUpdateApplicationInfrastuctureServicesCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateApplicationInfrastuctureServicesService.main(
            {
                id: new AppHealthApplicationInfrastructureServiceId(command.payload.id, { undefinable: true }),
                applicationId: new AppHealthApplicationInfrastructureServiceApplicationId(command.payload.applicationId, { undefinable: true }),
                infrastructureServiceId: new AppHealthApplicationInfrastructureServiceInfrastructureServiceId(command.payload.infrastructureServiceId, { undefinable: true }),
                averageCostPerYear: new AppHealthApplicationInfrastructureServiceAverageCostPerYear(command.payload.averageCostPerYear),
                score: new AppHealthApplicationInfrastructureServiceScore(command.payload.score, { undefinable: true }),
            },
            command.queryStatement,
            command.constraint,
            command.cQMetadata,
        );
    }
}
