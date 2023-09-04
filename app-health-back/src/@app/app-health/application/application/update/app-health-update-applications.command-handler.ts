/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AppHealthUpdateApplicationsCommand } from './app-health-update-applications.command';
import { AppHealthUpdateApplicationsService } from './app-health-update-applications.service';
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

@CommandHandler(AppHealthUpdateApplicationsCommand)
export class AppHealthUpdateApplicationsCommandHandler implements ICommandHandler<AppHealthUpdateApplicationsCommand>
{
    constructor(
        private readonly updateApplicationsService: AppHealthUpdateApplicationsService,
    ) {}

    async execute(command: AppHealthUpdateApplicationsCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateApplicationsService.main(
            {
                id: new AppHealthApplicationId(command.payload.id, { undefinable: true }),
                technicalSolutionId: new AppHealthApplicationTechnicalSolutionId(command.payload.technicalSolutionId, { undefinable: true }),
                name: new AppHealthApplicationName(command.payload.name, { undefinable: true }),
                description: new AppHealthApplicationDescription(command.payload.description),
                businessImpact: new AppHealthApplicationBusinessImpact(command.payload.businessImpact),
                type: new AppHealthApplicationType(command.payload.type, { undefinable: true }),
                releaseDate: new AppHealthApplicationReleaseDate(command.payload.releaseDate),
                architectureDiagram: new AppHealthApplicationArchitectureDiagram(command.payload.architectureDiagram),
                hasTenants: new AppHealthApplicationHasTenants(command.payload.hasTenants, { undefinable: true }),
                hasLicensing: new AppHealthApplicationHasLicensing(command.payload.hasLicensing, { undefinable: true }),
                costLicensesPerYear: new AppHealthApplicationCostLicensesPerYear(command.payload.costLicensesPerYear),
                requestsPerDay: new AppHealthApplicationRequestsPerDay(command.payload.requestsPerDay),
            },
            command.queryStatement,
            command.constraint,
            command.cQMetadata,
        );
    }
}
