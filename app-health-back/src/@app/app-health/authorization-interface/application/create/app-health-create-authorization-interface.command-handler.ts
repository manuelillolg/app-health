/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AppHealthCreateAuthorizationInterfaceCommand } from './app-health-create-authorization-interface.command';
import { AppHealthCreateAuthorizationInterfaceService } from './app-health-create-authorization-interface.service';
import {
    AppHealthAuthorizationInterfaceId,
    AppHealthAuthorizationInterfaceName,
    AppHealthAuthorizationInterfaceScore,
    AppHealthAuthorizationInterfaceCreatedAt,
    AppHealthAuthorizationInterfaceUpdatedAt,
    AppHealthAuthorizationInterfaceDeletedAt,
} from '../../domain/value-objects';

@CommandHandler(AppHealthCreateAuthorizationInterfaceCommand)
export class AppHealthCreateAuthorizationInterfaceCommandHandler implements ICommandHandler<AppHealthCreateAuthorizationInterfaceCommand>
{
    constructor(
        private readonly createAuthorizationInterfaceService: AppHealthCreateAuthorizationInterfaceService,
    ) {}

    async execute(command: AppHealthCreateAuthorizationInterfaceCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createAuthorizationInterfaceService.main(
            {
                id: new AppHealthAuthorizationInterfaceId(command.payload.id),
                name: new AppHealthAuthorizationInterfaceName(command.payload.name),
                score: new AppHealthAuthorizationInterfaceScore(command.payload.score),
            },
            command.cQMetadata,
        );
    }
}
