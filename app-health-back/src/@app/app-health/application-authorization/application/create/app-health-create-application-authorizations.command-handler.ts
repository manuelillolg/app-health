/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AppHealthCreateApplicationAuthorizationsCommand } from './app-health-create-application-authorizations.command';
import { AppHealthCreateApplicationAuthorizationsService } from './app-health-create-application-authorizations.service';
import {
    AppHealthApplicationAuthorizationId,
    AppHealthApplicationAuthorizationApplicationId,
    AppHealthApplicationAuthorizationAuthorizationInterfaceId,
    AppHealthApplicationAuthorizationTotalUsers,
    AppHealthApplicationAuthorizationScore,
    AppHealthApplicationAuthorizationApplicationInfrastructureServiceId,
    AppHealthApplicationAuthorizationCreatedAt,
    AppHealthApplicationAuthorizationUpdatedAt,
    AppHealthApplicationAuthorizationDeletedAt,
} from '../../domain/value-objects';

@CommandHandler(AppHealthCreateApplicationAuthorizationsCommand)
export class AppHealthCreateApplicationAuthorizationsCommandHandler implements ICommandHandler<AppHealthCreateApplicationAuthorizationsCommand>
{
    constructor(
        private readonly createApplicationAuthorizationsService: AppHealthCreateApplicationAuthorizationsService,
    ) {}

    async execute(command: AppHealthCreateApplicationAuthorizationsCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createApplicationAuthorizationsService.main(
            command.payload
                .map(applicationAuthorization =>
                {
                    return {
                        id: new AppHealthApplicationAuthorizationId(applicationAuthorization.id),
                        applicationId: new AppHealthApplicationAuthorizationApplicationId(applicationAuthorization.applicationId),
                        authorizationInterfaceId: new AppHealthApplicationAuthorizationAuthorizationInterfaceId(applicationAuthorization.authorizationInterfaceId),
                        totalUsers: new AppHealthApplicationAuthorizationTotalUsers(applicationAuthorization.totalUsers),
                        score: new AppHealthApplicationAuthorizationScore(applicationAuthorization.score),
                        applicationInfrastructureServiceId: new AppHealthApplicationAuthorizationApplicationInfrastructureServiceId(applicationAuthorization.applicationInfrastructureServiceId),
                    };
                }),
            command.cQMetadata,
        );
    }
}
