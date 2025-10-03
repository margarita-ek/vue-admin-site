import { apiInstance } from '@/shared/api/base';
import { 
    URL_PORTFOLIO_LIST, 
    URL_PORTFOLIO_DIVISIONS, 
    URL_PORTFOLIO_YEARS,
    URL_PORTFOLIO_INFO,
    URL_PORTFOLIO_UPLOAD,
    URL_PORTFOLIO_REPLACE,
    URL_PORTFOLIO_CREATE,
    URL_PORTFOLIO_UPDATE,
    URL_PORTFOLIO_GALLERY,
    URL_PORTFOLIO_GALLERY_CREATE,
    URL_PORTFOLIO_GALLERY_UPDATE,
    URL_PORTFOLIO_UPDATE_INFO,
    URL_PORTFOLIO_HINTS,
    URL_AUTOSUBSTITUTION_SLUG,
} from '@/shared/config';

export const portfolioAPI = {
    //portfolio
    async loadListOfProjects(queryParams: string) {
        return apiInstance.get(URL_PORTFOLIO_LIST + queryParams);
    },
    async oneProject(id: number | string) {
        return apiInstance.get(URL_PORTFOLIO_LIST + `/${id}`);
    },
    async createProject() {
        return apiInstance.get(URL_PORTFOLIO_CREATE);
    },
    async updateProject(id: string | number, body: any) {
        return apiInstance.post(URL_PORTFOLIO_UPDATE + `/${id}`, body);
    },
    async loadListOfDivisions() {
        return apiInstance.get(URL_PORTFOLIO_DIVISIONS);
    },    
    async loadListOfYears() {
        return apiInstance.get(URL_PORTFOLIO_YEARS);
    },
    async getHints() {
        return apiInstance.get(URL_PORTFOLIO_HINTS);
    },
    async autosubstitutionSlug(name: string) {
        return apiInstance.get(URL_AUTOSUBSTITUTION_SLUG + `?name=${name}`);
    },
    //files    
    async loadInfo() {
        return apiInstance.get(URL_PORTFOLIO_INFO);
    },    
    async loadInfoId(id: number | string) {
        return apiInstance.get(URL_PORTFOLIO_INFO + `/${id}`);
    },    
    async uploadFile(body: any) {
        return apiInstance.post(URL_PORTFOLIO_UPLOAD, body, {
            headers: {
                'Content-Type': 'multipart/form-data;boundary=----',
                'Accept': 'application/json',
            }
        });
    },    
    async replaceFile(id: number | string, body: any) {
        return apiInstance.post(URL_PORTFOLIO_REPLACE + `/${id}`, body);
    },
    async updateInfoAboutImage(id: number | string, body: any) {
        return apiInstance.post(URL_PORTFOLIO_UPDATE_INFO + `/${id}`, body);
    },
    //galleries
    async getGalleriesById(id: number | string) {
        return apiInstance.get(URL_PORTFOLIO_GALLERY + `/${id}`);
    }, 
    async createGalleries() {
        return apiInstance.get(URL_PORTFOLIO_GALLERY_CREATE);
    }, 
    async updateGalleriesById(id: number | string, body: any) {
        return apiInstance.post(URL_PORTFOLIO_GALLERY_UPDATE + `/${id}`, body);
    }, 
    async removeImageFromGalleryById(galleryId: number | string, itemId: number | string) {
        return apiInstance.post(URL_PORTFOLIO_GALLERY + `/${galleryId}/delete-entry/${itemId}`);
    }, 
};
