export interface DocumentFromAPI {
    id: string; // Assuming conversion from UUID to string
    name: string;
    short_description: string,
    slug: string;
    description: string,
    url: string;
    category: any; // Assuming Category interface exists elsewhere
    created_by: any; // Assuming User interface exists elsewhere
    institution: any; // Assuming Institution interface exists elsewhere
    created_at: Date;
}

export interface Document {
    id: string; // Assuming conversion from UUID to string
    name: string;
    short_description: string,
    slug: string;
    description: string,
    url: string;
    category: any; // Assuming Category interface exists elsewhere
    created_by: any; // Assuming User interface exists elsewhere
    institution: any; // Assuming Institution interface exists elsewhere
    created_at: Date;
    is_favorite: boolean;
}