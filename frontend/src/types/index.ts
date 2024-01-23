// @/types/index.ts

export interface BrandMediaData {
    brand_id: string;
    user_id: string;
    downloaded: boolean;
    download_url: string;
    download_path?: string; // Optional property, as it has a default value in the schema
}

export interface BrandMedia {
    list: BrandMediaData[];
    download: {
        byProfileUrls: boolean;
        profile_urls: string[];
    };
    edit: object | null;
    upload: {
        time: string;
    };
}

export interface BrandLinkedAccount {
    _id: string,
    brand_id: string;
    user_id: string;
    linked_account_id: string;
    provider: string;
    upload_times: string[];
}

export interface Brand {
    _id: string;
    user_id: string;
    name: string;
    key: string;
    media: BrandMedia;
    linked_accounts: BrandLinkedAccount[];
}