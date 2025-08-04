export interface UploadFile {
  file: File;
  id: string;
  name: string;
  brideComment: string;
  groomComment: string;
  takenAt: string; // ISO 문자열로 저장
  status: 'pending' | 'uploading' | 'success' | 'error';
  error?: string;
}

export interface UploadFileItemProps {
  uploadFile: UploadFile;
  onUpdate: (id: string, field: keyof UploadFile, value: string) => void;
  onRemove: (id: string) => void;
  onUpload: (file: UploadFile) => Promise<void>;
}

export interface FileSelectorProps {
  onFileSelect: (files: File[]) => void;
}

export interface UploadTableProps {
  files: UploadFile[];
  onUpdate: (id: string, field: keyof UploadFile, value: string) => void;
  onRemove: (id: string) => void;
  onUpload: (file: UploadFile) => Promise<void>;
  onUploadAll: () => Promise<void>;
}
