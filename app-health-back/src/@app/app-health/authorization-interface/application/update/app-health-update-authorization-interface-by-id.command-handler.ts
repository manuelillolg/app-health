/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AppHealthUpdateAuthorizationInterfaceByIdCommand } from './app-health-update-authorization-interface-by-id.command';
import { AppHealthUpdateAuthorizationInterfaceByIdService } from './app-health-update-authorization-interface-by-id.service';
import {
    AppHealthAuthorizationInterfaceId,
    AppHealthAuthorizationInterfaceName,
    AppHealthAuthorizationInterfaceScore,
    AppHealthAuthorizationInterfaceCreatedAt,
    AppHealthAuthorizationInterfaceUpdatedAt,
    AppHealthAuthorizationInterfaceDeletedAt,
} from '../../domain/value-objects';

@CommandHandler(AppHealthUpdateAuthorizationInterfaceByIdCommand)
export class AppHealthUpdateAuthorizationInterfaceByIdCommandHandler implements ICommandHandler<AppHealthUpdateAuthorizationInterfaceByIdCommand>
{
    constructor(
        private readonly updateAuthorizationInterfaceByIdService: AppHealthUpdateAuthorizationInterfaceByIdService,
    ) {}

    async execute(command: AppHealthUpdateAuthorizationInterfaceByIdCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateAuthorizationInterfaceByIdService.main(
            {
                id: new AppHealthAuthorizationInterfaceId(command.payload.id),
                name: new AppHealthAuthorizationInterfaceName(command.payload.name, { undefinable: true }),
                score: new AppHealthAuthorizationInterfaceScore(command.payload.score, { undefinable: true }),
            },
            command.constraint,
            command.cQMetadata,
        );
    }
}
