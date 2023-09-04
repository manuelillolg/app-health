import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AppHealthDeleteApplicationViewByIdCommand } from './app-health-delete-application-view-by-id.command';
import { AppHealthDeleteApplicationViewByIdService } from './app-health-delete-application-view-by-id.service';
import {
    AppHealthApplicationViewId
} from '../../domain/value-objects';

@CommandHandler(AppHealthDeleteApplicationViewByIdCommand)
export class AppHealthDeleteApplicationViewByIdCommandHandler implements ICommandHandler<AppHealthDeleteApplicationViewByIdCommand>
{
    constructor(
        private readonly deleteApplicationViewByIdService: AppHealthDeleteApplicationViewByIdService,
    ) {}

    async execute(command: AppHealthDeleteApplicationViewByIdCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deleteApplicationViewByIdService.main(
            new AppHealthApplicationViewId(command.id),
            command.constraint,
            command.cQMetadata,
        );
    }
}
