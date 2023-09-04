/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { appHealthMockInfrastructureProviderData } from '@app/app-health/infrastructure-provider/infrastructure/mock/app-health-mock-infrastructure-provider.data';
import { AppHealthDeleteInfrastructureProviderByIdService } from './app-health-delete-infrastructure-provider-by-id.service';
import { AppHealthInfrastructureProviderId } from '../../domain/value-objects';
import { AppHealthIInfrastructureProviderRepository } from '../../domain/app-health-infrastructure-provider.repository';
import { AppHealthMockInfrastructureProviderRepository } from '../../infrastructure/mock/app-health-mock-infrastructure-provider.repository';

describe('AppHealthDeleteInfrastructureProviderByIdService', () =>
{
    let service: AppHealthDeleteInfrastructureProviderByIdService;
    let repository: AppHealthIInfrastructureProviderRepository;
    let mockRepository: AppHealthMockInfrastructureProviderRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                AppHealthDeleteInfrastructureProviderByIdService,
                AppHealthMockInfrastructureProviderRepository,
                {
                    provide : AppHealthIInfrastructureProviderRepository,
                    useValue: {
                        deleteById: id => { /**/ },
                        findById  : id => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(AppHealthDeleteInfrastructureProviderByIdService);
        repository = module.get(AppHealthIInfrastructureProviderRepository);
        mockRepository = module.get(AppHealthMockInfrastructureProviderRepository);
    });

    describe('main', () =>
    {
        test('AppHealthDeleteInfrastructureProviderByIdService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should delete infrastructureProvider and emit event', async () =>
        {
            jest.spyOn(repository, 'findById').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(
                await service.main(
                    new AppHealthInfrastructureProviderId(appHealthMockInfrastructureProviderData[0].id),
                    {},
                ),
            )
                .toBe(undefined);
        });
    });
});
