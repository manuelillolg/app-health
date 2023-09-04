/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { AppHealthCreateApplicationAuthenticationsService } from './app-health-create-application-authentications.service';
import { AppHealthIApplicationAuthenticationRepository } from '../../domain/app-health-application-authentication.repository';
import { AppHealthMockApplicationAuthenticationRepository } from '../../infrastructure/mock/app-health-mock-application-authentication.repository';

describe('AppHealthCreateApplicationAuthenticationsService', () =>
{
    let service: AppHealthCreateApplicationAuthenticationsService;
    let mockRepository: AppHealthMockApplicationAuthenticationRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                AppHealthCreateApplicationAuthenticationsService,
                AppHealthMockApplicationAuthenticationRepository,
                {
                    provide : AppHealthIApplicationAuthenticationRepository,
                    useValue: {
                        insert: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(AppHealthCreateApplicationAuthenticationsService);
        mockRepository = module.get(AppHealthMockApplicationAuthenticationRepository);
    });

    describe('main', () =>
    {
        test('CreateApplicationAuthenticationsService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should create applicationAuthentications and emit event', async () =>
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
