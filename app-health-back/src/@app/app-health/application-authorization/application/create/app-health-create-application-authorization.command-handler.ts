/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AppHealthCreateApplicationAuthorizationCommand } from './app-health-create-application-authorization.command';
import { AppHealthCreateApplicationAuthorizationService } from './app-health-create-application-authorization.service';
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

@CommandHandler(AppHealthCreateApplicationAuthorizationCommand)
export class AppHealthCreateApplicationAuthorizationCommandHandler implements ICommandHandler<AppHealthCreateApplicationAuthorizationCommand>
{
    constructor(
        private readonly createApplicationAuthorizationService: AppHealthCreateApplicationAuthorizationService,
    ) {}

    async execute(command: AppHealthCreateApplicationAuthorizationCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createApplicationAuthorizationService.main(
            {
                id: new AppHealthApplicationAuthorizationId(command.payload.id),
                applicationId: new AppHealthApplicationAuthorizationApplicationId(command.payload.applicationId),
                authorizationInterfaceId: new AppHealthApplicationAuthorizationAuthorizationInterfaceId(command.payload.authorizationInterfaceId),
                totalUsers: new AppHealthApplicationAuthorizationTotalUsers(command.payload.totalUsers),
                score: new AppHealthApplicationAuthorizationScore(command.payload.score),
                applicationInfrastructureServiceId: new AppHealthApplicationAuthorizationApplicationInfrastructureServiceId(command.payload.applicationInfrastructureServiceId),
            },
            command.cQMetadata,
        );
    }
}
