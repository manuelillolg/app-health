/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AppHealthCreateApplicationApisCommand } from './app-health-create-application-apis.command';
import { AppHealthCreateApplicationApisService } from './app-health-create-application-apis.service';
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

@CommandHandler(AppHealthCreateApplicationApisCommand)
export class AppHealthCreateApplicationApisCommandHandler implements ICommandHandler<AppHealthCreateApplicationApisCommand>
{
    constructor(
        private readonly createApplicationApisService: AppHealthCreateApplicationApisService,
    ) {}

    async execute(command: AppHealthCreateApplicationApisCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createApplicationApisService.main(
            command.payload
                .map(applicationApi =>
                {
                    return {
                        id: new AppHealthApplicationApiId(applicationApi.id),
                        applicationId: new AppHealthApplicationApiApplicationId(applicationApi.applicationId),
                        apiInterfaceTypeId: new AppHealthApplicationApiApiInterfaceTypeId(applicationApi.apiInterfaceTypeId),
                        score: new AppHealthApplicationApiScore(applicationApi.score),
                        documentations: new AppHealthApplicationApiDocumentations(applicationApi.documentations),
                        requestsPerDay: new AppHealthApplicationApiRequestsPerDay(applicationApi.requestsPerDay),
                        applicationInfrastructureServiceId: new AppHealthApplicationApiApplicationInfrastructureServiceId(applicationApi.applicationInfrastructureServiceId),
                    };
                }),
            command.cQMetadata,
        );
    }
}
