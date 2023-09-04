import { AppHealthUpdatedApplicationInfrastructureServiceEvent } from './app-health-updated-application-infrastructure-service.event';

export class AppHealthUpdatedApplicationInfrastuctureServicesEvent
{
    constructor(
        public readonly applicationInfrastuctureServices: AppHealthUpdatedApplicationInfrastructureServiceEvent[],
    ) {}
}
