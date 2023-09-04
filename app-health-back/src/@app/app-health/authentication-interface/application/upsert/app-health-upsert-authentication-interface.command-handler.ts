/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AppHealthUpsertAuthenticationInterfaceCommand } from './app-health-upsert-authentication-interface.command';
import { AppHealthUpsertAuthenticationInterfaceService } from './app-health-upsert-authentication-interface.service';
import {
    AppHealthAuthenticationInterfaceId,
    AppHealthAuthenticationInterfaceName,
    AppHealthAuthenticationInterfaceScore,
    AppHealthAuthenticationInterfaceCreatedAt,
    AppHealthAuthenticationInterfaceUpdatedAt,
    AppHealthAuthenticationInterfaceDeletedAt,
} from '../../domain/value-objects';

@CommandHandler(AppHealthUpsertAuthenticationInterfaceCommand)
export class AppHealthUpsertAuthenticationInterfaceCommandHandler implements ICommandHandler<AppHealthUpsertAuthenticationInterfaceCommand>
{
    constructor(
        private readonly upsertAuthenticationInterfaceService: AppHealthUpsertAuthenticationInterfaceService,
    ) {}

    async execute(command: AppHealthUpsertAuthenticationInterfaceCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.upsertAuthenticationInterfaceService.main(
            {
                id: new AppHealthAuthenticationInterfaceId(command.payload.id),
                name: new AppHealthAuthenticationInterfaceName(command.payload.name),
                score: new AppHealthAuthenticationInterfaceScore(command.payload.score),
            },
            command.cQMetadata,
        );
    }
}
