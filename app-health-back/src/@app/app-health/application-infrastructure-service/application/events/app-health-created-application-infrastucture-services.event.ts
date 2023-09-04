import { AppHealthCreatedApplicationInfrastructureServiceEvent } from './app-health-created-application-infrastructure-service.event';

export class AppHealthCreatedApplicationInfrastuctureServicesEvent
{
    constructor(
        public readonly applicationInfrastuctureServices: AppHealthCreatedApplicationInfrastructureServiceEvent[],
    ) {}
}
