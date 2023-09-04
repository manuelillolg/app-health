/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AppHealthCreateAuthenticationInterfacesCommand } from './app-health-create-authentication-interfaces.command';
import { AppHealthCreateAuthenticationInterfacesService } from './app-health-create-authentication-interfaces.service';
import {
    AppHealthAuthenticationInterfaceId,
    AppHealthAuthenticationInterfaceName,
    AppHealthAuthenticationInterfaceScore,
    AppHealthAuthenticationInterfaceCreatedAt,
    AppHealthAuthenticationInterfaceUpdatedAt,
    AppHealthAuthenticationInterfaceDeletedAt,
} from '../../domain/value-objects';

@CommandHandler(AppHealthCreateAuthenticationInterfacesCommand)
export class AppHealthCreateAuthenticationInterfacesCommandHandler implements ICommandHandler<AppHealthCreateAuthenticationInterfacesCommand>
{
    constructor(
        private readonly createAuthenticationInterfacesService: AppHealthCreateAuthenticationInterfacesService,
    ) {}

    async execute(command: AppHealthCreateAuthenticationInterfacesCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createAuthenticationInterfacesService.main(
            command.payload
                .map(authenticationInterface =>
                {
                    return {
                        id: new AppHealthAuthenticationInterfaceId(authenticationInterface.id),
                        name: new AppHealthAuthenticationInterfaceName(authenticationInterface.name),
                        score: new AppHealthAuthenticationInterfaceScore(authenticationInterface.score),
                    };
                }),
            command.cQMetadata,
        );
    }
}
