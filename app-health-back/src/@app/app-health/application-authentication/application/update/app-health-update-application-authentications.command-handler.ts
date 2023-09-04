/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AppHealthUpdateApplicationAuthenticationsCommand } from './app-health-update-application-authentications.command';
import { AppHealthUpdateApplicationAuthenticationsService } from './app-health-update-application-authentications.service';
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

@CommandHandler(AppHealthUpdateApplicationAuthenticationsCommand)
export class AppHealthUpdateApplicationAuthenticationsCommandHandler implements ICommandHandler<AppHealthUpdateApplicationAuthenticationsCommand>
{
    constructor(
        private readonly updateApplicationAuthenticationsService: AppHealthUpdateApplicationAuthenticationsService,
    ) {}

    async execute(command: AppHealthUpdateApplicationAuthenticationsCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateApplicationAuthenticationsService.main(
            {
                id: new AppHealthApplicationAuthenticationId(command.payload.id, { undefinable: true }),
                applicationId: new AppHealthApplicationAuthenticationApplicationId(command.payload.applicationId, { undefinable: true }),
                authenticationInterfaceId: new AppHealthApplicationAuthenticationAuthenticationInterfaceId(command.payload.authenticationInterfaceId, { undefinable: true }),
                totalUsers: new AppHealthApplicationAuthenticationTotalUsers(command.payload.totalUsers),
                score: new AppHealthApplicationAuthenticationScore(command.payload.score, { undefinable: true }),
                applicationInfrastructureServiceId: new AppHealthApplicationAuthenticationApplicationInfrastructureServiceId(command.payload.applicationInfrastructureServiceId, { undefinable: true }),
            },
            command.queryStatement,
            command.constraint,
            command.cQMetadata,
        );
    }
}
