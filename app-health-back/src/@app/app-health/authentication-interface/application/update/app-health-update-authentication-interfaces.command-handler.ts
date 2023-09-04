/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AppHealthUpdateAuthenticationInterfacesCommand } from './app-health-update-authentication-interfaces.command';
import { AppHealthUpdateAuthenticationInterfacesService } from './app-health-update-authentication-interfaces.service';
import {
    AppHealthAuthenticationInterfaceId,
    AppHealthAuthenticationInterfaceName,
    AppHealthAuthenticationInterfaceScore,
    AppHealthAuthenticationInterfaceCreatedAt,
    AppHealthAuthenticationInterfaceUpdatedAt,
    AppHealthAuthenticationInterfaceDeletedAt,
} from '../../domain/value-objects';

@CommandHandler(AppHealthUpdateAuthenticationInterfacesCommand)
export class AppHealthUpdateAuthenticationInterfacesCommandHandler implements ICommandHandler<AppHealthUpdateAuthenticationInterfacesCommand>
{
    constructor(
        private readonly updateAuthenticationInterfacesService: AppHealthUpdateAuthenticationInterfacesService,
    ) {}

    async execute(command: AppHealthUpdateAuthenticationInterfacesCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateAuthenticationInterfacesService.main(
            {
                id: new AppHealthAuthenticationInterfaceId(command.payload.id, { undefinable: true }),
                name: new AppHealthAuthenticationInterfaceName(command.payload.name, { undefinable: true }),
                score: new AppHealthAuthenticationInterfaceScore(command.payload.score, { undefinable: true }),
            },
            command.queryStatement,
            command.constraint,
            command.cQMetadata,
        );
    }
}
