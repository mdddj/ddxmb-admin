import { User } from '@/services/models/API.LOGIN';

export interface ResCategory {
  id: number;
  name: string;
  logo: string;
  description: string;
  announcement: any;
  users: User[];
  type: string | undefined;
  childers: ResCategory[]; // 子节点
}
