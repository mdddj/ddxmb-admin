export interface TextModel {
  id: number; // 主键ID
  name: string; // 查询key
  context: string; // 正文内容
  intro?: string; // 备注
  isEncryptionText?: boolean; //是否设置了密码
  viewPassword?: string; // 加密后的密码
}
