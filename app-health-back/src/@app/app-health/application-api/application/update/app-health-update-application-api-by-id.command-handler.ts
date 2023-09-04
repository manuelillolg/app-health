/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AppHealthUpdateApplicationApiByIdCommand } from './app-health-update-application-api-by-id.command';
import { AppHealthUpdateApplicationApiByIdService } from './app-health-update-application-api-by-id.service';
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

@CommandHandler(AppHealthUpdateApplicationApiByIdCommand)
export class AppHealthUpdateApplicationApiByIdCommandHandler implements ICommandHandler<AppHealthUpdateApplicationApiByIdCommand>
{
    constructor(
        private readonly updateApplicationApiByIdService: AppHealthUpdateApplicationApiByIdService,
    ) {}

    async execute(command: AppHealthUpdateApplicationApiByIdCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateApplicationApiByIdService.main(
            {
                id: new AppHealthApplicationApiId(command.payload.id),
                applicationId: new AppHealthApplicationApiApplicationId(command.payload.applicationId, { undefinable: true }),
                apiInterfaceTypeId: new AppHealthApplicationApiApiInterfaceTypeId(command.payload.apiInterfaceTypeId, { undefinable: true }),
                score: new AppHealthApplicationApiScore(command.payload.score, { undefinable: true }),
                documentations: new AppHealthApplicationApiDocumentations(command.payload.documentations),
                requestsPerDay: new AppHealthApplicationApiRequestsPerDay(command.payload.requestsPerDay),
                applicationInfrastructureServiceId: new AppHealthApplicationApiApplicationInfrastructureServiceId(command.payload.applicationInfrastructureServiceId, { undefinable: true }),
            },
            command.constraint,
            command.cQMetadata,
        );
    }
}
