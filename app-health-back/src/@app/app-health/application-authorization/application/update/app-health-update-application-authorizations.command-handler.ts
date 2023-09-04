/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AppHealthUpdateApplicationAuthorizationsCommand } from './app-health-update-application-authorizations.command';
import { AppHealthUpdateApplicationAuthorizationsService } from './app-health-update-application-authorizations.service';
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

@CommandHandler(AppHealthUpdateApplicationAuthorizationsCommand)
export class AppHealthUpdateApplicationAuthorizationsCommandHandler implements ICommandHandler<AppHealthUpdateApplicationAuthorizationsCommand>
{
    constructor(
        private readonly updateApplicationAuthorizationsService: AppHealthUpdateApplicationAuthorizationsService,
    ) {}

    async execute(command: AppHealthUpdateApplicationAuthorizationsCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateApplicationAuthorizationsService.main(
            {
                id: new AppHealthApplicationAuthorizationId(command.payload.id, { undefinable: true }),
                applicationId: new AppHealthApplicationAuthorizationApplicationId(command.payload.applicationId, { undefinable: true }),
                authorizationInterfaceId: new AppHealthApplicationAuthorizationAuthorizationInterfaceId(command.payload.authorizationInterfaceId, { undefinable: true }),
                totalUsers: new AppHealthApplicationAuthorizationTotalUsers(command.payload.totalUsers),
                score: new AppHealthApplicationAuthorizationScore(command.payload.score, { undefinable: true }),
                applicationInfrastructureServiceId: new AppHealthApplicationAuthorizationApplicationInfrastructureServiceId(command.payload.applicationInfrastructureServiceId, { undefinable: true }),
            },
            command.queryStatement,
            command.constraint,
            command.cQMetadata,
        );
    }
}
