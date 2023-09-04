/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AppHealthCreateApplicationCommand } from './app-health-create-application.command';
import { AppHealthCreateApplicationService } from './app-health-create-application.service';
import {
    AppHealthApplicationId,
    AppHealthApplicationTechnicalSolutionId,
    AppHealthApplicationName,
    AppHealthApplicationDescription,
    AppHealthApplicationBusinessImpact,
    AppHealthApplicationType,
    AppHealthApplicationReleaseDate,
    AppHealthApplicationArchitectureDiagram,
    AppHealthApplicationHasTenants,
    AppHealthApplicationHasLicensing,
    AppHealthApplicationCostLicensesPerYear,
    AppHealthApplicationRequestsPerDay,
    AppHealthApplicationCreatedAt,
    AppHealthApplicationUpdatedAt,
    AppHealthApplicationDeletedAt,
} from '../../domain/value-objects';

@CommandHandler(AppHealthCreateApplicationCommand)
export class AppHealthCreateApplicationCommandHandler implements ICommandHandler<AppHealthCreateApplicationCommand>
{
    constructor(
        private readonly createApplicationService: AppHealthCreateApplicationService,
    ) {}

    async execute(command: AppHealthCreateApplicationCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createApplicationService.main(
            {
                id: new AppHealthApplicationId(command.payload.id),
                technicalSolutionId: new AppHealthApplicationTechnicalSolutionId(command.payload.technicalSolutionId),
                name: new AppHealthApplicationName(command.payload.name),
                description: new AppHealthApplicationDescription(command.payload.description),
                businessImpact: new AppHealthApplicationBusinessImpact(command.payload.businessImpact),
                type: new AppHealthApplicationType(command.payload.type),
                releaseDate: new AppHealthApplicationReleaseDate(command.payload.releaseDate),
                architectureDiagram: new AppHealthApplicationArchitectureDiagram(command.payload.architectureDiagram),
                hasTenants: new AppHealthApplicationHasTenants(command.payload.hasTenants),
                hasLicensing: new AppHealthApplicationHasLicensing(command.payload.hasLicensing),
                costLicensesPerYear: new AppHealthApplicationCostLicensesPerYear(command.payload.costLicensesPerYear),
                requestsPerDay: new AppHealthApplicationRequestsPerDay(command.payload.requestsPerDay),
            },
            command.cQMetadata,
        );
    }
}
