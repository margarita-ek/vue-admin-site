import { createApp } from 'vue';
import App from '@/app/App.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { router } from '@/app/providers/router';

export const app = createApp(App).use(router).use(store);

// VueDatePicker
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

// FontAwesomeIcons
import { library } from '@fortawesome/fontawesome-svg-core';
import {
    faBars,
    faTags,
    faFileLines,
    faPlus,
    faFilter,
    faAngleDown,
    faRocket,
    faHashtag,
    faChevronDown,
    faClose,
    faEye,
    faEyeSlash,
    faImage,
    faMagnifyingGlass,
    faNewspaper,
    faExpand,
    faImages,
    faArrowLeft,
    faTimes,
    faPencil,
    faPlusCircle,
    faSave,
    faThList,
    faThLarge,
    faDownload,
    faRepeat,
} from '@fortawesome/free-solid-svg-icons';
import { store } from '@/app/providers/store';

library.add(
    faBars,
    faTags,
    faFileLines,
    faPlus,
    faFilter,
    faAngleDown,
    faRocket,
    faHashtag,
    faChevronDown,
    faClose,
    faEye,
    faEyeSlash,
    faImage,
    faMagnifyingGlass,
    faNewspaper,
    faExpand,
    faImages,
    faArrowLeft,
    faTimes,
    faPencil,
    faPlusCircle,
    faSave,
    faThList,
    faThLarge,
    faDownload,
    faRepeat,    
);

app.component('FontAwesomeIcon', FontAwesomeIcon).component('VueDatePicker', VueDatePicker);
