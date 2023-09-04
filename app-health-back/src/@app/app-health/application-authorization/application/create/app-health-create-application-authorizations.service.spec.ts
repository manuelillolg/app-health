/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { AppHealthCreateApplicationAuthorizationsService } from './app-health-create-application-authorizations.service';
import { AppHealthIApplicationAuthorizationRepository } from '../../domain/app-health-application-authorization.repository';
import { AppHealthMockApplicationAuthorizationRepository } from '../../infrastructure/mock/app-health-mock-application-authorization.repository';

describe('AppHealthCreateApplicationAuthorizationsService', () =>
{
    let service: AppHealthCreateApplicationAuthorizationsService;
    let mockRepository: AppHealthMockApplicationAuthorizationRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                AppHealthCreateApplicationAuthorizationsService,
                AppHealthMockApplicationAuthorizationRepository,
                {
                    provide : AppHealthIApplicationAuthorizationRepository,
                    useValue: {
                        insert: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(AppHealthCreateApplicationAuthorizationsService);
        mockRepository = module.get(AppHealthMockApplicationAuthorizationRepository);
    });

    describe('main', () =>
    {
        test('CreateApplicationAuthorizationsService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should create applicationAuthorizations and emit event', async () =>
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
