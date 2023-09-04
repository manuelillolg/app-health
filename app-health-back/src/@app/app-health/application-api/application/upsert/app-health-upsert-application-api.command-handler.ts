/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AppHealthUpsertApplicationApiCommand } from './app-health-upsert-application-api.command';
import { AppHealthUpsertApplicationApiService } from './app-health-upsert-application-api.service';
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

@CommandHandler(AppHealthUpsertApplicationApiCommand)
export class AppHealthUpsertApplicationApiCommandHandler implements ICommandHandler<AppHealthUpsertApplicationApiCommand>
{
    constructor(
        private readonly upsertApplicationApiService: AppHealthUpsertApplicationApiService,
    ) {}

    async execute(command: AppHealthUpsertApplicationApiCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.upsertApplicationApiService.main(
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
