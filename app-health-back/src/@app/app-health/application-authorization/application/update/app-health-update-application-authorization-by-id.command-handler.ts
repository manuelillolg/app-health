/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AppHealthUpdateApplicationAuthorizationByIdCommand } from './app-health-update-application-authorization-by-id.command';
import { AppHealthUpdateApplicationAuthorizationByIdService } from './app-health-update-application-authorization-by-id.service';
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

@CommandHandler(AppHealthUpdateApplicationAuthorizationByIdCommand)
export class AppHealthUpdateApplicationAuthorizationByIdCommandHandler implements ICommandHandler<AppHealthUpdateApplicationAuthorizationByIdCommand>
{
    constructor(
        private readonly updateApplicationAuthorizationByIdService: AppHealthUpdateApplicationAuthorizationByIdService,
    ) {}

    async execute(command: AppHealthUpdateApplicationAuthorizationByIdCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateApplicationAuthorizationByIdService.main(
            {
                id: new AppHealthApplicationAuthorizationId(command.payload.id),
                applicationId: new AppHealthApplicationAuthorizationApplicationId(command.payload.applicationId, { undefinable: true }),
                authorizationInterfaceId: new AppHealthApplicationAuthorizationAuthorizationInterfaceId(command.payload.authorizationInterfaceId, { undefinable: true }),
                totalUsers: new AppHealthApplicationAuthorizationTotalUsers(command.payload.totalUsers),
                score: new AppHealthApplicationAuthorizationScore(command.payload.score, { undefinable: true }),
                applicationInfrastructureServiceId: new AppHealthApplicationAuthorizationApplicationInfrastructureServiceId(command.payload.applicationInfrastructureServiceId, { undefinable: true }),
            },
            command.constraint,
            command.cQMetadata,
        );
    }
}
