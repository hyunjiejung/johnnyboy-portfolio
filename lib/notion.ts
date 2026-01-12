import { Client } from "@notionhq/client";

const notion = new Client({
    auth: process.env.NOTION_TOKEN,
});

export interface Artwork {
    id: string;
    title: string;
    imageUrl: string;
    year: number;
    medium: string;
    published: boolean;
}

export interface ProfileItem {
    id: string;
    category: string;
    description: string;
    year: string;
}

export async function fetchArtworks(): Promise<Artwork[]> {
    const dbId = process.env.NOTION_DB_ARTWORKS;
    if (!dbId) throw new Error("NOTION_DB_ARTWORKS is not defined");

    try {
        const response = await (notion as any).dataSources.query({
            data_source_id: dbId,
            filter: {
                property: "Published",
                checkbox: {
                    equals: true,
                },
            },
            sorts: [
                {
                    property: "Year",
                    direction: "descending",
                },
            ],
        });

        return response.results.map((page: any) => {
            const props = page.properties;

            const title = props.Title?.title?.[0]?.plain_text || props.Name?.title?.[0]?.plain_text || "Untitled";

            const fileObj = props.Image?.files?.[0];
            const imageUrl = fileObj?.file?.url || fileObj?.external?.url || "";

            const year = props.Year?.number || 0;
            const medium = props.Medium?.rich_text?.[0]?.plain_text || "";
            const published = props.Published?.checkbox || false;

            return {
                id: page.id,
                title,
                imageUrl,
                year,
                medium,
                published,
            };
        });
    } catch (error) {
        console.error("fetchArtworks failed:", error);
        return [];
    }
}

export async function fetchProfile(): Promise<ProfileItem[]> {
    const dbId = process.env.NOTION_DB_PROFILE;
    if (!dbId) throw new Error("NOTION_DB_PROFILE is not defined");

    try {
        const response = await (notion as any).dataSources.query({
            data_source_id: dbId,
            sorts: [
                {
                    property: "Year",
                    direction: "descending",
                },
            ],
        });

        return response.results.map((page: any) => {
            const props = page.properties;

            // Assumptions for Profile DB properties: "Category", "Description", "Year"
            const category = props.Category?.select?.name || props.Category?.rich_text?.[0]?.plain_text || "";
            const description = props.Description?.rich_text?.[0]?.plain_text || props.Name?.title?.[0]?.plain_text || "";
            // Year might be text in profile (e.g. "2020-2023") or number. Safely handle both.
            const year = props.Year?.rich_text?.[0]?.plain_text || props.Year?.number?.toString() || "";

            return {
                id: page.id,
                category,
                description,
                year,
            };
        });
    } catch (error) {
        console.error("fetchProfile failed:", error);
        return [];
    }
}
