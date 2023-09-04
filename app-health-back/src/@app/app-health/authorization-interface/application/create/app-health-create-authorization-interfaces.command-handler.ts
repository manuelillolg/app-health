/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AppHealthCreateAuthorizationInterfacesCommand } from './app-health-create-authorization-interfaces.command';
import { AppHealthCreateAuthorizationInterfacesService } from './app-health-create-authorization-interfaces.service';
import {
    AppHealthAuthorizationInterfaceId,
    AppHealthAuthorizationInterfaceName,
    AppHealthAuthorizationInterfaceScore,
    AppHealthAuthorizationInterfaceCreatedAt,
    AppHealthAuthorizationInterfaceUpdatedAt,
    AppHealthAuthorizationInterfaceDeletedAt,
} from '../../domain/value-objects';

@CommandHandler(AppHealthCreateAuthorizationInterfacesCommand)
export class AppHealthCreateAuthorizationInterfacesCommandHandler implements ICommandHandler<AppHealthCreateAuthorizationInterfacesCommand>
{
    constructor(
        private readonly createAuthorizationInterfacesService: AppHealthCreateAuthorizationInterfacesService,
    ) {}

    async execute(command: AppHealthCreateAuthorizationInterfacesCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createAuthorizationInterfacesService.main(
            command.payload
                .map(authorizationInterface =>
                {
                    return {
                        id: new AppHealthAuthorizationInterfaceId(authorizationInterface.id),
                        name: new AppHealthAuthorizationInterfaceName(authorizationInterface.name),
                        score: new AppHealthAuthorizationInterfaceScore(authorizationInterface.score),
                    };
                }),
            command.cQMetadata,
        );
    }
}
