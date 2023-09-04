/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AppHealthUpdateApplicationInfrastructureServiceByIdCommand } from './app-health-update-application-infrastructure-service-by-id.command';
import { AppHealthUpdateApplicationInfrastructureServiceByIdService } from './app-health-update-application-infrastructure-service-by-id.service';
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

@CommandHandler(AppHealthUpdateApplicationInfrastructureServiceByIdCommand)
export class AppHealthUpdateApplicationInfrastructureServiceByIdCommandHandler implements ICommandHandler<AppHealthUpdateApplicationInfrastructureServiceByIdCommand>
{
    constructor(
        private readonly updateApplicationInfrastructureServiceByIdService: AppHealthUpdateApplicationInfrastructureServiceByIdService,
    ) {}

    async execute(command: AppHealthUpdateApplicationInfrastructureServiceByIdCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateApplicationInfrastructureServiceByIdService.main(
            {
                id: new AppHealthApplicationInfrastructureServiceId(command.payload.id),
                applicationId: new AppHealthApplicationInfrastructureServiceApplicationId(command.payload.applicationId, { undefinable: true }),
                infrastructureServiceId: new AppHealthApplicationInfrastructureServiceInfrastructureServiceId(command.payload.infrastructureServiceId, { undefinable: true }),
                averageCostPerYear: new AppHealthApplicationInfrastructureServiceAverageCostPerYear(command.payload.averageCostPerYear),
                score: new AppHealthApplicationInfrastructureServiceScore(command.payload.score, { undefinable: true }),
            },
            command.constraint,
            command.cQMetadata,
        );
    }
}
