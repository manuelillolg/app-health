/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AppHealthCreateApplicationAuthenticationsCommand } from './app-health-create-application-authentications.command';
import { AppHealthCreateApplicationAuthenticationsService } from './app-health-create-application-authentications.service';
import {
    AppHealthApplicationAuthenticationId,
    AppHealthApplicationAuthenticationApplicationId,
    AppHealthApplicationAuthenticationAuthenticationInterfaceId,
    AppHealthApplicationAuthenticationTotalUsers,
    AppHealthApplicationAuthenticationScore,
    AppHealthApplicationAuthenticationApplicationInfrastructureServiceId,
    AppHealthApplicationAuthenticationCreatedAt,
    AppHealthApplicationAuthenticationUpdatedAt,
    AppHealthApplicationAuthenticationDeletedAt,
} from '../../domain/value-objects';

@CommandHandler(AppHealthCreateApplicationAuthenticationsCommand)
export class AppHealthCreateApplicationAuthenticationsCommandHandler implements ICommandHandler<AppHealthCreateApplicationAuthenticationsCommand>
{
    constructor(
        private readonly createApplicationAuthenticationsService: AppHealthCreateApplicationAuthenticationsService,
    ) {}

    async execute(command: AppHealthCreateApplicationAuthenticationsCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createApplicationAuthenticationsService.main(
            command.payload
                .map(applicationAuthentication =>
                {
                    return {
                        id: new AppHealthApplicationAuthenticationId(applicationAuthentication.id),
                        applicationId: new AppHealthApplicationAuthenticationApplicationId(applicationAuthentication.applicationId),
                        authenticationInterfaceId: new AppHealthApplicationAuthenticationAuthenticationInterfaceId(applicationAuthentication.authenticationInterfaceId),
                        totalUsers: new AppHealthApplicationAuthenticationTotalUsers(applicationAuthentication.totalUsers),
                        score: new AppHealthApplicationAuthenticationScore(applicationAuthentication.score),
                        applicationInfrastructureServiceId: new AppHealthApplicationAuthenticationApplicationInfrastructureServiceId(applicationAuthentication.applicationInfrastructureServiceId),
                    };
                }),
            command.cQMetadata,
        );
    }
}
