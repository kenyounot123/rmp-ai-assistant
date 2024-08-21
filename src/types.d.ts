export interface Message {
    role: "user" | "assistant";
    content: string;
    liked?: boolean;

    // we can add other relevant fields in the future
    // author: string;
    // metadata?: MessageMetadata;
    // created_at: Date;
}