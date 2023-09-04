/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AppHealthUpdateApplicationApisCommand } from './app-health-update-application-apis.command';
import { AppHealthUpdateApplicationApisService } from './app-health-update-application-apis.service';
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

@CommandHandler(AppHealthUpdateApplicationApisCommand)
export class AppHealthUpdateApplicationApisCommandHandler implements ICommandHandler<AppHealthUpdateApplicationApisCommand>
{
    constructor(
        private readonly updateApplicationApisService: AppHealthUpdateApplicationApisService,
    ) {}

    async execute(command: AppHealthUpdateApplicationApisCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateApplicationApisService.main(
            {
                id: new AppHealthApplicationApiId(command.payload.id, { undefinable: true }),
                applicationId: new AppHealthApplicationApiApplicationId(command.payload.applicationId, { undefinable: true }),
                apiInterfaceTypeId: new AppHealthApplicationApiApiInterfaceTypeId(command.payload.apiInterfaceTypeId, { undefinable: true }),
                score: new AppHealthApplicationApiScore(command.payload.score, { undefinable: true }),
                documentations: new AppHealthApplicationApiDocumentations(command.payload.documentations),
                requestsPerDay: new AppHealthApplicationApiRequestsPerDay(command.payload.requestsPerDay),
                applicationInfrastructureServiceId: new AppHealthApplicationApiApplicationInfrastructureServiceId(command.payload.applicationInfrastructureServiceId, { undefinable: true }),
            },
            command.queryStatement,
            command.constraint,
            command.cQMetadata,
        );
    }
}
