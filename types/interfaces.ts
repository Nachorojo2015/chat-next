export interface Chat {
  id: string;
  type: string;
  title: string;
  picture: string;
  content: string | null;
  sent_at: Date | null;
  message_type: "text" | "image" | "video";
  fullname: string | null;
  username: string | null;
  other_fullname: string;
  other_username: string;
  other_profile_picture: string;
}

export interface Message {
  message_id: string;
  content: string;
  type: string;
  file_url: string;
  width: number;
  height: number;
  sent_at: Date;
  sender_id: string;
  sender_name: string;
  sender_avatar: string;
  sender_username: string;
}

export interface Group {
  title: string;
  picture: string;
  is_public: boolean;
  description: string;
  quantity_members: number;
  role: "member" | "owner";
}

export interface GroupItem {
  id: string;
  title: string;
  picture: string;
  quantity_members: number;
}

export interface PrivateChat {
  profile_picture: string;
  fullname: string;
  username: string;
  bio: string;
}

export interface UserItem {
  id: string;
  fullname: string;
  username: string;
  profile_picture: string;
}
