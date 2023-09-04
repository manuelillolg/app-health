/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AppHealthUpdateAuthorizationInterfacesCommand } from './app-health-update-authorization-interfaces.command';
import { AppHealthUpdateAuthorizationInterfacesService } from './app-health-update-authorization-interfaces.service';
import {
    AppHealthAuthorizationInterfaceId,
    AppHealthAuthorizationInterfaceName,
    AppHealthAuthorizationInterfaceScore,
    AppHealthAuthorizationInterfaceCreatedAt,
    AppHealthAuthorizationInterfaceUpdatedAt,
    AppHealthAuthorizationInterfaceDeletedAt,
} from '../../domain/value-objects';

@CommandHandler(AppHealthUpdateAuthorizationInterfacesCommand)
export class AppHealthUpdateAuthorizationInterfacesCommandHandler implements ICommandHandler<AppHealthUpdateAuthorizationInterfacesCommand>
{
    constructor(
        private readonly updateAuthorizationInterfacesService: AppHealthUpdateAuthorizationInterfacesService,
    ) {}

    async execute(command: AppHealthUpdateAuthorizationInterfacesCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateAuthorizationInterfacesService.main(
            {
                id: new AppHealthAuthorizationInterfaceId(command.payload.id, { undefinable: true }),
                name: new AppHealthAuthorizationInterfaceName(command.payload.name, { undefinable: true }),
                score: new AppHealthAuthorizationInterfaceScore(command.payload.score, { undefinable: true }),
            },
            command.queryStatement,
            command.constraint,
            command.cQMetadata,
        );
    }
}
