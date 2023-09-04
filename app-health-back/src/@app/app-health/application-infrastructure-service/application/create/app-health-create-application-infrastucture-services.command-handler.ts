/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AppHealthCreateApplicationInfrastuctureServicesCommand } from './app-health-create-application-infrastucture-services.command';
import { AppHealthCreateApplicationInfrastuctureServicesService } from './app-health-create-application-infrastucture-services.service';
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

@CommandHandler(AppHealthCreateApplicationInfrastuctureServicesCommand)
export class AppHealthCreateApplicationInfrastuctureServicesCommandHandler implements ICommandHandler<AppHealthCreateApplicationInfrastuctureServicesCommand>
{
    constructor(
        private readonly createApplicationInfrastuctureServicesService: AppHealthCreateApplicationInfrastuctureServicesService,
    ) {}

    async execute(command: AppHealthCreateApplicationInfrastuctureServicesCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createApplicationInfrastuctureServicesService.main(
            command.payload
                .map(applicationInfrastructureService =>
                {
                    return {
                        id: new AppHealthApplicationInfrastructureServiceId(applicationInfrastructureService.id),
                        applicationId: new AppHealthApplicationInfrastructureServiceApplicationId(applicationInfrastructureService.applicationId),
                        infrastructureServiceId: new AppHealthApplicationInfrastructureServiceInfrastructureServiceId(applicationInfrastructureService.infrastructureServiceId),
                        averageCostPerYear: new AppHealthApplicationInfrastructureServiceAverageCostPerYear(applicationInfrastructureService.averageCostPerYear),
                        score: new AppHealthApplicationInfrastructureServiceScore(applicationInfrastructureService.score),
                    };
                }),
            command.cQMetadata,
        );
    }
}
