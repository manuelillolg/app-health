/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AppHealthUpsertApplicationAuthenticationCommand } from './app-health-upsert-application-authentication.command';
import { AppHealthUpsertApplicationAuthenticationService } from './app-health-upsert-application-authentication.service';
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

@CommandHandler(AppHealthUpsertApplicationAuthenticationCommand)
export class AppHealthUpsertApplicationAuthenticationCommandHandler implements ICommandHandler<AppHealthUpsertApplicationAuthenticationCommand>
{
    constructor(
        private readonly upsertApplicationAuthenticationService: AppHealthUpsertApplicationAuthenticationService,
    ) {}

    async execute(command: AppHealthUpsertApplicationAuthenticationCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.upsertApplicationAuthenticationService.main(
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
