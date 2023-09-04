/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AppHealthUpsertAuthorizationInterfaceCommand } from './app-health-upsert-authorization-interface.command';
import { AppHealthUpsertAuthorizationInterfaceService } from './app-health-upsert-authorization-interface.service';
import {
    AppHealthAuthorizationInterfaceId,
    AppHealthAuthorizationInterfaceName,
    AppHealthAuthorizationInterfaceScore,
    AppHealthAuthorizationInterfaceCreatedAt,
    AppHealthAuthorizationInterfaceUpdatedAt,
    AppHealthAuthorizationInterfaceDeletedAt,
} from '../../domain/value-objects';

@CommandHandler(AppHealthUpsertAuthorizationInterfaceCommand)
export class AppHealthUpsertAuthorizationInterfaceCommandHandler implements ICommandHandler<AppHealthUpsertAuthorizationInterfaceCommand>
{
    constructor(
        private readonly upsertAuthorizationInterfaceService: AppHealthUpsertAuthorizationInterfaceService,
    ) {}

    async execute(command: AppHealthUpsertAuthorizationInterfaceCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.upsertAuthorizationInterfaceService.main(
            {
                id: new AppHealthAuthorizationInterfaceId(command.payload.id),
                name: new AppHealthAuthorizationInterfaceName(command.payload.name),
                score: new AppHealthAuthorizationInterfaceScore(command.payload.score),
            },
            command.cQMetadata,
        );
    }
}
