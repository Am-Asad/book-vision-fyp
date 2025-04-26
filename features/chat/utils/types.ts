export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type Message = {
  id: string;
  chat_id: string;
  user_id: string;
  text: string;
  response: string;
  timestamp: string;
};

export type Chat = {
  _id: string;
  chat_id: string;
  user_id: string;
  path: string;
  title: string;
  created_at: string;
  updated_at: string;
};
