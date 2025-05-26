export declare class FileService {
    extractCbr(file: any): Promise<{
        slug: string;
        pages: string[];
    }>;
    extractCbz(file: any): Promise<{
        slug: string;
        pages: string[];
    }>;
}
