import { AppHealthCreatedApplicationViewEvent } from './app-health-created-application-view.event';

export class AppHealthCreatedApplicationViewsEvent
{
    constructor(
        public readonly applicationViews: AppHealthCreatedApplicationViewEvent[],
    ) {}
}
