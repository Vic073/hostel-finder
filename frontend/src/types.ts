export interface User {
    ID: number;
    Name: string;
    Email: string;
    Role: 'student' | 'owner' | 'admin';
}

export interface AuthResponse {
    token: string;
    user: User; // Adjust based on actual backend response if needed
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterCredentials {
    name: string;
    email: string;
    password: string;
    role: 'student' | 'owner';
}

export interface Hostel {
    ID: number;
    Name: string;
    Location: string;
    Price: number;
    Description: string;
    OwnerID: number;
    Images: HostelImage[];
    Reviews?: Review[];
    average_rating: number;
}

export interface HostelImage {
    ID: number;
    url: string; // Adjust based on backend
}
export interface Review {
    ID: number;
    Rating: number;
    Comment: string;
    UserID: number;
    HostelID: number;
    CreatedAt: string;
    // Add User relation if backend sends it
    User?: User;
}

export interface Favorite {
    ID: number;
    HostelID: number;
    UserID: number;
    Hostel: Hostel;
}
