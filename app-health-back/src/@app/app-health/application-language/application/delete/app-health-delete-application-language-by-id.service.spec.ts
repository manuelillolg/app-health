/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { appHealthMockApplicationLanguageData } from '@app/app-health/application-language/infrastructure/mock/app-health-mock-application-language.data';
import { AppHealthDeleteApplicationLanguageByIdService } from './app-health-delete-application-language-by-id.service';
import { AppHealthApplicationLanguageId } from '../../domain/value-objects';
import { AppHealthIApplicationLanguageRepository } from '../../domain/app-health-application-language.repository';
import { AppHealthMockApplicationLanguageRepository } from '../../infrastructure/mock/app-health-mock-application-language.repository';

describe('AppHealthDeleteApplicationLanguageByIdService', () =>
{
    let service: AppHealthDeleteApplicationLanguageByIdService;
    let repository: AppHealthIApplicationLanguageRepository;
    let mockRepository: AppHealthMockApplicationLanguageRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                AppHealthDeleteApplicationLanguageByIdService,
                AppHealthMockApplicationLanguageRepository,
                {
                    provide : AppHealthIApplicationLanguageRepository,
                    useValue: {
                        deleteById: id => { /**/ },
                        findById  : id => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(AppHealthDeleteApplicationLanguageByIdService);
        repository = module.get(AppHealthIApplicationLanguageRepository);
        mockRepository = module.get(AppHealthMockApplicationLanguageRepository);
    });

    describe('main', () =>
    {
        test('AppHealthDeleteApplicationLanguageByIdService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should delete applicationLanguage and emit event', async () =>
        {
            jest.spyOn(repository, 'findById').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(
                await service.main(
                    new AppHealthApplicationLanguageId(appHealthMockApplicationLanguageData[0].id),
                    {},
                ),
            )
                .toBe(undefined);
        });
    });
});
