export interface User {
  id?: number;
  name: string;
  username: string;
  email: string;
}

export class UserVM implements User {
  id: number;
  name: string;
  username: string;
  email: string;
  constructor(data) {
    this.id = data.id || null;
    this.name = data.name || 'No name available';
    this.username = data.username || 'No username available';
    this.email = data.email || 'No email available';
  }
}
