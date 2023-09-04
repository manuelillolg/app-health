/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AppHealthCreateAuthenticationInterfaceCommand } from './app-health-create-authentication-interface.command';
import { AppHealthCreateAuthenticationInterfaceService } from './app-health-create-authentication-interface.service';
import {
    AppHealthAuthenticationInterfaceId,
    AppHealthAuthenticationInterfaceName,
    AppHealthAuthenticationInterfaceScore,
    AppHealthAuthenticationInterfaceCreatedAt,
    AppHealthAuthenticationInterfaceUpdatedAt,
    AppHealthAuthenticationInterfaceDeletedAt,
} from '../../domain/value-objects';

@CommandHandler(AppHealthCreateAuthenticationInterfaceCommand)
export class AppHealthCreateAuthenticationInterfaceCommandHandler implements ICommandHandler<AppHealthCreateAuthenticationInterfaceCommand>
{
    constructor(
        private readonly createAuthenticationInterfaceService: AppHealthCreateAuthenticationInterfaceService,
    ) {}

    async execute(command: AppHealthCreateAuthenticationInterfaceCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createAuthenticationInterfaceService.main(
            {
                id: new AppHealthAuthenticationInterfaceId(command.payload.id),
                name: new AppHealthAuthenticationInterfaceName(command.payload.name),
                score: new AppHealthAuthenticationInterfaceScore(command.payload.score),
            },
            command.cQMetadata,
        );
    }
}
