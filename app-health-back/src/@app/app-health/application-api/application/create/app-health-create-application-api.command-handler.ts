/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AppHealthCreateApplicationApiCommand } from './app-health-create-application-api.command';
import { AppHealthCreateApplicationApiService } from './app-health-create-application-api.service';
import {
    AppHealthApplicationApiId,
    AppHealthApplicationApiApplicationId,
    AppHealthApplicationApiApiInterfaceTypeId,
    AppHealthApplicationApiScore,
    AppHealthApplicationApiDocumentations,
    AppHealthApplicationApiRequestsPerDay,
    AppHealthApplicationApiApplicationInfrastructureServiceId,
    AppHealthApplicationApiCreatedAt,
    AppHealthApplicationApiUpdatedAt,
    AppHealthApplicationApiDeletedAt,
} from '../../domain/value-objects';

@CommandHandler(AppHealthCreateApplicationApiCommand)
export class AppHealthCreateApplicationApiCommandHandler implements ICommandHandler<AppHealthCreateApplicationApiCommand>
{
    constructor(
        private readonly createApplicationApiService: AppHealthCreateApplicationApiService,
    ) {}

    async execute(command: AppHealthCreateApplicationApiCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createApplicationApiService.main(
            {
                id: new AppHealthApplicationApiId(command.payload.id),
                applicationId: new AppHealthApplicationApiApplicationId(command.payload.applicationId),
                apiInterfaceTypeId: new AppHealthApplicationApiApiInterfaceTypeId(command.payload.apiInterfaceTypeId),
                score: new AppHealthApplicationApiScore(command.payload.score),
                documentations: new AppHealthApplicationApiDocumentations(command.payload.documentations),
                requestsPerDay: new AppHealthApplicationApiRequestsPerDay(command.payload.requestsPerDay),
                applicationInfrastructureServiceId: new AppHealthApplicationApiApplicationInfrastructureServiceId(command.payload.applicationInfrastructureServiceId),
            },
            command.cQMetadata,
        );
    }
}
