import { AppHealthDeletedApplicationInfrastructureServiceEvent } from './app-health-deleted-application-infrastructure-service.event';

export class AppHealthDeletedApplicationInfrastuctureServicesEvent
{
    constructor(
        public readonly applicationInfrastuctureServices: AppHealthDeletedApplicationInfrastructureServiceEvent[],
    ) {}
}
