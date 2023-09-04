import { AppHealthDeletedInfrastructureServiceEvent } from './app-health-deleted-infrastructure-service.event';

export class AppHealthDeletedInfrastructureServicesEvent
{
    constructor(
        public readonly infrastructureServices: AppHealthDeletedInfrastructureServiceEvent[],
    ) {}
}
