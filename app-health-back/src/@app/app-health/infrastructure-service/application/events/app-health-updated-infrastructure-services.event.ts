import { AppHealthUpdatedInfrastructureServiceEvent } from './app-health-updated-infrastructure-service.event';

export class AppHealthUpdatedInfrastructureServicesEvent
{
    constructor(
        public readonly infrastructureServices: AppHealthUpdatedInfrastructureServiceEvent[],
    ) {}
}
