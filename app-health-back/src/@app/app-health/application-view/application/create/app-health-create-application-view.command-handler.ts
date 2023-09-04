/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AppHealthCreateApplicationViewCommand } from './app-health-create-application-view.command';
import { AppHealthCreateApplicationViewService } from './app-health-create-application-view.service';
import {
    AppHealthApplicationViewId,
    AppHealthApplicationViewApplicationId,
    AppHealthApplicationViewTotalViews,
    AppHealthApplicationViewComplexity,
    AppHealthApplicationViewDescription,
    AppHealthApplicationViewScore,
    AppHealthApplicationViewCreatedAt,
    AppHealthApplicationViewUpdatedAt,
    AppHealthApplicationViewDeletedAt,
} from '../../domain/value-objects';

@CommandHandler(AppHealthCreateApplicationViewCommand)
export class AppHealthCreateApplicationViewCommandHandler implements ICommandHandler<AppHealthCreateApplicationViewCommand>
{
    constructor(
        private readonly createApplicationViewService: AppHealthCreateApplicationViewService,
    ) {}

    async execute(command: AppHealthCreateApplicationViewCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createApplicationViewService.main(
            {
                id: new AppHealthApplicationViewId(command.payload.id),
                applicationId: new AppHealthApplicationViewApplicationId(command.payload.applicationId),
                totalViews: new AppHealthApplicationViewTotalViews(command.payload.totalViews),
                complexity: new AppHealthApplicationViewComplexity(command.payload.complexity),
                description: new AppHealthApplicationViewDescription(command.payload.description),
                score: new AppHealthApplicationViewScore(command.payload.score),
            },
            command.cQMetadata,
        );
    }
}
