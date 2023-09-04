/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AppHealthUpdateApiInterfaceTypeByIdCommand } from './app-health-update-api-interface-type-by-id.command';
import { AppHealthUpdateApiInterfaceTypeByIdService } from './app-health-update-api-interface-type-by-id.service';
import {
    AppHealthApiInterfaceTypeId,
    AppHealthApiInterfaceTypeName,
    AppHealthApiInterfaceTypeScore,
    AppHealthApiInterfaceTypeCreatedAt,
    AppHealthApiInterfaceTypeUpdatedAt,
    AppHealthApiInterfaceTypeDeletedAt,
} from '../../domain/value-objects';

@CommandHandler(AppHealthUpdateApiInterfaceTypeByIdCommand)
export class AppHealthUpdateApiInterfaceTypeByIdCommandHandler implements ICommandHandler<AppHealthUpdateApiInterfaceTypeByIdCommand>
{
    constructor(
        private readonly updateApiInterfaceTypeByIdService: AppHealthUpdateApiInterfaceTypeByIdService,
    ) {}

    async execute(command: AppHealthUpdateApiInterfaceTypeByIdCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateApiInterfaceTypeByIdService.main(
            {
                id: new AppHealthApiInterfaceTypeId(command.payload.id),
                name: new AppHealthApiInterfaceTypeName(command.payload.name, { undefinable: true }),
                score: new AppHealthApiInterfaceTypeScore(command.payload.score, { undefinable: true }),
            },
            command.constraint,
            command.cQMetadata,
        );
    }
}
