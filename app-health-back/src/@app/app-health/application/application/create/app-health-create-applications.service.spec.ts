/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { AppHealthCreateApplicationsService } from './app-health-create-applications.service';
import { AppHealthIApplicationRepository } from '../../domain/app-health-application.repository';
import { AppHealthMockApplicationRepository } from '../../infrastructure/mock/app-health-mock-application.repository';

describe('AppHealthCreateApplicationsService', () =>
{
    let service: AppHealthCreateApplicationsService;
    let mockRepository: AppHealthMockApplicationRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                AppHealthCreateApplicationsService,
                AppHealthMockApplicationRepository,
                {
                    provide : AppHealthIApplicationRepository,
                    useValue: {
                        insert: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(AppHealthCreateApplicationsService);
        mockRepository = module.get(AppHealthMockApplicationRepository);
    });

    describe('main', () =>
    {
        test('CreateApplicationsService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should create applications and emit event', async () =>
        {
            expect(
                await service.main(
                    mockRepository.collectionSource,
                ),
            )
                .toBe(undefined);
        });
    });
});
