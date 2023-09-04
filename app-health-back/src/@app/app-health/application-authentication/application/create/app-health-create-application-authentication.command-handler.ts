/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AppHealthCreateApplicationAuthenticationCommand } from './app-health-create-application-authentication.command';
import { AppHealthCreateApplicationAuthenticationService } from './app-health-create-application-authentication.service';
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

@CommandHandler(AppHealthCreateApplicationAuthenticationCommand)
export class AppHealthCreateApplicationAuthenticationCommandHandler implements ICommandHandler<AppHealthCreateApplicationAuthenticationCommand>
{
    constructor(
        private readonly createApplicationAuthenticationService: AppHealthCreateApplicationAuthenticationService,
    ) {}

    async execute(command: AppHealthCreateApplicationAuthenticationCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createApplicationAuthenticationService.main(
            {
                id: new AppHealthApplicationAuthenticationId(command.payload.id),
                applicationId: new AppHealthApplicationAuthenticationApplicationId(command.payload.applicationId),
                authenticationInterfaceId: new AppHealthApplicationAuthenticationAuthenticationInterfaceId(command.payload.authenticationInterfaceId),
                totalUsers: new AppHealthApplicationAuthenticationTotalUsers(command.payload.totalUsers),
                score: new AppHealthApplicationAuthenticationScore(command.payload.score),
                applicationInfrastructureServiceId: new AppHealthApplicationAuthenticationApplicationInfrastructureServiceId(command.payload.applicationInfrastructureServiceId),
            },
            command.cQMetadata,
        );
    }
}
