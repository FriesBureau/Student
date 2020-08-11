import { InMemoryDbService } from 'angular-in-memory-web-api';

import { ProjectDashboardDb } from './dashboard-project';
import { AnalyticsDashboardDb } from './dashboard-analytics';
import { CalendarFakeDb } from './calendar';
import { ECommerceFakeDb } from './e-commerce';
import { AcademyFakeDb } from './academy';
import { BeskedFakeDb } from './besked';
import { ChatFakeDb } from './chat';
import { FileManagerFakeDb } from './file-manager';
import { ContactsFakeDb } from './contacts';
import { OpgaveFakeDb } from './opgave';
import { ScrumboardFakeDb } from './scrumboard';
import { InvoiceFakeDb } from './invoice';
import { ProfileFakeDb } from './profile';
import { SearchFakeDb } from './search';
import { FaqFakeDb } from './faq';
import { KnowledgeBaseFakeDb } from './knowledge-base';
import { IconsFakeDb } from './icons';
import { ChatPanelFakeDb } from './chat-panel';
import { QuickPanelFakeDb } from './quick-panel';

export class FakeDbService implements InMemoryDbService
{
    createDb(): any
    {
        return {
            // Dashboards
            'project-dashboard-projects' : ProjectDashboardDb.projects,
            'project-dashboard-widgets'  : ProjectDashboardDb.widgets,
            'analytics-dashboard-widgets': AnalyticsDashboardDb.widgets,

            // Calendar
            'calendar': CalendarFakeDb.data,

            // E-Commerce
            'e-commerce-products' : ECommerceFakeDb.products,
            'e-commerce-orders'   : ECommerceFakeDb.orders,

            // Academy
            'academy-categories': AcademyFakeDb.categories,
            'academy-courses'   : AcademyFakeDb.kurser,
            'academy-course'    : AcademyFakeDb.kursus,

            // Besked
            'besked-beskeder'  : BeskedFakeDb.beskeder,
            'besked-folders': BeskedFakeDb.folders,
            'besked-filters': BeskedFakeDb.filters,
            'besked-labels' : BeskedFakeDb.labels,

            // Chat
            'chat-contacts': ChatFakeDb.contacts,
            'chat-chats'   : ChatFakeDb.chats,
            'chat-user'    : ChatFakeDb.user,

            // File Manager
            'file-manager': FileManagerFakeDb.files,

            // Contacts
            'contacts-contacts': ContactsFakeDb.contacts,
            'contacts-user'    : ContactsFakeDb.user,

            // Opgave
            'opgave-opgaver'  : OpgaveFakeDb.opgaver,
            'opgave-filters': OpgaveFakeDb.filters,
            'opgave-tags'   : OpgaveFakeDb.tags,

            // Scrumboard
            'scrumboard-boards': ScrumboardFakeDb.boards,

            // Invoice
            'invoice': InvoiceFakeDb.invoice,

            // Profile
            'profile-timeline'     : ProfileFakeDb.timeline,
            'profile-photos-videos': ProfileFakeDb.photosVideos,
            'profile-about'        : ProfileFakeDb.about,

            // Search
            'search': SearchFakeDb.search,

            // FAQ
            'faq': FaqFakeDb.data,

            // Knowledge base
            'knowledge-base': KnowledgeBaseFakeDb.data,

            // Icons
            'icons': IconsFakeDb.icons,

            // Chat Panel
            'chat-panel-contacts' : ChatPanelFakeDb.contacts,
            'chat-panel-chats': ChatPanelFakeDb.chats,
            'chat-panel-user': ChatPanelFakeDb.user,

            // Quick Panel
            'quick-panel-notes' : QuickPanelFakeDb.notes,
            'quick-panel-events': QuickPanelFakeDb.events
        };
    }
}
