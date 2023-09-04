/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AppHealthUpdateApplicationAuthenticationByIdCommand } from './app-health-update-application-authentication-by-id.command';
import { AppHealthUpdateApplicationAuthenticationByIdService } from './app-health-update-application-authentication-by-id.service';
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

@CommandHandler(AppHealthUpdateApplicationAuthenticationByIdCommand)
export class AppHealthUpdateApplicationAuthenticationByIdCommandHandler implements ICommandHandler<AppHealthUpdateApplicationAuthenticationByIdCommand>
{
    constructor(
        private readonly updateApplicationAuthenticationByIdService: AppHealthUpdateApplicationAuthenticationByIdService,
    ) {}

    async execute(command: AppHealthUpdateApplicationAuthenticationByIdCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateApplicationAuthenticationByIdService.main(
            {
                id: new AppHealthApplicationAuthenticationId(command.payload.id),
                applicationId: new AppHealthApplicationAuthenticationApplicationId(command.payload.applicationId, { undefinable: true }),
                authenticationInterfaceId: new AppHealthApplicationAuthenticationAuthenticationInterfaceId(command.payload.authenticationInterfaceId, { undefinable: true }),
                totalUsers: new AppHealthApplicationAuthenticationTotalUsers(command.payload.totalUsers),
                score: new AppHealthApplicationAuthenticationScore(command.payload.score, { undefinable: true }),
                applicationInfrastructureServiceId: new AppHealthApplicationAuthenticationApplicationInfrastructureServiceId(command.payload.applicationInfrastructureServiceId, { undefinable: true }),
            },
            command.constraint,
            command.cQMetadata,
        );
    }
}
