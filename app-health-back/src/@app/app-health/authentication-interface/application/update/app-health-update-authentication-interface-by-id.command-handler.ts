/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AppHealthUpdateAuthenticationInterfaceByIdCommand } from './app-health-update-authentication-interface-by-id.command';
import { AppHealthUpdateAuthenticationInterfaceByIdService } from './app-health-update-authentication-interface-by-id.service';
import {
    AppHealthAuthenticationInterfaceId,
    AppHealthAuthenticationInterfaceName,
    AppHealthAuthenticationInterfaceScore,
    AppHealthAuthenticationInterfaceCreatedAt,
    AppHealthAuthenticationInterfaceUpdatedAt,
    AppHealthAuthenticationInterfaceDeletedAt,
} from '../../domain/value-objects';

@CommandHandler(AppHealthUpdateAuthenticationInterfaceByIdCommand)
export class AppHealthUpdateAuthenticationInterfaceByIdCommandHandler implements ICommandHandler<AppHealthUpdateAuthenticationInterfaceByIdCommand>
{
    constructor(
        private readonly updateAuthenticationInterfaceByIdService: AppHealthUpdateAuthenticationInterfaceByIdService,
    ) {}

    async execute(command: AppHealthUpdateAuthenticationInterfaceByIdCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateAuthenticationInterfaceByIdService.main(
            {
                id: new AppHealthAuthenticationInterfaceId(command.payload.id),
                name: new AppHealthAuthenticationInterfaceName(command.payload.name, { undefinable: true }),
                score: new AppHealthAuthenticationInterfaceScore(command.payload.score, { undefinable: true }),
            },
            command.constraint,
            command.cQMetadata,
        );
    }
}
