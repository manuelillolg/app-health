import { AppHealthCreatedInfrastructureServiceEvent } from './app-health-created-infrastructure-service.event';

export class AppHealthCreatedInfrastructureServicesEvent
{
    constructor(
        public readonly infrastructureServices: AppHealthCreatedInfrastructureServiceEvent[],
    ) {}
}
