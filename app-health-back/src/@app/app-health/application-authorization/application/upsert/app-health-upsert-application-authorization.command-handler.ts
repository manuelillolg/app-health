/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AppHealthUpsertApplicationAuthorizationCommand } from './app-health-upsert-application-authorization.command';
import { AppHealthUpsertApplicationAuthorizationService } from './app-health-upsert-application-authorization.service';
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

@CommandHandler(AppHealthUpsertApplicationAuthorizationCommand)
export class AppHealthUpsertApplicationAuthorizationCommandHandler implements ICommandHandler<AppHealthUpsertApplicationAuthorizationCommand>
{
    constructor(
        private readonly upsertApplicationAuthorizationService: AppHealthUpsertApplicationAuthorizationService,
    ) {}

    async execute(command: AppHealthUpsertApplicationAuthorizationCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.upsertApplicationAuthorizationService.main(
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
